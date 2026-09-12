"use client";

import { useState } from "react";

export type UploadedImage = { url: string; publicId: string; width: number; height: number };

const MAX_BYTES = 10 * 1024 * 1024;

/**
 * Uploads straight from the browser to Cloudinary using a signature minted by
 * our server, so large photos never pass through a serverless function.
 */
export default function ImageUploader({
  onUploaded,
  folder = "gallery",
  label = "Choose a photo",
}: {
  onUploaded: (image: UploadedImage) => void;
  folder?: "gallery" | "blog";
  label?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("That file is not an image.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("Please choose an image under 10 MB.");
      return;
    }

    setBusy(true);
    try {
      const signRes = await fetch("/api/admin/upload-signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder }),
      });
      if (!signRes.ok) throw new Error((await signRes.json().catch(() => ({}))).error ?? "Could not start the upload.");
      const sign = await signRes.json();

      const body = new FormData();
      body.append("file", file);
      body.append("api_key", sign.apiKey);
      body.append("timestamp", String(sign.timestamp));
      body.append("folder", sign.folder);
      body.append("signature", sign.signature);

      const upload = await fetch(`https://api.cloudinary.com/v1_1/${sign.cloudName}/image/upload`, {
        method: "POST",
        body,
      });
      if (!upload.ok) throw new Error("Cloudinary rejected the upload.");
      const result = await upload.json();

      onUploaded({
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <label className="inline-flex items-center gap-2 min-h-11 px-4 rounded-xl border-[1.5px] border-gold text-maroon cursor-pointer hover:bg-cream transition-colors font-medium text-[0.9rem] focus-within:outline-3 focus-within:outline-gold">
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          disabled={busy}
          onChange={(e) => {
            const file = e.target.files?.[0];
            // Reset so picking the same file twice still fires a change event.
            e.target.value = "";
            if (file) void handleFile(file);
          }}
        />
        {busy ? "Uploading…" : label}
      </label>
      {error && <p role="alert" className="mt-2 text-[0.85rem] text-maroon">{error}</p>}
    </div>
  );
}
