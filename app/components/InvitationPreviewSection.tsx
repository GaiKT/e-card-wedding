"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";

const InvitationPreviewSection = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [activeCard, setActiveCard] = useState<"front" | "back">("front");

  return (
    <section
      ref={ref}
      className="py-20 relative overflow-hidden shadow-xl shadow-black"
      style={{
        backgroundImage: `url('/bg/bg-3.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Bottom Left Pre-wedding Image */}
      <div
        className="absolute bottom-0 left-[-100px] h-[720px] w-[720px] lg:z-99 max-md:hidden"
        style={{
          backgroundImage: `url('/pre-wedding-no-bg/wedding-without-bg2.png')`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            {t("invitation.title")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto mb-6" />
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            {t("invitation.description")}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full p-2 shadow-lg">
              <button
                onClick={() => setActiveCard("front")}
                className={`px-6 py-3 rounded-full font-inter font-semibold transition-all duration-300 ${
                  activeCard === "front"
                    ? "bg-gradient-to-r from-rose-400 to-pink-400 text-white"
                    : "text-gray-600 hover:text-rose-500"
                }`}
              >
                Front View
              </button>
              <button
                onClick={() => setActiveCard("back")}
                className={`px-6 py-3 rounded-full font-inter font-semibold transition-all duration-300 ${
                  activeCard === "back"
                    ? "bg-gradient-to-r from-rose-400 to-pink-400 text-white"
                    : "text-gray-600 hover:text-rose-500"
                }`}
              >
                Back View
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="relative">
              <motion.div
                key={activeCard}
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
                style={{ perspective: "1000px" }}
              >
                <div className="relative group cursor-pointer">
                  <motion.div
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    transition={{ duration: 0.3 }}
                    className="relative shadow-2xl rounded-2xl overflow-hidden h-[500px] md:h-[700px] hover:shadow-2xl hover:shadow-black/30 transition-shadow duration-300"
                  >
                    <Image
                      src={`/wedding-card/wedding-card-${activeCard}.jpg`}
                      alt={`Wedding invitation card ${activeCard}`}
                      width={600}
                      height={800}
                      className="w-full max-w-lg mx-auto rounded-2xl"
                      style={{
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                        filter: "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.1))",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <div className="bg-white/30 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-rose-100">
              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                {t("invitation.saveDate")}
              </h3>
              <p className="font-inter text-lg text-gray-600 mb-6">
                {t("invitation.saveDateDesc")}
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-3">
                  <svg
                    className="w-5 h-5 text-rose-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-inter font-semibold text-gray-800">
                    {t("invitation.date")}
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <svg
                    className="w-5 h-5 text-rose-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-inter font-semibold text-gray-800">
                    {t("invitation.time")}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InvitationPreviewSection;
