"use client";

import { motion } from "framer-motion";

const WarmBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Gradient overlays โทนอุ่น */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-pink-50/20 to-rose-50/30" />
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-50/20 via-transparent to-peach-50/10" />

      {/* ดอกไม้ขนาดใหญ่พื้นหลัง */}
      <motion.div
        className="absolute top-10 -left-20 opacity-5"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="text-[20rem] text-rose-300">🌸</div>
      </motion.div>

      <motion.div
        className="absolute -top-32 right-10 opacity-5"
        animate={{
          rotate: [360, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="text-[15rem] text-orange-300">🌺</div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/4 opacity-5"
        animate={{
          rotate: [0, -360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="text-[18rem] text-pink-300">🌷</div>
      </motion.div>

      <motion.div
        className="absolute bottom-20 -right-32 opacity-5"
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="text-[16rem] text-amber-300">🌻</div>
      </motion.div>

      {/* ใบไม้และเถาวัลย์ */}
      <motion.div
        className="absolute top-1/4 left-0 opacity-3"
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="text-[12rem] text-green-200 transform -rotate-45">
          🌿
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-0 opacity-3"
        animate={{
          y: [10, -10, 10],
          rotate: [0, -5, 5, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="text-[12rem] text-green-200 transform rotate-45">
          🌿
        </div>
      </motion.div>

      {/* ฟองใส */}
      <motion.div
        className="absolute top-1/3 left-1/3"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-32 h-32 bg-gradient-to-r from-rose-200 to-pink-200 rounded-full blur-xl" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-1/3"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.2, 0.05],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      >
        <div className="w-40 h-40 bg-gradient-to-r from-orange-200 to-amber-200 rounded-full blur-xl" />
      </motion.div>
    </div>
  );
};

export default WarmBackground;
