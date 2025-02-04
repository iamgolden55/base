import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const muxClient = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!
});

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("video") as File;
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const category = data.get("category") as string;
    const tags = data.get("tags") as string;

    // Create a direct upload URL
    const upload = await muxClient.Video.Uploads.create({
      new_asset_settings: {
        playback_policy: ["public"],
        mp4_support: "standard",
      },
      cors_origin: process.env.NEXT_PUBLIC_APP_URL,
    });

    return NextResponse.json({
      uploadUrl: upload.url,
      uploadId: upload.id,
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to process upload" },
      { status: 500 }
    );
  }
} 