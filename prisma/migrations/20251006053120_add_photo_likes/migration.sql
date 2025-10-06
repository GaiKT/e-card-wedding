-- CreateTable
CREATE TABLE "photos" (
    "id" TEXT NOT NULL,
    "imageId" INTEGER NOT NULL,
    "imagePath" TEXT NOT NULL,
    "likesCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "photos_imageId_key" ON "photos"("imageId");
