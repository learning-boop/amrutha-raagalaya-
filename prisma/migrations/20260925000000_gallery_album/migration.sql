-- AlterTable
ALTER TABLE "GalleryImage" ADD COLUMN     "album" TEXT;

-- CreateIndex
CREATE INDEX "GalleryImage_category_album_idx" ON "GalleryImage"("category", "album");
