"use client";

import Link from "next/link";
import { Play, Eye, ArrowRight, Tv } from "lucide-react";
import { GlassCard, GlassButton } from "@/components/ui";

interface Video {
  id: string;
  youtubeId: string;
  title: string;
  views: number;
  duration: string;
  thumbnailUrl: string;
}

// Featured YouTube videos from EXA SHOWS channel
const featuredVideos: Video[] = [
  {
    id: "1",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual video IDs
    title: "Miami Swim Week 2024 Highlights",
    views: 125000,
    duration: "12:34",
    thumbnailUrl: "",
  },
  {
    id: "2",
    youtubeId: "dQw4w9WgXcQ",
    title: "Cannes Beach Fashion Show",
    views: 89000,
    duration: "8:45",
    thumbnailUrl: "",
  },
  {
    id: "3",
    youtubeId: "dQw4w9WgXcQ",
    title: "Dubai Fashion Week Runway",
    views: 156000,
    duration: "15:20",
    thumbnailUrl: "",
  },
  {
    id: "4",
    youtubeId: "dQw4w9WgXcQ",
    title: "Ibiza Summer Collection 2024",
    views: 67000,
    duration: "10:15",
    thumbnailUrl: "",
  },
  {
    id: "5",
    youtubeId: "dQw4w9WgXcQ",
    title: "LA Swimwear Showcase",
    views: 98000,
    duration: "11:30",
    thumbnailUrl: "",
  },
  {
    id: "6",
    youtubeId: "dQw4w9WgXcQ",
    title: "Monaco Yacht Show Fashion",
    views: 112000,
    duration: "14:45",
    thumbnailUrl: "",
  },
];

function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(0)}K`;
  }
  return views.toString();
}

function VideoCard({ video }: { video: Video }) {
  return (
    <Link
      href={`https://youtube.com/watch?v=${video.youtubeId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <GlassCard variant="interactive" padding="none" className="overflow-hidden">
        {/* Video thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          {/* YouTube embed as background or thumbnail */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#9400D3]/40 via-[#FF69B4]/40 to-[#00BFFF]/40" />

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#FF69B4] group-hover:scale-110 transition-all duration-300">
              <Play size={28} className="text-white ml-1" fill="white" />
            </div>
          </div>

          {/* Duration badge */}
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white text-xs font-medium rounded">
            {video.duration}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Video info */}
        <div className="p-4">
          <h3 className="text-base font-semibold text-white group-hover:text-[#00BFFF] transition-colors line-clamp-2 mb-2">
            {video.title}
          </h3>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Eye size={14} />
            <span>{formatViews(video.views)} views</span>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}

export function FeaturedVideos() {
  return (
    <section className="py-20 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#9400D3]/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Watch <span className="gradient-text">Past Shows</span>
            </h2>
            <p className="text-white/60">
              Hundreds of runway videos from EXA SHOWS & EXA SWIM SHOWS
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/tv">
              <GlassButton
                variant="ghost"
                size="sm"
                leftIcon={<Tv size={16} />}
              >
                TV Mode
              </GlassButton>
            </Link>
            <Link href="/videos">
              <GlassButton
                variant="secondary"
                size="sm"
                rightIcon={<ArrowRight size={16} />}
              >
                View All Videos
              </GlassButton>
            </Link>
          </div>
        </div>

        {/* Videos grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {/* YouTube channel CTA */}
        <div className="mt-12 text-center">
          <GlassCard padding="lg" className="inline-block">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="text-left">
                <h3 className="text-xl font-bold text-white mb-1">
                  Subscribe to EXA SHOWS
                </h3>
                <p className="text-white/60 text-sm">
                  Get notified when new fashion shows are uploaded
                </p>
              </div>
              <a
                href="https://youtube.com/@exashows"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GlassButton variant="primary" leftIcon={<Play size={18} />}>
                  Subscribe on YouTube
                </GlassButton>
              </a>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

export default FeaturedVideos;
