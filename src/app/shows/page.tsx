import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { ShowsGrid } from "@/components/shows/ShowsGrid";

export const metadata: Metadata = {
  title: "Upcoming Shows",
  description: "Browse and buy tickets to fashion shows, swimwear events, and resortwear presentations worldwide.",
};

export default function ShowsPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Upcoming <span className="gradient-text">Shows</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Discover fashion shows, swimwear events, and resortwear presentations from around the world
            </p>
          </div>

          {/* Shows grid with filters */}
          <ShowsGrid />
        </div>
      </main>
      <Footer />
    </>
  );
}
