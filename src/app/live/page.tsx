import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { LiveStreams } from "@/components/live/LiveStreams";

export const metadata: Metadata = {
  title: "Live Streams",
  description: "Watch fashion shows live on Twitch, Kick, Digis.cc and more.",
};

export default function LivePage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full mb-6">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-400 text-sm font-medium">LIVE STREAMING</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Watch <span className="gradient-text">Live Shows</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Tune in to fashion shows streaming live on Twitch, Kick.com, Digis.cc and YouTube
            </p>
          </div>

          {/* Live streams component */}
          <LiveStreams />
        </div>
      </main>
      <Footer />
    </>
  );
}
