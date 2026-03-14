// lib/cloudinary.ts — server-side Cloudinary helpers

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key:    process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export { cloudinary };

/**
 * Upload a base64 or URL string to Cloudinary and return the secure URL.
 */
export async function uploadImage(
  source: string,
  folder = "hamrolink/blog"
): Promise<string> {
  const result = await cloudinary.uploader.upload(source, {
    folder,
    resource_type: "image",
    transformation: [
      { width: 1200, height: 630, crop: "fill", gravity: "auto" },
      { quality: "auto:good", fetch_format: "auto" },
    ],
  });
  return result.secure_url;
}

/**
 * Delete an image by its public_id.
 */
export async function deleteImage(publicId: string) {
  return cloudinary.uploader.destroy(publicId);
}
