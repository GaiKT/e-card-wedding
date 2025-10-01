"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingFlower {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  flower: string;
  duration: number;
  delay: number;
}

const FloatingFlowers = () => {
  const [flowers, setFlowers] = useState<FloatingFlower[]>([]);

  const flowerEmojis = ["🌸", "🌺", "🌷", "🌹", "🌻", "🏵️", "💐", "🌼"];
  const warmFlowers = ["🌸", "🌺", "🌷", "🌹", "🏵️", "🌼"]; // โทนอุ่น

  useEffect(() => {
    const generateFlowers = () => {
      const newFlowers: FloatingFlower[] = [];
      for (let i = 0; i < 20; i++) {
        newFlowers.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          rotation: Math.random() * 360,
          flower: warmFlowers[Math.floor(Math.random() * warmFlowers.length)],
          duration: Math.random() * 20 + 10,
          delay: Math.random() * 5,
        });
      }
      setFlowers(newFlowers);
    };

    generateFlowers();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {flowers.map((flower) => (
        <motion.div
          key={flower.id}
          className="absolute opacity-20"
          style={{
            left: `${flower.x}%`,
            top: `${flower.y}%`,
            fontSize: `${flower.size}rem`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [flower.rotation, flower.rotation + 360],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: flower.duration,
            repeat: Infinity,
            delay: flower.delay,
            ease: "easeInOut",
          }}
        >
          {flower.flower}
        </motion.div>
      ))}

      {/* เพิ่มดอกไม้ขนาดใหญ่ใส */}
      <motion.div
        className="absolute top-1/4 left-1/4 opacity-5"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="text-9xl">🌸</div>
      </motion.div>

      <motion.div
        className="absolute top-3/4 right-1/4 opacity-5"
        animate={{
          rotate: [360, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="text-8xl">🌺</div>
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/3 opacity-5"
        animate={{
          rotate: [0, -360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="text-7xl">🌷</div>
      </motion.div>
    </div>
  );
};

export default FloatingFlowers;
