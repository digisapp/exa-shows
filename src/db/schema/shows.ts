import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  boolean,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";

export const showTypeEnum = pgEnum("show_type", [
  "fashion",
  "swimwear",
  "resortwear",
  "haute_couture",
  "ready_to_wear",
  "accessories",
  "special_event",
]);

export const showStatusEnum = pgEnum("show_status", [
  "draft",
  "published",
  "live",
  "completed",
  "cancelled",
]);

export const shows = pgTable(
  "shows",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    // Basic Info
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    showType: showTypeEnum("show_type").notNull(),

    // Location
    venueName: text("venue_name").notNull(),
    venueAddress: text("venue_address"),
    city: text("city").notNull(),
    country: text("country").notNull(),

    // Timing
    eventDate: timestamp("event_date").notNull(),
    doorsOpen: timestamp("doors_open"),
    showStart: timestamp("show_start"),
    timezone: text("timezone").default("America/New_York"),

    // Media
    coverImageUrl: text("cover_image_url"),
    galleryUrls: text("gallery_urls").array(),
    promoVideoUrl: text("promo_video_url"),

    // Ticketing
    isTicketed: boolean("is_ticketed").default(true).notNull(),
    ticketsSoldCount: integer("tickets_sold_count").default(0).notNull(),

    // Live Stream
    liveStreamUrl: text("live_stream_url"),
    streamPlatform: text("stream_platform"),
    isLiveNow: boolean("is_live_now").default(false).notNull(),

    // Designer/Brand Info
    designers: text("designers").array(),
    sponsors: text("sponsors").array(),

    // Status & Visibility
    status: showStatusEnum("status").default("draft").notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),

    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    statusDateIdx: index("shows_status_date_idx").on(
      table.status,
      table.eventDate
    ),
    cityIdx: index("shows_city_idx").on(table.city),
    featuredIdx: index("shows_featured_idx").on(
      table.isFeatured,
      table.eventDate
    ),
    liveIdx: index("shows_live_idx").on(table.isLiveNow),
    slugIdx: index("shows_slug_idx").on(table.slug),
  })
);

export type Show = typeof shows.$inferSelect;
export type NewShow = typeof shows.$inferInsert;
