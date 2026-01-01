import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { VideoGallery } from "@/components/videos/VideoGallery";

export const metadata: Metadata = {
  title: "Video Gallery",
  description: "Watch hundreds of fashion show videos from EXA SHOWS and EXA SWIM SHOWS YouTube channels.",
};

export default function VideosPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Watch <span className="gradient-text">Fashion Shows</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Explore hundreds of runway videos from EXA SHOWS and EXA SWIM SHOWS
            </p>
          </div>

          {/* Video gallery */}
          <VideoGallery />
        </div>
      </main>
      <Footer />
    </>
  );
}
