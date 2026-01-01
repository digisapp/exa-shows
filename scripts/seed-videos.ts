import { getDb } from "../src/db";
import { videos } from "../src/db/schema";

const db = getDb();

const videosData = [
  {
    youtubeId: "ll1TPIm_XlQ",
    title: "IVY Swimwear | Fashion Runway Full Show",
    thumbnailUrl: "https://i.ytimg.com/vi/ll1TPIm_XlQ/hqdefault.jpg",
    channelId: "alainmoise",
    channelTitle: "Alain Moise",
    category: "swimwear",
    isFeatured: true,
    sortOrder: 1,
  },
  {
    youtubeId: "XEFJeKq4o2I",
    title: "BAY Swimwear | Fashion Runway Full Show",
    thumbnailUrl: "https://i.ytimg.com/vi/XEFJeKq4o2I/hqdefault.jpg",
    channelId: "alainmoise",
    channelTitle: "Alain Moise",
    category: "swimwear",
    isFeatured: true,
    sortOrder: 2,
  },
  {
    youtubeId: "p2neBy7V-mY",
    title: "Berry Beachy Swimwear | Fashion Runway Full Show",
    thumbnailUrl: "https://i.ytimg.com/vi/p2neBy7V-mY/hqdefault.jpg",
    channelId: "alainmoise",
    channelTitle: "Alain Moise",
    category: "swimwear",
    isFeatured: true,
    sortOrder: 3,
  },
  {
    youtubeId: "TnoZi5vL7Vk",
    title: "Exa Swimwear 4K | Fashion Runway Full Show",
    thumbnailUrl: "https://i.ytimg.com/vi/TnoZi5vL7Vk/hqdefault.jpg",
    channelId: "alainmoise",
    channelTitle: "Alain Moise",
    category: "swimwear",
    isFeatured: true,
    sortOrder: 4,
  },
  {
    youtubeId: "GyuzgNBmcgY",
    title: "Meduza Swimwear 4K | Fashion Runway Full Show",
    thumbnailUrl: "https://i.ytimg.com/vi/GyuzgNBmcgY/hqdefault.jpg",
    channelId: "alainmoise",
    channelTitle: "Alain Moise",
    category: "swimwear",
    isFeatured: false,
    sortOrder: 5,
  },
  {
    youtubeId: "6vVDtHJFXk4",
    title: "Veve Swimwear 4K | Fashion Runway Full Show",
    thumbnailUrl: "https://i.ytimg.com/vi/6vVDtHJFXk4/hqdefault.jpg",
    channelId: "alainmoise",
    channelTitle: "Alain Moise",
    category: "swimwear",
    isFeatured: false,
    sortOrder: 6,
  },
  {
    youtubeId: "G9eoxsUSa5E",
    title: "Capristan Swim Runway | Miami Art Basel Fashion Show",
    thumbnailUrl: "https://i.ytimg.com/vi/G9eoxsUSa5E/hqdefault.jpg",
    channelId: "alainmoise",
    channelTitle: "Alain Moise",
    category: "swimwear",
    isFeatured: false,
    sortOrder: 7,
  },
];

async function seedVideos() {
  console.log("Seeding videos...");

  for (const video of videosData) {
    try {
      await db
        .insert(videos)
        .values(video)
        .onConflictDoUpdate({
          target: videos.youtubeId,
          set: {
            title: video.title,
            thumbnailUrl: video.thumbnailUrl,
            isFeatured: video.isFeatured,
            sortOrder: video.sortOrder,
            updatedAt: new Date(),
          },
        });
      console.log(`✓ Added: ${video.title}`);
    } catch (error) {
      console.error(`✗ Failed: ${video.title}`, error);
    }
  }

  console.log("\nDone! Seeded", videosData.length, "videos");
  process.exit(0);
}

seedVideos();
