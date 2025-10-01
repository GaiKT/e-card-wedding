"use client";

import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import CountdownSection from "./components/CountdownSection";
import WeddingPlanSection from "./components/WeddingPlanSection";
import OurStorySection from "./components/OurStorySection";
import InvitationPreviewSection from "./components/InvitationPreviewSection";
import LocationSection from "./components/LocationSection";
import PreWeddingGallerySection from "./components/PreWeddingGallerySection";
import BlessUsSection from "./components/BlessUsSection";
import SmoothScroll from "./components/SmoothScroll";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Navigation />
      <SmoothScroll />

      <div id="hero">
        <HeroSection />
      </div>

      <div id="countdown">
        <CountdownSection />
      </div>

      <div id="wedding-plan">
        <WeddingPlanSection />
      </div>

      <div id="story">
        <OurStorySection />
      </div>

      <div id="invitation">
        <InvitationPreviewSection />
      </div>

      <div id="location">
        <LocationSection />
      </div>

      <div id="gallery">
        <PreWeddingGallerySection />
      </div>

      <div id="blessings">
        <BlessUsSection />
      </div>
    </main>
  );
}
