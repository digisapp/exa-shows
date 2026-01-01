"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Eye, Search, Tv, ExternalLink, Loader2 } from "lucide-react";
import { GlassCard, GlassButton, GlassInput } from "@/components/ui";

interface Video {
  id: string;
  youtubeId: string;
  title: string;
  thumbnailUrl: string | null;
  viewCount: number | null;
  category: string | null;
  isFeatured: boolean;
}

const categories = ["All", "swimwear", "fashion", "resortwear"];

function formatViews(views: number | null): string {
  if (!views) return "0";
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
          {video.thumbnailUrl ? (
            <Image
              src={video.thumbnailUrl}
              alt={video.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#9400D3]/40 via-[#FF69B4]/40 to-[#00BFFF]/40" />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#FF69B4] group-hover:scale-110 transition-all duration-300">
              <Play size={28} className="text-white ml-1" fill="white" />
            </div>
          </div>

          {/* Category badge */}
          {video.category && (
            <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/20 capitalize">
              {video.category}
            </div>
          )}

          {/* Featured badge */}
          {video.isFeatured && (
            <div className="absolute top-3 right-3 px-2 py-1 bg-[#FFED4E]/90 text-black text-xs font-bold rounded-full">
              FEATURED
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-base font-semibold text-white group-hover:text-[#00BFFF] transition-colors line-clamp-2 mb-2">
            {video.title}
          </h3>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Eye size={14} />
            <span>{formatViews(video.viewCount)} views</span>
          </div>
        </div>
      </GlassCard>
    </a>
  );
}

export function VideoGallery() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch("/api/videos");
        const data = await res.json();
        setVideos(data.videos || []);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={48} className="animate-spin text-[#FF69B4]" />
      </div>
    );
  }

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
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                selectedCategory === cat
                  ? "bg-[#FF69B4] text-white"
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
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
