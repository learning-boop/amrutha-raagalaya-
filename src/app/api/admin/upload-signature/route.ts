import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/dal";
import { hasCloudinary, signUpload } from "@/lib/cloudinary";

/** Hands the admin browser a short-lived signature for a direct Cloudinary upload. */
export async function POST(request: Request) {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  if (!hasCloudinary) {
    return NextResponse.json({ error: "Image storage is not configured. See README-ADMIN.md." }, { status: 500 });
  }

  const { folder } = (await request.json().catch(() => ({}))) as { folder?: string };
  const safeFolder = folder === "blog" ? "amrutha-raagalaya/blog" : "amrutha-raagalaya/gallery";

  return NextResponse.json(signUpload(safeFolder));
}
