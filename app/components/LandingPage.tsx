"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage = ({ onEnter }: LandingPageProps) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    setIsExiting(true);
    // รอ animation จบก่อนเรียก onEnter
    setTimeout(() => {
      onEnter();
    }, 800);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            backgroundImage: `url('/bg/bg-1.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-2xl">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Decorative hearts */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-6xl mb-6"
              >
                💕
              </motion.div>

              {/* Names */}
              <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
                Gai & Donut
              </h1>

              <div className="w-32 h-1 bg-gradient-to-r from-rose-400 via-pink-300 to-rose-400 mx-auto mb-6" />

              {/* Subtitle */}
              <p className="font-inter text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md">
                We&apos;re Getting Married!
              </p>

              <p className="font-inter text-lg text-white/80 mb-12 drop-shadow-md">
                เชิญร่วมเฉลิมฉลองวันแห่งความสุขของเรา
              </p>

              {/* Enter Button */}
              <motion.button
                onClick={handleEnter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-4 bg-white/10 backdrop-blur-md border-2 border-white/50 rounded-full font-inter font-semibold text-white text-lg overflow-hidden shadow-2xl"
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-400"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Button text */}
                <span className="relative z-10 flex items-center space-x-2">
                  <span>เปิดการ์ดเชิญ</span>
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </motion.svg>
                </span>
              </motion.button>

              {/* Date info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 text-white/70 font-inter text-sm"
              >
                <p>วันพุธที่ 19 พฤศจิกายน 2568</p>
                <p>เวลา 06:30 น.</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Floating hearts animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl md:text-4xl"
                initial={{
                  x: `${(i * 10 + 5) % 100}%`,
                  y: "120%",
                  opacity: 0,
                }}
                animate={{
                  y: "-20%",
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 8 + (i % 3) * 1.5,
                  delay: i * 1.2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  left: `${(i * 12.5) % 100}%`,
                }}
              >
                {i % 3 === 0 ? "💕" : i % 3 === 1 ? "💖" : "🤍"}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LandingPage;
