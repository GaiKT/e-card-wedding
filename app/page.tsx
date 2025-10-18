"use client";

import { useState } from "react";
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
import BrowserExtensionHandler from "./components/BrowserExtensionHandler";
import MusicPlayer from "./components/MusicPlayer";
import LandingPage from "./components/LandingPage";

export default function Home() {
  const [showLanding, setShowLanding] = useState(true);

  const handleEnter = () => {
    setShowLanding(false);
  };

  return (
    <main className="min-h-screen relative">
      {/* Landing Page */}
      {showLanding && <LandingPage onEnter={handleEnter} />}

      {/* Main Content */}
      <BrowserExtensionHandler />
      <Navigation />
      <SmoothScroll />
      <MusicPlayer />

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
