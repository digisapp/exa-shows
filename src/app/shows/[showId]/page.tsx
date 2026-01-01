import { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { GlassCard, GlassButton } from "@/components/ui";
import { Calendar, MapPin, Clock, Users, ArrowLeft, Ticket, Play, Share2 } from "lucide-react";

// Mock data - replace with real API
const show = {
  id: "1",
  title: "Miami Swim Week 2025",
  description: "Experience the hottest swimwear collections from world-renowned designers at Miami Beach Convention Center. Join us for an unforgettable night of fashion, glamour, and style as top models showcase the latest trends in swimwear and beachwear.",
  date: "2025-07-12",
  time: "8:00 PM",
  doorsOpen: "7:00 PM",
  venue: "Miami Beach Convention Center",
  address: "1901 Convention Center Dr, Miami Beach, FL 33139",
  city: "Miami",
  country: "USA",
  imageUrl: "",
  promoVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  designers: ["Versace Swim", "Dolce & Gabbana Mare", "Onia", "Solid & Striped"],
  sponsors: ["Sports Illustrated", "Revolve", "Bacardi"],
  ticketTypes: [
    {
      id: "t1",
      name: "Standing Room",
      price: 150,
      description: "General venue access with standing room viewing",
      features: ["Venue access", "Standing room viewing", "Bar access"],
      available: 50,
    },
    {
      id: "t2",
      name: "1st Row Seating",
      price: 350,
      description: "Premium reserved front row seating with best runway views",
      features: ["Reserved front row seat", "Best runway views", "VIP lounge access", "Complimentary champagne"],
      available: 12,
      isFeatured: true,
    },
    {
      id: "t3",
      name: "VIP Bottle Table (5)",
      price: 1200,
      description: "Private table for 5 guests with bottle service",
      features: ["Private table for 5", "2 premium bottles included", "VIP lounge access", "Best views", "Priority entry"],
      available: 4,
    },
  ],
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const metadata: Metadata = {
  title: show.title,
  description: show.description,
};

export default function ShowDetailPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link
            href="/shows"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to Shows</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Show details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hero section */}
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <iframe
                  src={show.promoVideoUrl}
                  title={show.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* Title and info */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {show.title}
                </h1>
                <p className="text-white/70 text-lg leading-relaxed">
                  {show.description}
                </p>
              </div>

              {/* Event details */}
              <GlassCard padding="lg">
                <h2 className="text-xl font-bold text-white mb-6">Event Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-[#FF69B4]/20">
                      <Calendar size={24} className="text-[#FF69B4]" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Date</p>
                      <p className="text-white font-medium">{formatDate(show.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-[#00BFFF]/20">
                      <Clock size={24} className="text-[#00BFFF]" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Time</p>
                      <p className="text-white font-medium">Doors: {show.doorsOpen} • Show: {show.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 sm:col-span-2">
                    <div className="p-3 rounded-xl bg-[#9400D3]/20">
                      <MapPin size={24} className="text-[#9400D3]" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Venue</p>
                      <p className="text-white font-medium">{show.venue}</p>
                      <p className="text-white/60 text-sm">{show.address}</p>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Designers */}
              <GlassCard padding="lg">
                <h2 className="text-xl font-bold text-white mb-4">Featured Designers</h2>
                <div className="flex flex-wrap gap-3">
                  {show.designers.map((designer) => (
                    <span
                      key={designer}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/80"
                    >
                      {designer}
                    </span>
                  ))}
                </div>
              </GlassCard>

              {/* Sponsors */}
              <GlassCard padding="lg">
                <h2 className="text-xl font-bold text-white mb-4">Sponsors</h2>
                <div className="flex flex-wrap gap-3">
                  {show.sponsors.map((sponsor) => (
                    <span
                      key={sponsor}
                      className="px-4 py-2 bg-[#FFED4E]/10 border border-[#FFED4E]/30 rounded-full text-[#FFED4E]"
                    >
                      {sponsor}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Right column - Ticket selection */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <GlassCard padding="lg">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Ticket size={24} className="text-[#FFED4E]" />
                    Select Tickets
                  </h2>

                  <div className="space-y-4">
                    {show.ticketTypes.map((ticket) => (
                      <div
                        key={ticket.id}
                        className={`p-4 rounded-xl border transition-all cursor-pointer hover:border-[#FFED4E]/50 ${
                          ticket.isFeatured
                            ? "border-[#FFED4E]/30 bg-[#FFED4E]/5"
                            : "border-white/10 bg-white/5"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-white flex items-center gap-2">
                              {ticket.name}
                              {ticket.isFeatured && (
                                <span className="text-xs px-2 py-0.5 bg-[#FFED4E] text-[#1a0033] rounded-full">
                                  POPULAR
                                </span>
                              )}
                            </h3>
                            <p className="text-white/60 text-sm">{ticket.description}</p>
                          </div>
                          <p className="text-xl font-bold gradient-text-gold whitespace-nowrap">
                            ${ticket.price}
                          </p>
                        </div>

                        <ul className="space-y-1 mb-3">
                          {ticket.features.map((feature, i) => (
                            <li key={i} className="text-white/60 text-sm flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-[#00BFFF] rounded-full" />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <div className="flex items-center justify-between">
                          <span className="text-white/40 text-sm">
                            {ticket.available} remaining
                          </span>
                          <GlassButton variant="gold" size="sm">
                            Select
                          </GlassButton>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                {/* Share button */}
                <GlassButton variant="ghost" fullWidth leftIcon={<Share2 size={18} />}>
                  Share This Event
                </GlassButton>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
