"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxSection = ({
  children,
  speed = 0.3,
  className = "",
}: ParallaxSectionProps) => {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // คำนวณ offset สำหรับ parallax effect
  const parallaxOffset = scrollY * speed;

  return (
    <div ref={sectionRef} className={`relative ${className}`}>
      {/* Parallax Background Layer */}
      <motion.div
        className="absolute inset-0 will-change-transform pointer-events-none -z-10"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
        }}
      >
        {/* Subtle background decorations */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-rose-200 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute top-3/4 right-1/4 w-40 h-40 bg-pink-200 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-3/4 w-24 h-24 bg-orange-200 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "4s" }}
          />
        </div>
      </motion.div>

      {/* Content Layer with enhanced parallax */}
      <motion.div
        className="relative z-20"
        style={{
          transform: `translateY(${-parallaxOffset * 0.5}px)`,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxSection;
