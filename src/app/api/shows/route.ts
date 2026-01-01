import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { shows, ticketTypes } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getDb();

    // Get all published shows
    const allShows = await db
      .select()
      .from(shows)
      .where(eq(shows.status, "published"))
      .orderBy(desc(shows.eventDate));

    // Get ticket types for each show
    const showsWithTickets = await Promise.all(
      allShows.map(async (show) => {
        const tickets = await db
          .select()
          .from(ticketTypes)
          .where(eq(ticketTypes.showId, show.id));

        const minPrice = tickets.length > 0
          ? Math.min(...tickets.map((t) => t.priceUsd))
          : null;

        return {
          ...show,
          ticketTypes: tickets,
          minPrice,
        };
      })
    );

    return NextResponse.json({ shows: showsWithTickets });
  } catch (error) {
    console.error("Error fetching shows:", error);
    return NextResponse.json(
      { error: "Failed to fetch shows" },
      { status: 500 }
    );
  }
}
