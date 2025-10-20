import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Schema สำหรับ validate request
const FacebookCommentSchema = z.object({
  postId: z.string(),
  accessToken: z.string().optional(),
});

interface FacebookComment {
  id: string;
  from: {
    name: string;
    id: string;
  };
  message: string;
  created_time: string;
}

interface FacebookCommentsResponse {
  data: FacebookComment[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

// GET - ดึง comments จาก Facebook และบันทึกลง database
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");
    const accessToken =
      searchParams.get("accessToken") || process.env.FACEBOOK_ACCESS_TOKEN;

    if (!postId) {
      return NextResponse.json(
        {
          success: false,
          error: "กรุณาระบุ Post ID",
        },
        { status: 400 }
      );
    }

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          error: "ไม่พบ Access Token กรุณาตั้งค่าใน environment variable",
        },
        { status: 400 }
      );
    }

    // เรียก Facebook Graph API เพื่อดึง comments
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${postId}/comments?fields=id,from,message,created_time&access_token=${accessToken}`
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        {
          success: false,
          error: "ไม่สามารถดึงข้อมูลจาก Facebook ได้",
          details: error,
        },
        { status: response.status }
      );
    }

    const data: FacebookCommentsResponse = await response.json();

    // บันทึก comments ลง database
    const savedComments = [];
    for (const comment of data.data) {
      // ตรวจสอบว่ามี comment นี้อยู่แล้วหรือไม่
      const existingComment = await prisma.blessing.findFirst({
        where: {
          email: `facebook_${comment.from.id}@facebook.com`, // ใช้ Facebook ID เป็น unique identifier
          name: comment.from.name,
        },
      });

      if (!existingComment) {
        const newBlessing = await prisma.blessing.create({
          data: {
            name: comment.from.name,
            email: `facebook_${comment.from.id}@facebook.com`,
            message: comment.message,
            willAttend: null, // Facebook comments ไม่ได้บอกว่าจะมาหรือไม่
            hasDonated: false,
            createdAt: new Date(comment.created_time),
          },
        });
        savedComments.push(newBlessing);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        total: data.data.length,
        saved: savedComments.length,
        comments: savedComments,
      },
      message: `บันทึก ${savedComments.length} คำอวยพรจาก Facebook สำเร็จ`,
    });
  } catch (error) {
    console.error("Error fetching Facebook comments:", error);
    return NextResponse.json(
      {
        success: false,
        error: "เกิดข้อผิดพลาดในการดึงข้อมูลจาก Facebook",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// POST - บันทึก comments จาก Facebook โดยตรง (manual)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const comments = z
      .array(
        z.object({
          name: z.string(),
          message: z.string(),
          facebookId: z.string().optional(),
        })
      )
      .parse(body.comments);

    const savedComments = [];
    for (const comment of comments) {
      const newBlessing = await prisma.blessing.create({
        data: {
          name: comment.name,
          email: comment.facebookId
            ? `facebook_${comment.facebookId}@facebook.com`
            : `facebook_${Date.now()}@facebook.com`,
          message: comment.message,
          willAttend: null,
          hasDonated: false,
        },
      });
      savedComments.push(newBlessing);
    }

    return NextResponse.json({
      success: true,
      data: savedComments,
      message: `บันทึก ${savedComments.length} คำอวยพรสำเร็จ`,
    });
  } catch (error) {
    console.error("Error saving Facebook comments:", error);
    return NextResponse.json(
      {
        success: false,
        error: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
