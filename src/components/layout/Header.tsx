"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Play, Ticket, Video, Calendar, Settings, LogOut, User } from "lucide-react";
import { GlassButton } from "@/components/ui";
import { useAuth } from "@/context/AuthContext";

const navigation = [
  { name: "Shows", href: "/shows", icon: Calendar },
  { name: "Videos", href: "/videos", icon: Video },
  { name: "Live", href: "/live", icon: Play },
];

export function Header() {
  const router = useRouter();
  const { user, loading, signOut, isAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  async function handleSignOut() {
    await signOut();
    setIsMobileMenuOpen(false);
    router.push("/");
    router.refresh();
  }

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
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-2 px-4 py-2 text-[#FFED4E] hover:bg-white/10 rounded-full transition-all duration-300"
              >
                <Settings size={18} />
                <span className="font-medium">Admin</span>
              </Link>
            )}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            {/* Get Tickets Button */}
            <Link href="/shows" className="hidden sm:block">
              <GlassButton variant="gold" size="sm" leftIcon={<Ticket size={16} />}>
                Get Tickets
              </GlassButton>
            </Link>

            {/* Auth Buttons */}
            {!loading && (
              <>
                {user ? (
                  <div className="hidden md:flex items-center gap-2">
                    <Link href="/dashboard">
                      <GlassButton variant="ghost" size="sm" leftIcon={<User size={16} />}>
                        {user.email?.split("@")[0]}
                      </GlassButton>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      title="Sign out"
                    >
                      <LogOut size={18} />
                    </button>
                  </div>
                ) : (
                  <Link href="/login" className="hidden md:block">
                    <GlassButton variant="ghost" size="sm">
                      Sign In
                    </GlassButton>
                  </Link>
                )}
              </>
            )}

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
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-[#FFED4E] hover:bg-white/10 rounded-xl transition-all"
              >
                <Settings size={20} />
                <span className="font-medium">Admin Dashboard</span>
              </Link>
            )}
            <div className="pt-4 space-y-2 border-t border-white/10">
              <Link href="/shows" onClick={() => setIsMobileMenuOpen(false)}>
                <GlassButton variant="gold" size="md" fullWidth leftIcon={<Ticket size={18} />}>
                  Get Tickets
                </GlassButton>
              </Link>
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <GlassButton variant="secondary" size="md" fullWidth leftIcon={<User size={18} />}>
                      My Account
                    </GlassButton>
                  </Link>
                  <button onClick={handleSignOut} className="w-full">
                    <GlassButton variant="ghost" size="md" fullWidth leftIcon={<LogOut size={18} />}>
                      Sign Out
                    </GlassButton>
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <GlassButton variant="ghost" size="md" fullWidth>
                    Sign In
                  </GlassButton>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
