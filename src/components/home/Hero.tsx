"use client";

import Link from "next/link";
import { Play, Ticket, Calendar, ArrowRight } from "lucide-react";
import { GlassButton } from "@/components/ui";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Video/Image with overlay */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder gradient - replace with actual video/image */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0033] via-[#2d1b69] to-[#000033]" />

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Live indicator badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full mb-6 animate-pulse">
          <span className="w-2 h-2 bg-red-500 rounded-full" />
          <span className="text-red-400 text-sm font-medium">LIVE NOW: Miami Swim Week 2025</span>
          <ArrowRight size={14} className="text-red-400" />
        </div>

        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
          <span className="text-white">Experience</span>
          <br />
          <span className="gradient-text">EXA Shows</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10">
          The premier destination for fashion, swimwear & resortwear shows.
          Watch live streams, buy tickets, and be part of the runway revolution.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/shows">
            <GlassButton variant="gold" size="lg" leftIcon={<Ticket size={20} />}>
              Get Tickets
            </GlassButton>
          </Link>
          <Link href="/live">
            <GlassButton variant="secondary" size="lg" leftIcon={<Play size={20} />}>
              Watch Live
            </GlassButton>
          </Link>
          <Link href="/videos">
            <GlassButton variant="ghost" size="lg" leftIcon={<Calendar size={20} />}>
              Past Shows
            </GlassButton>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/40 text-sm">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
