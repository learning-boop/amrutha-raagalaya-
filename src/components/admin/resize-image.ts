/**
 * Shrinks a photo in the browser before it is uploaded.
 *
 * Phone photos are often 3–5 MB at 4000px or more, far beyond what a web page
 * shows. Capping the longest edge at 2000px keeps them sharp on large screens
 * while storing roughly an eighth of the bytes, so the free Cloudinary plan
 * holds many more photos and uploads finish quickly on mobile data.
 *
 * Re-encoding through a canvas also drops EXIF metadata, including the GPS
 * position phones embed in every photo. The stored original is publicly
 * reachable by URL, so this keeps students' home locations out of it.
 */

export const MAX_EDGE = 2000;
const JPEG_QUALITY = 0.85;

export type ResizeResult = {
  blob: Blob;
  width: number;
  height: number;
  /** False when the browser could not decode the file and it is sent as-is. */
  processed: boolean;
};

export async function resizeImage(file: File): Promise<ResizeResult> {
  // Animated GIFs would lose their animation, and SVGs are already tiny vectors.
  if (file.type === "image/gif" || file.type === "image/svg+xml") {
    return { blob: file, width: 0, height: 0, processed: false };
  }

  let bitmap: ImageBitmap;
  try {
    // "from-image" applies the EXIF rotation, so portrait photos stay upright
    // once the metadata carrying that rotation is removed.
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    // Formats this browser cannot decode (e.g. HEIC outside Safari) are uploaded
    // unchanged rather than rejected.
    return { blob: file, width: 0, height: 0, processed: false };
  }

  try {
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return { blob: file, width: 0, height: 0, processed: false };

    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(bitmap, 0, 0, width, height);

    // PNGs may be logos or graphics with transparency, which JPEG would fill
    // with black — keep them PNG. Everything else becomes a compact JPEG.
    const type = file.type === "image/png" ? "image/png" : "image/jpeg";
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, type, type === "image/jpeg" ? JPEG_QUALITY : undefined),
    );
    if (!blob) return { blob: file, width: 0, height: 0, processed: false };

    // Always prefer the re-encoded copy, even in the rare case it is slightly
    // larger: it is the one without location metadata.
    return { blob, width, height, processed: true };
  } finally {
    bitmap.close();
  }
}
