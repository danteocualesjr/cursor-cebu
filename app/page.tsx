import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PhotoStrip from "@/components/PhotoStrip";
import Events from "@/components/Events";
import Speakers from "@/components/Speakers";
import Gallery from "@/components/Gallery";
import CommunityLinks from "@/components/CommunityLinks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <main>
        <Hero />
        <PhotoStrip />
        <Events />
        <Speakers />
        <Gallery />
        <CommunityLinks />
      </main>
      <Footer />
    </div>
  );
}
