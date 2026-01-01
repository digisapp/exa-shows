import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { shows, tickets, ticketTypes, users, videos } from "@/db/schema";
import { sql, eq, count, sum } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getDb();

    // Get counts
    const [showCount] = await db.select({ count: count() }).from(shows);
    const [ticketCount] = await db.select({ count: count() }).from(tickets);
    const [userCount] = await db.select({ count: count() }).from(users);
    const [videoCount] = await db.select({ count: count() }).from(videos);

    // Get total revenue (sum of ticket prices paid)
    const [revenue] = await db
      .select({ total: sum(tickets.pricePaid) })
      .from(tickets)
      .where(eq(tickets.paymentStatus, "succeeded"));

    // Get recent shows
    const recentShows = await db
      .select()
      .from(shows)
      .orderBy(sql`${shows.createdAt} DESC`)
      .limit(5);

    // Get recent tickets
    const recentTickets = await db
      .select({
        id: tickets.id,
        customerName: tickets.customerName,
        customerEmail: tickets.customerEmail,
        pricePaid: tickets.pricePaid,
        quantity: tickets.quantity,
        purchasedAt: tickets.purchasedAt,
      })
      .from(tickets)
      .orderBy(sql`${tickets.purchasedAt} DESC`)
      .limit(10);

    return NextResponse.json({
      stats: {
        shows: showCount?.count || 0,
        tickets: ticketCount?.count || 0,
        users: userCount?.count || 0,
        videos: videoCount?.count || 0,
        revenue: Number(revenue?.total || 0) / 100, // Convert cents to dollars
      },
      recentShows,
      recentTickets,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
