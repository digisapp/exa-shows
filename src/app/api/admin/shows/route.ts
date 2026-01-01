import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db";
import { shows, ticketTypes } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET all shows
export async function GET() {
  try {
    const db = getDb();
    const allShows = await db
      .select()
      .from(shows)
      .orderBy(desc(shows.eventDate));

    return NextResponse.json({ shows: allShows });
  } catch (error) {
    console.error("Error fetching shows:", error);
    return NextResponse.json(
      { error: "Failed to fetch shows" },
      { status: 500 }
    );
  }
}

// POST create new show
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = getDb();

    const {
      title,
      slug,
      description,
      showType,
      venueName,
      venueAddress,
      city,
      country,
      eventDate,
      doorsOpen,
      showStart,
      timezone,
      coverImageUrl,
      status,
      ticketTypesData,
    } = body;

    // Create show
    const [newShow] = await db
      .insert(shows)
      .values({
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
        description,
        showType: showType || "fashion",
        venueName,
        venueAddress,
        city,
        country,
        eventDate: new Date(eventDate),
        doorsOpen,
        showStart,
        timezone: timezone || "America/New_York",
        coverImageUrl,
        status: status || "draft",
      })
      .returning();

    // Create ticket types if provided
    if (ticketTypesData && ticketTypesData.length > 0) {
      await db.insert(ticketTypes).values(
        ticketTypesData.map((tt: { name: string; description?: string; priceUsd: number; totalQuantity: number; features?: string[] }) => ({
          showId: newShow.id,
          name: tt.name,
          description: tt.description,
          priceUsd: tt.priceUsd,
          totalQuantity: tt.totalQuantity,
          features: tt.features || [],
        }))
      );
    }

    return NextResponse.json({ show: newShow });
  } catch (error) {
    console.error("Error creating show:", error);
    return NextResponse.json(
      { error: "Failed to create show" },
      { status: 500 }
    );
  }
}

// PUT update show
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Show ID required" },
        { status: 400 }
      );
    }

    const db = getDb();

    // Convert eventDate if provided
    if (updateData.eventDate) {
      updateData.eventDate = new Date(updateData.eventDate);
    }

    const [updated] = await db
      .update(shows)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(shows.id, id))
      .returning();

    return NextResponse.json({ show: updated });
  } catch (error) {
    console.error("Error updating show:", error);
    return NextResponse.json(
      { error: "Failed to update show" },
      { status: 500 }
    );
  }
}

// DELETE show
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Show ID required" },
        { status: 400 }
      );
    }

    const db = getDb();

    // Delete associated ticket types first
    await db.delete(ticketTypes).where(eq(ticketTypes.showId, id));

    // Delete show
    await db.delete(shows).where(eq(shows.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting show:", error);
    return NextResponse.json(
      { error: "Failed to delete show" },
      { status: 500 }
    );
  }
}
