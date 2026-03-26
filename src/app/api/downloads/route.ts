import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const downloads = await prisma.dynamicDownload.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        fileName: true,
        fileUrl: true,
        fileSize: true,
        createdAt: true,
      },
    });
    return NextResponse.json(downloads);
  } catch {
    return NextResponse.json([]);
  }
}
