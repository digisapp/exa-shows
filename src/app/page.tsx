import { Header, Footer } from "@/components/layout";
import {
  Hero,
  LiveNowBanner,
  UpcomingShows,
  FeaturedVideos,
  ApplySection,
} from "@/components/home";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LiveNowBanner />
        <UpcomingShows />
        <FeaturedVideos />
        <ApplySection />
      </main>
      <Footer />
    </>
  );
}
