import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Webhook Verification (Facebook จะเรียกมาเพื่อ verify)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Facebook จะส่ง verify token มาเพื่อ verify webhook
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const VERIFY_TOKEN = process.env.FACEBOOK_WEBHOOK_VERIFY_TOKEN || "your_verify_token";

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified");
    return new NextResponse(challenge, { status: 200 });
  } else {
    return NextResponse.json(
      { error: "Failed validation" },
      { status: 403 }
    );
  }
}

// POST - รับ webhook events จาก Facebook
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Facebook จะส่ง webhook events มาในรูปแบบนี้
    if (body.object === "page") {
      for (const entry of body.entry) {
        // ตรวจสอบว่ามี comment หรือไม่
        if (entry.changes) {
          for (const change of entry.changes) {
            if (change.field === "feed" && change.value.item === "comment") {
              const commentData = change.value;

              // บันทึก comment ลง database
              try {
                await prisma.blessing.create({
                  data: {
                    name: commentData.from?.name || "Facebook User",
                    email: `facebook_${commentData.from?.id || Date.now()}@facebook.com`,
                    message: commentData.message || "",
                    willAttend: null,
                    hasDonated: false,
                    createdAt: new Date(commentData.created_time * 1000),
                  },
                });

                console.log("Saved Facebook comment:", commentData.message);
              } catch (dbError) {
                console.error("Error saving comment to database:", dbError);
              }
            }
          }
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
