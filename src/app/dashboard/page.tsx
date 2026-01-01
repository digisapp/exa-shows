"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { GlassCard, GlassButton } from "@/components/ui";
import { useAuth } from "@/context/AuthContext";
import { Ticket, Heart, Settings, Loader2, Calendar } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-12 min-h-screen flex items-center justify-center">
          <Loader2 size={48} className="animate-spin text-[#FF69B4]" />
        </main>
        <Footer />
      </>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-12 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Welcome back, {user.email?.split("@")[0]}
            </h1>
            <p className="text-white/60">
              Manage your tickets and account settings
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link href="/shows">
              <GlassCard
                variant="interactive"
                padding="lg"
                className="text-center h-full"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#FF69B4]/20 flex items-center justify-center">
                  <Calendar size={28} className="text-[#FF69B4]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Browse Shows
                </h3>
                <p className="text-white/60 text-sm">
                  Find upcoming fashion events
                </p>
              </GlassCard>
            </Link>

            <GlassCard padding="lg" className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#00BFFF]/20 flex items-center justify-center">
                <Ticket size={28} className="text-[#00BFFF]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                My Tickets
              </h3>
              <p className="text-white/60 text-sm">
                View your purchased tickets
              </p>
              <p className="text-white/40 text-xs mt-4">Coming soon</p>
            </GlassCard>

            <GlassCard padding="lg" className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#9400D3]/20 flex items-center justify-center">
                <Heart size={28} className="text-[#9400D3]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Favorites
              </h3>
              <p className="text-white/60 text-sm">
                Shows you&apos;ve saved
              </p>
              <p className="text-white/40 text-xs mt-4">Coming soon</p>
            </GlassCard>
          </div>

          {/* Account Info */}
          <GlassCard padding="lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF69B4] to-[#9400D3] flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Account</h2>
                <p className="text-white/60">{user.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <span className="text-white/80">Email</span>
                <span className="text-white">{user.email}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <span className="text-white/80">Member since</span>
                <span className="text-white">
                  {user.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </div>
          </GlassCard>
        </div>
      </main>
      <Footer />
    </>
  );
}
