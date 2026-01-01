import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { videos } from "@/db/schema";
import { desc } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getDb();

    const allVideos = await db
      .select()
      .from(videos)
      .orderBy(desc(videos.isFeatured), videos.sortOrder);

    return NextResponse.json({ videos: allVideos });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}
