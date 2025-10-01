"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxBackground = ({
  children,
  speed = 0.5,
  className = "",
}: ParallaxBackgroundProps) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{
          transform: `translateY(${scrollY * speed}px)`,
        }}
        className="absolute inset-0 w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxBackground;
