"use client";

import Link from "next/link";
import { Calendar, MapPin, ArrowRight, Ticket } from "lucide-react";
import { GlassCard, GlassButton } from "@/components/ui";

interface Show {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  country: string;
  imageUrl: string;
  priceFrom: number;
  isSoldOut: boolean;
  isFeatured: boolean;
  showType: string;
}

// Mock data - replace with real API data
const upcomingShows: Show[] = [
  {
    id: "1",
    title: "Miami Swim Week 2025",
    date: "2025-07-12",
    time: "8:00 PM",
    venue: "Miami Beach Convention Center",
    city: "Miami",
    country: "USA",
    imageUrl: "/images/show-miami.jpg",
    priceFrom: 150,
    isSoldOut: false,
    isFeatured: true,
    showType: "Swimwear",
  },
  {
    id: "2",
    title: "Cannes Resortwear Gala",
    date: "2025-05-20",
    time: "7:00 PM",
    venue: "Palais des Festivals",
    city: "Cannes",
    country: "France",
    imageUrl: "/images/show-cannes.jpg",
    priceFrom: 250,
    isSoldOut: false,
    isFeatured: true,
    showType: "Resortwear",
  },
  {
    id: "3",
    title: "Dubai Fashion Forward",
    date: "2025-04-08",
    time: "9:00 PM",
    venue: "Dubai Design District",
    city: "Dubai",
    country: "UAE",
    imageUrl: "/images/show-dubai.jpg",
    priceFrom: 200,
    isSoldOut: false,
    isFeatured: false,
    showType: "Fashion",
  },
  {
    id: "4",
    title: "Ibiza Beach Collection",
    date: "2025-06-15",
    time: "6:00 PM",
    venue: "Ushuaïa Beach",
    city: "Ibiza",
    country: "Spain",
    imageUrl: "/images/show-ibiza.jpg",
    priceFrom: 175,
    isSoldOut: true,
    isFeatured: false,
    showType: "Swimwear",
  },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ShowCard({ show }: { show: Show }) {
  return (
    <Link href={`/shows/${show.id}`} className="block group">
      <GlassCard variant="interactive" padding="none" className="overflow-hidden h-full">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          {/* Placeholder gradient - replace with actual image */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF69B4]/30 via-[#9400D3]/30 to-[#00BFFF]/30" />

          {/* Featured badge */}
          {show.isFeatured && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-[#FFED4E] text-[#1a0033] text-xs font-bold rounded-full">
              FEATURED
            </div>
          )}

          {/* Sold out overlay */}
          {show.isSoldOut && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-2xl font-bold text-white/90">SOLD OUT</span>
            </div>
          )}

          {/* Show type badge */}
          <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/20">
            {show.showType}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FF69B4] transition-colors line-clamp-1">
            {show.title}
          </h3>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Calendar size={14} />
              <span>{formatDate(show.date)} • {show.time}</span>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <MapPin size={14} />
              <span>{show.city}, {show.country}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-white/40 text-xs">From</span>
              <p className="text-xl font-bold gradient-text-gold">${show.priceFrom}</p>
            </div>
            {!show.isSoldOut && (
              <GlassButton
                variant="ghost"
                size="sm"
                rightIcon={<ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
              >
                View
              </GlassButton>
            )}
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}

export function UpcomingShows() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Upcoming <span className="gradient-text">Shows</span>
            </h2>
            <p className="text-white/60">
              Secure your seats to the hottest fashion events worldwide
            </p>
          </div>
          <Link href="/shows">
            <GlassButton
              variant="secondary"
              size="sm"
              rightIcon={<ArrowRight size={16} />}
            >
              View All Shows
            </GlassButton>
          </Link>
        </div>

        {/* Shows grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingShows.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-white/60 mb-4">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <Link href="/shows">
            <GlassButton variant="gold" leftIcon={<Ticket size={18} />}>
              Browse All Shows
            </GlassButton>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default UpcomingShows;
