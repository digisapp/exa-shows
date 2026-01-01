import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  boolean,
  index,
} from "drizzle-orm/pg-core";
import { shows } from "./shows";

export const videos = pgTable(
  "videos",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    // YouTube Info
    youtubeId: text("youtube_id").notNull().unique(),
    title: text("title").notNull(),
    description: text("description"),
    thumbnailUrl: text("thumbnail_url"),
    channelId: text("channel_id").notNull(),
    channelTitle: text("channel_title"),

    // Metrics (cached from YouTube API)
    viewCount: integer("view_count").default(0),
    likeCount: integer("like_count").default(0),
    duration: text("duration"), // ISO 8601 duration

    // Categorization
    showId: uuid("show_id").references(() => shows.id),
    tags: text("tags").array(),
    category: text("category"), // swimwear, fashion, resortwear

    // Display
    isFeatured: boolean("is_featured").default(false).notNull(),
    sortOrder: integer("sort_order").default(0),

    publishedAt: timestamp("published_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    featuredIdx: index("videos_featured_idx").on(
      table.isFeatured,
      table.sortOrder
    ),
    channelIdx: index("videos_channel_idx").on(table.channelId),
    showIdx: index("videos_show_idx").on(table.showId),
    youtubeIdx: index("videos_youtube_idx").on(table.youtubeId),
    categoryIdx: index("videos_category_idx").on(table.category),
  })
);

export type Video = typeof videos.$inferSelect;
export type NewVideo = typeof videos.$inferInsert;
