-- CreateTable DynamicBlogPost
CREATE TABLE "DynamicBlogPost" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL DEFAULT 'ApolloSRM Team',
    "category" TEXT NOT NULL DEFAULT 'Product Updates',
    "readTime" TEXT NOT NULL DEFAULT '5 min read',
    "documentId" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "DynamicBlogPost_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "DynamicBlogPost_slug_key" ON "DynamicBlogPost"("slug");

-- CreateTable DynamicDownload
CREATE TABLE "DynamicDownload" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL DEFAULT 0,
    "documentId" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "DynamicDownload_pkey" PRIMARY KEY ("id")
);
