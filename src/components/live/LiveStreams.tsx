"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Calendar, MapPin, ExternalLink, Tv } from "lucide-react";
import { GlassCard, GlassButton } from "@/components/ui";

type Platform = "all" | "digis" | "twitch" | "kick" | "youtube";

interface LiveStream {
  id: string;
  title: string;
  platform: Exclude<Platform, "all">;
  embedUrl: string;
  channelUrl: string;
  viewerCount: number;
  isLive: boolean;
  venue?: string;
  city?: string;
}

interface UpcomingStream {
  id: string;
  title: string;
  platform: Exclude<Platform, "all">;
  scheduledDate: string;
  scheduledTime: string;
  venue: string;
  city: string;
}

// Mock data
const liveStreams: LiveStream[] = [
  {
    id: "1",
    title: "Miami Swim Week 2025 - Day 1",
    platform: "digis",
    embedUrl: "https://player.twitch.tv/?channel=exashows&parent=exashows.com",
    channelUrl: "https://digis.cc/exashows",
    viewerCount: 2451,
    isLive: true,
    venue: "Miami Beach Convention Center",
    city: "Miami",
  },
];

const upcomingStreams: UpcomingStream[] = [
  {
    id: "u1",
    title: "Cannes Resortwear Gala",
    platform: "youtube",
    scheduledDate: "2025-05-20",
    scheduledTime: "7:00 PM CET",
    venue: "Palais des Festivals",
    city: "Cannes",
  },
  {
    id: "u2",
    title: "Dubai Fashion Forward",
    platform: "twitch",
    scheduledDate: "2025-04-08",
    scheduledTime: "9:00 PM GST",
    venue: "Dubai Design District",
    city: "Dubai",
  },
  {
    id: "u3",
    title: "Monaco Yacht Collection",
    platform: "kick",
    scheduledDate: "2025-09-10",
    scheduledTime: "8:30 PM CET",
    venue: "Port Hercules",
    city: "Monaco",
  },
];

const platforms: { value: Platform; label: string; color: string }[] = [
  { value: "all", label: "All Platforms", color: "#FFFFFF" },
  { value: "digis", label: "Digis.cc", color: "#FF69B4" },
  { value: "twitch", label: "Twitch", color: "#9146FF" },
  { value: "kick", label: "Kick", color: "#53FC18" },
  { value: "youtube", label: "YouTube", color: "#FF0000" },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getPlatformColor(platform: Exclude<Platform, "all">): string {
  const p = platforms.find((p) => p.value === platform);
  return p?.color || "#FFFFFF";
}

export function LiveStreams() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("all");

  const filteredLive = liveStreams.filter(
    (s) => selectedPlatform === "all" || s.platform === selectedPlatform
  );

  const filteredUpcoming = upcomingStreams.filter(
    (s) => selectedPlatform === "all" || s.platform === selectedPlatform
  );

  return (
    <div className="space-y-12">
      {/* Platform filter */}
      <div className="flex flex-wrap justify-center gap-3">
        {platforms.map((platform) => (
          <button
            key={platform.value}
            onClick={() => setSelectedPlatform(platform.value)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              selectedPlatform === platform.value
                ? "text-white"
                : "bg-white/5 text-white/60 hover:bg-white/10"
            }`}
            style={{
              background:
                selectedPlatform === platform.value
                  ? platform.value === "all"
                    ? "linear-gradient(90deg, #FF69B4, #00BFFF)"
                    : platform.color
                  : undefined,
            }}
          >
            {platform.label}
          </button>
        ))}
      </div>

      {/* Live Now Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="live-badge">LIVE NOW</div>
          <h2 className="text-2xl font-bold text-white">
            {filteredLive.length} stream{filteredLive.length !== 1 ? "s" : ""} live
          </h2>
        </div>

        {filteredLive.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredLive.map((stream) => (
              <GlassCard key={stream.id} padding="none" className="overflow-hidden">
                {/* Embed */}
                <div className="aspect-video bg-black/50">
                  <div className="w-full h-full flex items-center justify-center text-white/40">
                    <div className="text-center">
                      <p className="text-lg mb-2">Stream Preview</p>
                      <p className="text-sm">Click to watch on {stream.platform}</p>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="px-2 py-1 rounded text-xs font-bold uppercase"
                          style={{
                            backgroundColor: `${getPlatformColor(stream.platform)}20`,
                            color: getPlatformColor(stream.platform),
                          }}
                        >
                          {stream.platform}
                        </span>
                        <div className="flex items-center gap-1 text-white/60 text-sm">
                          <Users size={14} />
                          <span>{stream.viewerCount.toLocaleString()}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white">{stream.title}</h3>
                      {stream.venue && (
                        <p className="text-white/60 text-sm mt-1">
                          {stream.venue}, {stream.city}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={stream.channelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <GlassButton variant="primary" fullWidth rightIcon={<ExternalLink size={16} />}>
                        Watch on {stream.platform}
                      </GlassButton>
                    </a>
                    <Link href="/tv">
                      <GlassButton variant="ghost" leftIcon={<Tv size={18} />}>
                        TV Mode
                      </GlassButton>
                    </Link>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        ) : (
          <GlassCard padding="lg" className="text-center">
            <p className="text-white/60 text-lg mb-2">No live streams right now</p>
            <p className="text-white/40 text-sm">Check back during scheduled show times</p>
          </GlassCard>
        )}
      </section>

      {/* Upcoming Streams Section */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Calendar size={24} className="text-[#00BFFF]" />
          Upcoming Streams
        </h2>

        {filteredUpcoming.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUpcoming.map((stream) => (
              <GlassCard key={stream.id} variant="hover" padding="lg">
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="px-2 py-1 rounded text-xs font-bold uppercase"
                    style={{
                      backgroundColor: `${getPlatformColor(stream.platform)}20`,
                      color: getPlatformColor(stream.platform),
                    }}
                  >
                    {stream.platform}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3">{stream.title}</h3>

                <div className="space-y-2 text-white/60 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{formatDate(stream.scheduledDate)} at {stream.scheduledTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    <span>{stream.venue}, {stream.city}</span>
                  </div>
                </div>

                <GlassButton variant="secondary" size="sm" fullWidth>
                  Set Reminder
                </GlassButton>
              </GlassCard>
            ))}
          </div>
        ) : (
          <GlassCard padding="lg" className="text-center">
            <p className="text-white/60">No upcoming streams on this platform</p>
          </GlassCard>
        )}
      </section>

      {/* Platform links */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Follow Us</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {platforms
            .filter((p) => p.value !== "all")
            .map((platform) => (
              <a
                key={platform.value}
                href={`https://${platform.value === "digis" ? "digis.cc" : platform.value + ".com"}/exashows`}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <GlassCard
                  variant="interactive"
                  padding="lg"
                  className="text-center"
                >
                  <div
                    className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
                    style={{
                      backgroundColor: `${platform.color}20`,
                    }}
                  >
                    <ExternalLink size={24} style={{ color: platform.color }} />
                  </div>
                  <p className="font-semibold text-white">{platform.label}</p>
                  <p className="text-white/40 text-sm">@exashows</p>
                </GlassCard>
              </a>
            ))}
        </div>
      </section>
    </div>
  );
}

export default LiveStreams;
