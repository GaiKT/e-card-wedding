"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const PreWeddingGallerySection = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");

  // Enhanced gallery images with more details
  const galleryImages = [
    {
      id: 1,
      alt: "Engagement Photo 1",
      caption: "Our engagement day",
      description: "The moment when forever began",
      gradient: "from-rose-200 via-pink-100 to-rose-300",
    },
    {
      id: 2,
      alt: "Engagement Photo 2",
      caption: "A romantic moment",
      description: "Lost in each other's eyes",
      gradient: "from-purple-200 via-pink-100 to-purple-300",
    },
    {
      id: 3,
      alt: "Engagement Photo 3",
      caption: "Laughter and joy",
      description: "Pure happiness captured",
      gradient: "from-pink-200 via-rose-100 to-pink-300",
    },
    {
      id: 4,
      alt: "Engagement Photo 4",
      caption: "Love in nature",
      description: "Surrounded by beauty",
      gradient: "from-green-200 via-pink-100 to-green-300",
    },
    {
      id: 5,
      alt: "Engagement Photo 5",
      caption: "Golden hour magic",
      description: "Perfect lighting, perfect love",
      gradient: "from-yellow-200 via-orange-100 to-yellow-300",
    },
    {
      id: 6,
      alt: "Engagement Photo 6",
      caption: "Pure happiness",
      description: "Celebrating our love story",
      gradient: "from-blue-200 via-purple-100 to-blue-300",
    },
    {
      id: 7,
      alt: "Engagement Photo 7",
      caption: "Tender moments",
      description: "Quiet intimacy between us",
      gradient: "from-indigo-200 via-pink-100 to-indigo-300",
    },
    {
      id: 8,
      alt: "Engagement Photo 8",
      caption: "Adventure together",
      description: "Ready for life's journey",
      gradient: "from-teal-200 via-blue-100 to-teal-300",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 250, 250, 0.95), rgba(255, 245, 245, 0.95))`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            {t("gallery.title")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto mb-6" />
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            {t("gallery.description")}
          </p>

          {/* View Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center mt-8"
          >
            <div className="bg-white rounded-lg p-2 shadow-lg border border-rose-100 flex gap-3 md:w-96 w-full">
              <button
                onClick={() => setViewMode("carousel")}
                className={`px-6 py-3 rounded-lg font-inter font-semibold transition-all duration-300 flex items-center space-x-2 w-full ${
                  viewMode === "carousel"
                    ? "bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-lg"
                    : "text-gray-600 hover:text-rose-500"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 3v16l4-4 4 4V7H7z"
                  />
                </svg>
                <span>{t("gallery.carousel")}</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`px-6 py-3 rounded-lg font-inter font-semibold transition-all duration-300 flex items-center space-x-2 w-full ${
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-lg"
                    : "text-gray-600 hover:text-rose-500"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                <span>{t("gallery.grid")}</span>
              </button>
            </div>
          </motion.div>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Carousel View */}
          {viewMode === "carousel" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8"
            >
              <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
                spaceBetween={30}
                slidesPerView={1}
                centeredSlides={true}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                effect="coverflow"
                coverflowEffect={{
                  rotate: 30,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                navigation={{
                  nextEl: ".swiper-button-next-custom",
                  prevEl: ".swiper-button-prev-custom",
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                className="pb-12"
              >
                {galleryImages.map((image) => (
                  <SwiperSlide key={image.id}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="group cursor-pointer"
                    >
                      <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-rose-100 h-96">
                        <div
                          className={`relative h-80 bg-gradient-to-br ${image.gradient} flex flex-col items-center justify-center`}
                        >
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            transition={{ duration: 0.3 }}
                            className="text-8xl opacity-40 mb-4"
                          >
                            📸
                          </motion.div>

                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          <motion.div
                            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            whileHover={{ scale: 1.1 }}
                          >
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
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                          </motion.div>

                          <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-sm font-inter">
                              {image.description}
                            </p>
                          </div>
                        </div>

                        <div className="p-4 text-center">
                          <h3 className="font-inter font-semibold text-gray-800">
                            {image.caption}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Buttons */}
              <div className="flex justify-center space-x-4 mt-6">
                <button className="swiper-button-prev-custom bg-white shadow-lg rounded-full p-3 border border-rose-100 hover:bg-rose-50 transition-colors duration-300">
                  <svg
                    className="w-6 h-6 text-rose-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button className="swiper-button-next-custom bg-white shadow-lg rounded-full p-3 border border-rose-100 hover:bg-rose-50 transition-colors duration-300">
                  <svg
                    className="w-6 h-6 text-rose-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}

          {/* Grid View */}
          {viewMode === "grid" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ y: -10, scale: 1.03 }}
                    className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-rose-100"
                  >
                    <div
                      className={`relative h-64 bg-gradient-to-br ${image.gradient} flex items-center justify-center`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        className="text-6xl opacity-30"
                      >
                        📸
                      </motion.div>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <motion.div
                        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
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
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </motion.div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-inter font-semibold text-gray-800 text-center text-sm">
                        {image.caption}
                      </h3>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-rose-100">
            <h3 className="font-playfair text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {t("gallery.capturedMemories")}
            </h3>
            <p className="font-inter text-lg text-gray-600 mb-6">
              {t("gallery.memoriesDesc")}
            </p>
            <div className="flex items-center justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-rose-400 to-pink-400 text-white px-6 py-3 rounded-full font-inter font-semibold hover:shadow-lg transition-all duration-300"
              >
                {t("gallery.viewFull")}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-rose-300 text-rose-600 px-6 py-3 rounded-full font-inter font-semibold hover:bg-rose-50 transition-all duration-300"
              >
                {t("gallery.download")}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Custom CSS for Swiper */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #f43f5e !important;
          opacity: 0.3;
        }
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          transform: scale(1.2);
        }
        .swiper-button-prev-custom:hover,
        .swiper-button-next-custom:hover {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
};

export default PreWeddingGallerySection;
