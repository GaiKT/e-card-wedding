"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

interface LanguageToggleProps {
  isScrolled?: boolean;
}

const LanguageToggle = ({ isScrolled = false }: LanguageToggleProps) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative">
      <div
        className={`flex items-center backdrop-blur-sm rounded-lg p-1 shadow-lg border ${
          isScrolled
            ? "bg-white/90 border-rose-100"
            : "bg-white/20 border-white/30"
        }`}
      >
        <motion.button
          onClick={() => setLanguage("en")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-3 py-2 rounded-lg font-inter font-semibold text-sm transition-all duration-300 flex items-center space-x-2 ${
            language === "en"
              ? "bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-lg"
              : isScrolled
              ? "text-gray-600 hover:text-rose-500"
              : "text-white/80 hover:text-white"
          }`}
        >
          <span className="text-md">EN</span>
        </motion.button>

        <motion.button
          onClick={() => setLanguage("th")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-2 py-1 rounded-lg font-inter font-semibold text-sm transition-all duration-300 flex items-center space-x-2 ${
            language === "th"
              ? "bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-lg"
              : isScrolled
              ? "text-gray-600 hover:text-rose-500"
              : "text-white/80 hover:text-white"
          }`}
        >
          <span className="text-md">TH</span>
        </motion.button>
      </div>
    </div>
  );
};

export default LanguageToggle;
