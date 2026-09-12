import "server-only";
import { v2 as cloudinary } from "cloudinary";

export const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME ?? "";

export const hasCloudinary = Boolean(
  CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET,
);

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Params the browser must send to Cloudinary, signed here so the API secret
 * never leaves the server. Uploading direct from the browser also keeps large
 * photos away from the serverless request body limit.
 */
export function signUpload(folder: string) {
  const timestamp = Math.round(Date.now() / 1000);
  const params = { folder, timestamp };
  const signature = cloudinary.utils.api_sign_request(params, process.env.CLOUDINARY_API_SECRET!);
  return { ...params, signature, apiKey: process.env.CLOUDINARY_API_KEY!, cloudName: CLOUD_NAME };
}

/** Best-effort removal from storage; never blocks deleting the database row. */
export async function destroyImage(publicId?: string | null) {
  if (!publicId || !hasCloudinary) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary delete failed", error);
  }
}
