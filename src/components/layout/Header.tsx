"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Play, Ticket, Video, Users, Calendar } from "lucide-react";
import { GlassButton } from "@/components/ui";

const navigation = [
  { name: "Shows", href: "/shows", icon: Calendar },
  { name: "Videos", href: "/videos", icon: Video },
  { name: "Live", href: "/live", icon: Play },
  { name: "TV Mode", href: "/tv", icon: Users },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Glass background */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xl border-b border-white/10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl md:text-3xl font-bold gradient-text">
              EXA SHOWS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
              >
                <item.icon size={18} />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            {/* Get Tickets Button */}
            <Link href="/shows" className="hidden sm:block">
              <GlassButton variant="gold" size="sm" leftIcon={<Ticket size={16} />}>
                Get Tickets
              </GlassButton>
            </Link>

            {/* Sign In Button */}
            <Link href="/login" className="hidden md:block">
              <GlassButton variant="ghost" size="sm">
                Sign In
              </GlassButton>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 animate-[slide-up_0.3s_ease]">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all"
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
            <div className="pt-4 space-y-2 border-t border-white/10">
              <Link href="/shows" onClick={() => setIsMobileMenuOpen(false)}>
                <GlassButton variant="gold" size="md" fullWidth leftIcon={<Ticket size={18} />}>
                  Get Tickets
                </GlassButton>
              </Link>
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <GlassButton variant="ghost" size="md" fullWidth>
                  Sign In
                </GlassButton>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
