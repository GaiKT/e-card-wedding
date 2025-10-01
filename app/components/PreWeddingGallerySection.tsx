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
import Image from "next/image";

const PreWeddingGallerySection = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");

  // Your actual gallery images with beautiful captions and descriptions
  const galleryImages = [
    {
      id: 1,
      src: "/gallery/IMG_1026.JPG",
      alt: "Wedding Photo 1",
      caption: "ช่วงเวลาแห่งความสุข",
      description: "วันที่เราได้เฉลิมฉลองความรักที่งดงามของเรา",
    },
    {
      id: 2,
      src: "/gallery/IMG_1027.JPG",
      alt: "Wedding Photo 2",
      caption: "แสงแรกของรัก",
      description: "เมื่อแสงแดดส่องผ่านใจเราที่เต็มไปด้วยความสุข",
    },
    {
      id: 3,
      src: "/gallery/IMG_1028.JPG",
      alt: "Wedding Photo 3",
      caption: "มือที่เกี่ยวกัน",
      description: "สัญญาแห่งความรักที่จะเดินทางไปด้วยกันตลอดไป",
    },
    {
      id: 4,
      src: "/gallery/IMG_1335.JPG",
      alt: "Wedding Photo 4",
      caption: "รอยยิ้มที่หวานใส",
      description: "ความสุขที่แท้จริงเมื่อได้อยู่เคียงข้างกัน",
    },
    {
      id: 5,
      src: "/gallery/IMG_0882.jpg",
      alt: "Wedding Photo 5",
      caption: "จูบแห่งสัญญา",
      description: "คำมั่นสัญญาที่ปิดผนึกด้วยความรักอันแสนหวาน",
    },
    {
      id: 6,
      src: "/gallery/IMG_0929.jpg",
      alt: "Wedding Photo 6",
      caption: "อ้อมกอดแห่งรัก",
      description: "ความอบอุ่นที่ครอบคลุมหัวใจของเราทั้งสอง",
    },
    {
      id: 7,
      src: "/gallery/IMG_0935.jpg",
      alt: "Wedding Photo 7",
      caption: "เสียงหัวเราะใส",
      description: "เสียงหัวเราะที่ดังก้องเต็มไปด้วยความสุขใจ",
    },
    {
      id: 8,
      src: "/gallery/IMG_0983.jpg",
      alt: "Wedding Photo 8",
      caption: "สายตาที่เปี่ยมรัก",
      description: "เมื่อมองตากัน เห็นอนาคตที่สวยงามรออยู่",
    },
    {
      id: 9,
      src: "/gallery/IMG_1003.jpg",
      alt: "Wedding Photo 9",
      caption: "ความสุขที่ล้นเหลือ",
      description: "ความสุขที่ไม่สามารถซ่อนเอาไว้ได้",
    },
    {
      id: 10,
      src: "/gallery/IMG_1006.jpg",
      alt: "Wedding Photo 10",
      caption: "การสัมผัสอันอ่อนโยน",
      description: "ทุกการสัมผัสบอกเล่าเรื่องราวแห่งความรัก",
    },
    {
      id: 11,
      src: "/gallery/IMG_1008.jpg",
      alt: "Wedding Photo 11",
      caption: "ช่วงเวลาแห่งความฝัน",
      description: "เหมือนกับเราได้เข้าไปอยู่ในเทพนิยายจริง ๆ",
    },
    {
      id: 12,
      src: "/gallery/IMG_1009.jpg",
      alt: "Wedding Photo 12",
      caption: "ความกลมกลืนที่สมบูรณ์",
      description: "สองดวงใจที่ผสานรวมเป็นหนึ่งเดียว",
    },
    {
      id: 13,
      src: "/gallery/IMG_1011.jpg",
      alt: "Wedding Photo 13",
      caption: "ความรักที่บริสุทธิ์",
      description: "ความรักที่บริสุทธิ์และแท้จริงของเราทั้งสอง",
    },
    {
      id: 14,
      src: "/gallery/IMG_1012.jpg",
      alt: "Wedding Photo 14",
      caption: "การเต้นรำแห่งรัก",
      description: "เต้นรำไปในจังหวะเดียวกันของหัวใจ",
    },
    {
      id: 15,
      src: "/gallery/IMG_1289.jpg",
      alt: "Wedding Photo 15",
      caption: "บรรยากาศแห่งความรัก",
      description: "รอบตัวเราเต็มไปด้วยอากาศแห่งความรัก",
    },
    {
      id: 16,
      src: "/gallery/IMG_1294.jpg",
      alt: "Wedding Photo 16",
      caption: "รอยยิ้มที่ประทับใจ",
      description: "รอยยิ้มที่จะอยู่ในความทรงจำตลอดไป",
    },
    {
      id: 17,
      src: "/gallery/IMG_1295.jpg",
      alt: "Wedding Photo 17",
      caption: "ความสุขที่แบ่งปัน",
      description: "ความสุขของเราที่แบ่งปันให้กับทุกคน",
    },
    {
      id: 18,
      src: "/gallery/IMG_1296.jpg",
      alt: "Wedding Photo 18",
      caption: "มุมมองแห่งความสุข",
      description: "มุมมองที่เปี่ยมไปด้วยความสุขและความหวัง",
    },
    {
      id: 19,
      src: "/gallery/IMG_1297.jpg",
      alt: "Wedding Photo 19",
      caption: "ความอ่อนโยนที่สุดในโลก",
      description: "ความอ่อนโยนที่เราให้กันและกัน",
    },
    {
      id: 20,
      src: "/gallery/IMG_1298.jpg",
      alt: "Wedding Photo 20",
      caption: "ช่วงเวลาที่เงียบสงบ",
      description: "ช่วงเวลาแห่งความสงบและความเข้าใจกัน",
    },
    {
      id: 21,
      src: "/gallery/IMG_1299.jpg",
      alt: "Wedding Photo 21",
      caption: "แสงที่นำทาง",
      description: "แสงแห่งความรักที่นำทางเราสู่อนาคต",
    },
    {
      id: 22,
      src: "/gallery/IMG_1312.jpg",
      alt: "Wedding Photo 22",
      caption: "การเดินทางร่วมกัน",
      description: "การเริ่มต้นเดินทางไปในเส้นทางแห่งความรัก",
    },
    {
      id: 23,
      src: "/gallery/IMG_1313.jpg",
      alt: "Wedding Photo 23",
      caption: "ความทรงจำที่งดงาม",
      description: "ความทรงจำที่จะเก็บไว้ในใจตลอดไป",
    },
    {
      id: 24,
      src: "/gallery/IMG_1314.jpg",
      alt: "Wedding Photo 24",
      caption: "ความรักที่แผ่ซ่าน",
      description: "ความรักที่แผ่ซ่านไปทั่วทุกมุมของภาพ",
    },
    {
      id: 25,
      src: "/gallery/IMG_1321.jpg",
      alt: "Wedding Photo 25",
      caption: "ช่วงเวลาพิเศษ",
      description: "ทุกวินาทีในวันนี้ล้วนมีความหมายพิเศษ",
    },
    {
      id: 26,
      src: "/gallery/IMG_1322.jpg",
      alt: "Wedding Photo 26",
      caption: "ความสุขที่แท้จริง",
      description: "ความสุขที่เกิดจากการได้อยู่ด้วยกัน",
    },
    {
      id: 27,
      src: "/gallery/IMG_1323.jpg",
      alt: "Wedding Photo 27",
      caption: "การฉลองความรัก",
      description: "วันฉลองความรักที่เรารอคอยมานาน",
    },
    {
      id: 28,
      src: "/gallery/IMG_1324.jpg",
      alt: "Wedding Photo 28",
      caption: "ปีกแห่งความหวัง",
      description: "ความหวังที่บินสูงไปสู่อนาคตที่สดใส",
    },
    {
      id: 29,
      src: "/gallery/IMG_1329.jpg",
      alt: "Wedding Photo 29",
      caption: "ความสวยงามที่เป็นธรรมชาติ",
      description: "ความสวยงามที่เกิดขึ้นเองจากความรัก",
    },
    {
      id: 30,
      src: "/gallery/IMG_1331.jpg",
      alt: "Wedding Photo 30",
      caption: "ความอบอุ่นในใจ",
      description: "ความอบอุ่นที่ไหลเวียนอยู่ในใจของเรา",
    },
    {
      id: 31,
      src: "/gallery/IMG_1336.jpg",
      alt: "Wedding Photo 31",
      caption: "ช่วงเวลาที่เปี่ยมสุข",
      description: "เวลาที่เต็มไปด้วยความสุขและรอยยิ้ม",
    },
    {
      id: 32,
      src: "/gallery/IMG_1337.jpg",
      alt: "Wedding Photo 32",
      caption: "การส่ายไหวแห่งรัก",
      description: "หัวใจที่เต้นแรงด้วยความรักที่มีต่อกัน",
    },
    {
      id: 33,
      src: "/gallery/IMG_1339.jpg",
      alt: "Wedding Photo 33",
      caption: "ความเปิ่งปลั่งของรัก",
      description: "ความสุขที่เปี่ยมล้นออกมาจากภายใน",
    },
    {
      id: 34,
      src: "/gallery/IMG_1345.jpg",
      alt: "Wedding Photo 34",
      caption: "บทสรุปแห่งความรัก",
      description: "บทสรุปที่สวยงามของเรื่องราวความรักของเรา",
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
                        <div className="relative h-80 overflow-hidden">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />

                          {/* Overlay Effects */}
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
                            <p className="text-sm font-inter drop-shadow-lg">
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

          {/* Grid View - Masonry Layout */}
          {viewMode === "grid" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-masonry gap-4 md:gap-6 auto-rows-max"
            >
              {galleryImages.map((image, index) => {
                // Define different heights for masonry effect
                const getGridClass = (idx: number) => {
                  const patterns = [
                    "row-span-2", // tall
                    "row-span-1", // normal
                    "row-span-3", // extra tall
                    "row-span-1", // normal
                    "row-span-2", // tall
                    "row-span-1", // normal
                    "row-span-1", // normal
                    "row-span-2", // tall
                  ];
                  return patterns[idx % patterns.length];
                };

                const getHeightClass = (idx: number) => {
                  const heights = [
                    "h-64", // normal
                    "h-56", // medium-short
                    "h-80", // tall
                    "h-60", // medium
                    "h-72", // tall
                    "h-52", // short
                    "h-68", // medium-tall
                    "h-56", // medium-short
                  ];
                  return heights[idx % heights.length];
                };

                // Special large cards for featured photos
                const isFeatureCard =
                  index === 0 || index === 8 || index === 16 || index === 24;

                return (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    className={`group cursor-pointer ${
                      isFeatureCard ? "col-span-2 row-span-2" : ""
                    }`}
                  >
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-rose-100 h-full min-h-[250px]"
                    >
                      <div
                        className={`relative overflow-hidden w-full ${
                          isFeatureCard ? "h-80 md:h-96" : getHeightClass(index)
                        }`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          priority={index < 8}
                        />

                        {/* Enhanced Overlay Effects */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                        {/* Floating Caption */}
                        <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                          <h4 className="font-inter font-semibold text-sm md:text-base drop-shadow-lg mb-1">
                            {image.caption}
                          </h4>
                          <p className="text-xs md:text-sm drop-shadow-md opacity-90 line-clamp-2">
                            {image.description}
                          </p>
                        </div>

                        {/* Corner Icon */}
                        <motion.div
                          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                          whileHover={{ scale: 1.2, rotate: 15 }}
                        >
                          <svg
                            className="w-4 h-4 text-rose-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </motion.div>

                        {/* Feature Card Badge */}
                        {isFeatureCard && (
                          <div className="absolute top-3 left-3 bg-gradient-to-r from-rose-400 to-pink-400 text-white px-3 py-1 rounded-full text-xs font-medium">
                            ✨ Featured
                          </div>
                        )}

                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/50"></div>
                          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/50"></div>
                        </div>
                      </div>

                      {/* Card Footer (only for non-feature cards) */}
                      {!isFeatureCard && (
                        <div className="p-3">
                          <h3 className="font-inter font-medium text-gray-800 text-center text-xs md:text-sm truncate">
                            {image.caption}
                          </h3>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
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

      {/* Custom CSS for Swiper and Grid */}
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

        /* Line clamp utility for text truncation */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Enhanced grid responsive behavior */
        .grid-masonry {
          display: grid;
          grid-auto-rows: minmax(200px, auto);
        }

        .grid-masonry > div {
          min-height: 250px;
        }

        .grid-masonry img {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }

        @media (max-width: 640px) {
          .grid-masonry {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .grid-masonry {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 1025px) {
          .grid-masonry {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </section>
  );
};

export default PreWeddingGallerySection;
