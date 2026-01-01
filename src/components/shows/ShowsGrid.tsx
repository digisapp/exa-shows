"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight, Search, Filter, X } from "lucide-react";
import { GlassCard, GlassButton, GlassInput } from "@/components/ui";

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
const allShows: Show[] = [
  {
    id: "1",
    title: "Miami Swim Week 2025",
    date: "2025-07-12",
    time: "8:00 PM",
    venue: "Miami Beach Convention Center",
    city: "Miami",
    country: "USA",
    imageUrl: "",
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
    imageUrl: "",
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
    imageUrl: "",
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
    imageUrl: "",
    priceFrom: 175,
    isSoldOut: true,
    isFeatured: false,
    showType: "Swimwear",
  },
  {
    id: "5",
    title: "Los Angeles Fashion Week",
    date: "2025-03-22",
    time: "7:30 PM",
    venue: "Petersen Automotive Museum",
    city: "Los Angeles",
    country: "USA",
    imageUrl: "",
    priceFrom: 125,
    isSoldOut: false,
    isFeatured: false,
    showType: "Fashion",
  },
  {
    id: "6",
    title: "Monaco Yacht Collection",
    date: "2025-09-10",
    time: "8:30 PM",
    venue: "Port Hercules",
    city: "Monaco",
    country: "Monaco",
    imageUrl: "",
    priceFrom: 350,
    isSoldOut: false,
    isFeatured: true,
    showType: "Resortwear",
  },
  {
    id: "7",
    title: "Bali Beach Fashion",
    date: "2025-08-05",
    time: "5:00 PM",
    venue: "Potato Head Beach Club",
    city: "Seminyak",
    country: "Indonesia",
    imageUrl: "",
    priceFrom: 100,
    isSoldOut: false,
    isFeatured: false,
    showType: "Swimwear",
  },
  {
    id: "8",
    title: "Sydney Harbor Show",
    date: "2025-11-18",
    time: "7:00 PM",
    venue: "Sydney Opera House",
    city: "Sydney",
    country: "Australia",
    imageUrl: "",
    priceFrom: 180,
    isSoldOut: false,
    isFeatured: false,
    showType: "Fashion",
  },
];

const showTypes = ["All", "Fashion", "Swimwear", "Resortwear"];
const countries = ["All", "USA", "France", "UAE", "Spain", "Monaco", "Indonesia", "Australia"];

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
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF69B4]/30 via-[#9400D3]/30 to-[#00BFFF]/30" />

          {show.isFeatured && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-[#FFED4E] text-[#1a0033] text-xs font-bold rounded-full">
              FEATURED
            </div>
          )}

          {show.isSoldOut && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-2xl font-bold text-white/90">SOLD OUT</span>
            </div>
          )}

          <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/20">
            {show.showType}
          </div>
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

export function ShowsGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredShows = allShows.filter((show) => {
    const matchesSearch = show.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         show.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || show.showType === selectedType;
    const matchesCountry = selectedCountry === "All" || show.country === selectedCountry;
    return matchesSearch && matchesType && matchesCountry;
  });

  const activeFiltersCount = [
    selectedType !== "All",
    selectedCountry !== "All",
  ].filter(Boolean).length;

  return (
    <div>
      {/* Search and filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <GlassInput
              placeholder="Search shows by name or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={18} />}
            />
          </div>
          <GlassButton
            variant="ghost"
            onClick={() => setShowFilters(!showFilters)}
            leftIcon={<Filter size={18} />}
          >
            Filters
            {activeFiltersCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-[#FF69B4] text-white text-xs rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </GlassButton>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <GlassCard padding="md" className="animate-[slide-up_0.3s_ease]">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Show type filter */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Show Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {showTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedType === type
                          ? "bg-[#FF69B4] text-white"
                          : "bg-white/5 text-white/60 hover:bg-white/10"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Country filter */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Country
                </label>
                <div className="flex flex-wrap gap-2">
                  {countries.map((country) => (
                    <button
                      key={country}
                      onClick={() => setSelectedCountry(country)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCountry === country
                          ? "bg-[#00BFFF] text-white"
                          : "bg-white/5 text-white/60 hover:bg-white/10"
                      }`}
                    >
                      {country}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Clear filters */}
            {activeFiltersCount > 0 && (
              <button
                onClick={() => {
                  setSelectedType("All");
                  setSelectedCountry("All");
                }}
                className="mt-4 text-sm text-white/60 hover:text-white flex items-center gap-1"
              >
                <X size={14} />
                Clear filters
              </button>
            )}
          </GlassCard>
        )}
      </div>

      {/* Results count */}
      <p className="text-white/60 mb-6">
        {filteredShows.length} show{filteredShows.length !== 1 ? "s" : ""} found
      </p>

      {/* Shows grid */}
      {filteredShows.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredShows.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-white/60 text-lg mb-4">No shows found matching your criteria</p>
          <GlassButton
            variant="secondary"
            onClick={() => {
              setSearchQuery("");
              setSelectedType("All");
              setSelectedCountry("All");
            }}
          >
            Clear All Filters
          </GlassButton>
        </div>
      )}
    </div>
  );
}

export default ShowsGrid;
