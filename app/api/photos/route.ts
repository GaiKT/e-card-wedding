import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const photos = await prisma.photo.findMany({
      select: {
        imageId: true,
        imagePath: true,
        likesCount: true,
      },
      orderBy: {
        imageId: 'asc',
      },
    });

    return NextResponse.json({
      success: true,
      data: photos,
    });
  } catch (error) {
    console.error('Error fetching photo likes:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch photo likes',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { imageId, imagePath } = await request.json();

    if (!imageId || !imagePath) {
      return NextResponse.json(
        {
          success: false,
          error: 'Image ID and path are required',
        },
        { status: 400 }
      );
    }

    // ค้นหาหรือสร้างรูปภาพใหม่
    const photo = await prisma.photo.upsert({
      where: { imageId },
      update: {
        likesCount: {
          increment: 1,
        },
      },
      create: {
        imageId,
        imagePath,
        likesCount: 1,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        imageId: photo.imageId,
        likesCount: photo.likesCount,
      },
    });
  } catch (error) {
    console.error('Error updating photo likes:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update photo likes',
      },
      { status: 500 }
    );
  }
}