"use client";

import Link from "next/link";
import { Play, Users, ArrowRight } from "lucide-react";
import { GlassButton } from "@/components/ui";

interface LiveStream {
  id: string;
  title: string;
  venue: string;
  viewerCount: number;
  thumbnailUrl: string;
  platform: "twitch" | "kick" | "digis" | "youtube";
}

// Mock data - replace with real API data
const liveStreams: LiveStream[] = [
  {
    id: "1",
    title: "Miami Swim Week - Runway Show",
    venue: "Miami Beach Convention Center",
    viewerCount: 2451,
    thumbnailUrl: "/images/live-thumb-1.jpg",
    platform: "digis",
  },
];

export function LiveNowBanner() {
  if (liveStreams.length === 0) return null;

  const stream = liveStreams[0];

  return (
    <section className="relative py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/live" className="block group">
          <div className="relative bg-gradient-to-r from-red-500/20 via-[#FF69B4]/20 to-[#9400D3]/20 border border-red-500/30 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-red-500/50 hover:shadow-[0_0_40px_rgba(255,0,0,0.2)]">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-[#FF69B4]/5 animate-pulse" />

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Live badge and info */}
              <div className="flex items-center gap-4">
                <div className="live-badge text-base px-4 py-2">
                  LIVE
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#FF69B4] transition-colors">
                    {stream.title}
                  </h3>
                  <p className="text-white/60">{stream.venue}</p>
                </div>
              </div>

              {/* Viewer count and CTA */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-white/60">
                  <Users size={18} />
                  <span>{stream.viewerCount.toLocaleString()} watching</span>
                </div>
                <GlassButton
                  variant="primary"
                  size="sm"
                  leftIcon={<Play size={16} />}
                  rightIcon={<ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                >
                  Watch Now
                </GlassButton>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#FF69B4]/10 rounded-full blur-2xl" />
          </div>
        </Link>
      </div>
    </section>
  );
}

export default LiveNowBanner;
