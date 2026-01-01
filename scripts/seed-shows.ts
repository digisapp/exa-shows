import { getDb } from "../src/db";
import { shows, ticketTypes } from "../src/db/schema";

const showsData = [
  {
    title: "Miami Swim Week 2025",
    slug: "miami-swim-week-2025",
    description: "The premier swimwear fashion event featuring top designers from around the world. Experience the hottest trends in swimwear and beachwear.",
    showType: "swimwear" as const,
    venueName: "W South Beach",
    venueAddress: "2201 Collins Ave",
    city: "Miami",
    country: "USA",
    eventDate: "2025-07-15T20:00:00Z",
    doorsOpen: "2025-07-15T19:00:00Z",
    showStart: "2025-07-15T20:00:00Z",
    timezone: "America/New_York",
    status: "published" as const,
    ticketTypes: [
      { name: "General Admission", priceUsd: 7500, totalQuantity: 200, description: "Standing room with bar access" },
      { name: "VIP Front Row", priceUsd: 25000, totalQuantity: 40, description: "Reserved front row seating with champagne service" },
      { name: "VIP Table (4 guests)", priceUsd: 100000, totalQuantity: 10, description: "Private table for 4 with bottle service" },
    ],
  },
  {
    title: "Art Basel Fashion Night",
    slug: "art-basel-fashion-night",
    description: "An exclusive evening of high fashion during Art Basel Miami. Where art meets the runway.",
    showType: "fashion" as const,
    venueName: "Faena Forum",
    venueAddress: "3201 Collins Ave",
    city: "Miami Beach",
    country: "USA",
    eventDate: "2025-12-05T21:00:00Z",
    doorsOpen: "2025-12-05T20:00:00Z",
    showStart: "2025-12-05T21:00:00Z",
    timezone: "America/New_York",
    status: "published" as const,
    ticketTypes: [
      { name: "Gallery Pass", priceUsd: 15000, totalQuantity: 150, description: "Standing access to runway and art exhibition" },
      { name: "Collector's Circle", priceUsd: 50000, totalQuantity: 30, description: "Premium seating with art catalog and gift bag" },
    ],
  },
  {
    title: "Cannes Resortwear Showcase",
    slug: "cannes-resortwear-showcase",
    description: "Luxury resortwear collections on the French Riviera. The ultimate destination for resort fashion.",
    showType: "resortwear" as const,
    venueName: "Carlton Cannes",
    venueAddress: "58 La Croisette",
    city: "Cannes",
    country: "France",
    eventDate: "2025-05-20T19:30:00Z",
    doorsOpen: "2025-05-20T18:30:00Z",
    showStart: "2025-05-20T19:30:00Z",
    timezone: "Europe/Paris",
    status: "published" as const,
    ticketTypes: [
      { name: "Terrace View", priceUsd: 20000, totalQuantity: 100, description: "Terrace seating overlooking the Mediterranean" },
      { name: "Front Row Suite", priceUsd: 75000, totalQuantity: 20, description: "Front row with private suite access" },
    ],
  },
];

async function seedShows() {
  console.log("Seeding shows...\n");

  const db = getDb();

  for (const showData of showsData) {
    const { ticketTypes: tickets, ...show } = showData;

    try {
      // Create show
      const [newShow] = await db
        .insert(shows)
        .values({
          ...show,
          eventDate: new Date(show.eventDate),
          doorsOpen: new Date(show.doorsOpen),
          showStart: new Date(show.showStart),
        })
        .onConflictDoUpdate({
          target: shows.slug,
          set: {
            title: show.title,
            description: show.description,
            eventDate: new Date(show.eventDate),
            status: show.status,
            updatedAt: new Date(),
          },
        })
        .returning();

      console.log(`✓ Show: ${show.title}`);

      // Create ticket types
      for (const ticket of tickets) {
        await db
          .insert(ticketTypes)
          .values({
            showId: newShow.id,
            name: ticket.name,
            description: ticket.description,
            priceUsd: ticket.priceUsd,
            totalQuantity: ticket.totalQuantity,
          })
          .onConflictDoNothing();

        console.log(`  - Ticket: ${ticket.name} ($${ticket.priceUsd / 100})`);
      }
    } catch (error) {
      console.error(`✗ Failed: ${show.title}`, error);
    }
  }

  console.log("\nDone! Seeded", showsData.length, "shows");
  process.exit(0);
}

seedShows();
