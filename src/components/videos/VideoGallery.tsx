"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Eye, Search, Tv, ExternalLink } from "lucide-react";
import { GlassCard, GlassButton, GlassInput } from "@/components/ui";

interface Video {
  id: string;
  youtubeId: string;
  title: string;
  views: number;
  duration: string;
  category: string;
  year: string;
}

// Mock data - replace with YouTube API data
const allVideos: Video[] = [
  { id: "1", youtubeId: "dQw4w9WgXcQ", title: "Miami Swim Week 2024 - Opening Night", views: 245000, duration: "18:45", category: "Swimwear", year: "2024" },
  { id: "2", youtubeId: "dQw4w9WgXcQ", title: "Cannes Beachwear Collection", views: 189000, duration: "12:30", category: "Resortwear", year: "2024" },
  { id: "3", youtubeId: "dQw4w9WgXcQ", title: "Dubai Fashion Forward Highlights", views: 156000, duration: "22:15", category: "Fashion", year: "2024" },
  { id: "4", youtubeId: "dQw4w9WgXcQ", title: "Ibiza Summer Collection 2024", views: 134000, duration: "15:00", category: "Swimwear", year: "2024" },
  { id: "5", youtubeId: "dQw4w9WgXcQ", title: "Monaco Yacht Fashion Show", views: 178000, duration: "25:30", category: "Resortwear", year: "2024" },
  { id: "6", youtubeId: "dQw4w9WgXcQ", title: "Los Angeles Runway Night", views: 98000, duration: "14:20", category: "Fashion", year: "2024" },
  { id: "7", youtubeId: "dQw4w9WgXcQ", title: "Miami Swim Week 2023 - Day 1", views: 312000, duration: "45:00", category: "Swimwear", year: "2023" },
  { id: "8", youtubeId: "dQw4w9WgXcQ", title: "Miami Swim Week 2023 - Day 2", views: 289000, duration: "42:00", category: "Swimwear", year: "2023" },
  { id: "9", youtubeId: "dQw4w9WgXcQ", title: "Bali Beach Fashion Week", views: 145000, duration: "28:00", category: "Swimwear", year: "2023" },
  { id: "10", youtubeId: "dQw4w9WgXcQ", title: "Sydney Harbor Collection", views: 167000, duration: "20:00", category: "Fashion", year: "2023" },
  { id: "11", youtubeId: "dQw4w9WgXcQ", title: "Paris Resort Collection", views: 223000, duration: "32:00", category: "Resortwear", year: "2023" },
  { id: "12", youtubeId: "dQw4w9WgXcQ", title: "Tokyo Fashion Week Highlights", views: 198000, duration: "26:00", category: "Fashion", year: "2023" },
];

const categories = ["All", "Swimwear", "Resortwear", "Fashion"];
const years = ["All", "2024", "2023", "2022"];

function formatViews(views: number): string {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(0)}K`;
  return views.toString();
}

function VideoCard({ video }: { video: Video }) {
  return (
    <a
      href={`https://youtube.com/watch?v=${video.youtubeId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <GlassCard variant="interactive" padding="none" className="overflow-hidden">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#9400D3]/40 via-[#FF69B4]/40 to-[#00BFFF]/40" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#FF69B4] group-hover:scale-110 transition-all duration-300">
              <Play size={28} className="text-white ml-1" fill="white" />
            </div>
          </div>

          {/* Duration */}
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white text-xs font-medium rounded">
            {video.duration}
          </div>

          {/* Category badge */}
          <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/20">
            {video.category}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-base font-semibold text-white group-hover:text-[#00BFFF] transition-colors line-clamp-2 mb-2">
            {video.title}
          </h3>
          <div className="flex items-center justify-between text-white/50 text-sm">
            <div className="flex items-center gap-2">
              <Eye size={14} />
              <span>{formatViews(video.views)} views</span>
            </div>
            <span>{video.year}</span>
          </div>
        </div>
      </GlassCard>
    </a>
  );
}

export function VideoGallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  const filteredVideos = allVideos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || video.category === selectedCategory;
    const matchesYear = selectedYear === "All" || video.year === selectedYear;
    return matchesSearch && matchesCategory && matchesYear;
  });

  return (
    <div>
      {/* Search and filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <GlassInput
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={18} />}
            />
          </div>
          <Link href="/tv">
            <GlassButton variant="secondary" leftIcon={<Tv size={18} />}>
              TV Mode
            </GlassButton>
          </Link>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-[#FF69B4] text-white"
                    : "bg-white/5 text-white/60 hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="h-8 w-px bg-white/10 hidden sm:block" />
          <div className="flex flex-wrap gap-2">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedYear === year
                    ? "bg-[#00BFFF] text-white"
                    : "bg-white/5 text-white/60 hover:bg-white/10"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-white/60 mb-6">
        {filteredVideos.length} video{filteredVideos.length !== 1 ? "s" : ""} found
      </p>

      {/* Videos grid */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-white/60 text-lg mb-4">No videos found</p>
          <GlassButton
            variant="secondary"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setSelectedYear("All");
            }}
          >
            Clear Filters
          </GlassButton>
        </div>
      )}

      {/* YouTube CTA */}
      <div className="mt-12 text-center">
        <GlassCard padding="lg" className="inline-block">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="text-left">
              <h3 className="text-xl font-bold text-white mb-1">
                Want more videos?
              </h3>
              <p className="text-white/60 text-sm">
                Subscribe to EXA SHOWS on YouTube for all our content
              </p>
            </div>
            <a
              href="https://youtube.com/@exashows"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlassButton variant="primary" rightIcon={<ExternalLink size={16} />}>
                Visit YouTube Channel
              </GlassButton>
            </a>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

export default VideoGallery;
