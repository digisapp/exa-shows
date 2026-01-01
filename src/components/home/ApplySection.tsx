"use client";

import Link from "next/link";
import { Users, Palette, Building2, Camera, ArrowRight } from "lucide-react";
import { GlassCard, GlassButton } from "@/components/ui";

const applyOptions = [
  {
    icon: Users,
    title: "Models",
    description: "Walk the runway at exclusive fashion shows worldwide",
    href: "/apply/talent",
    color: "#FF69B4",
  },
  {
    icon: Palette,
    title: "Designers",
    description: "Showcase your collection to a global audience",
    href: "/apply/talent",
    color: "#00BFFF",
  },
  {
    icon: Building2,
    title: "Brands & Sponsors",
    description: "Partner with us for premium brand exposure",
    href: "/apply/industry",
    color: "#FFED4E",
  },
  {
    icon: Camera,
    title: "Media & Press",
    description: "Get credentials for exclusive coverage access",
    href: "/apply/industry",
    color: "#9400D3",
  },
];

export function ApplySection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Be Part of <span className="gradient-text">The Show</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Join the world&apos;s leading fashion show platform as a model, designer, brand, or media professional
          </p>
        </div>

        {/* Options grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {applyOptions.map((option) => (
            <Link key={option.title} href={option.href} className="block group">
              <GlassCard
                variant="interactive"
                padding="lg"
                className="h-full text-center"
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${option.color}20, ${option.color}40)`,
                    boxShadow: `0 0 30px ${option.color}20`,
                  }}
                >
                  <option.icon size={28} style={{ color: option.color }} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FF69B4] transition-colors">
                  {option.title}
                </h3>
                <p className="text-white/60 text-sm mb-4">
                  {option.description}
                </p>

                {/* Arrow indicator */}
                <div className="flex items-center justify-center text-white/40 group-hover:text-[#00BFFF] transition-colors">
                  <span className="text-sm mr-2">Apply Now</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ApplySection;
