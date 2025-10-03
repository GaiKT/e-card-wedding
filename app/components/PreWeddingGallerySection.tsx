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
      src: "/gallery/S__10248200_0.jpg",
      alt: "Wedding Photo 1",
      isFeature: true,
      caption: "รักแท้มีอยู่จริงนั่นคือคุณ",
      description: "วันที่ความรักแท้ได้เผยตัวในรูปแบบของคุณ",
    },
    {
      id: 2,
      src: "/gallery/S__10248202_0.jpg",
      alt: "Wedding Photo 2",
      caption: "ความสุขที่แท้จริง คือการได้ใช้ชีวิตที่เหลืออยู่กับคุณ",
      description: "ความสุขที่เต็มเปี่ยมในทุกๆ วินาทีที่ได้อยู่เคียงข้าง",
    },
    {
      id: 3,
      src: "/gallery/S__10248203_0.jpg",
      alt: "Wedding Photo 3",
      caption: "วันที่ดีที่สุด คือวันที่ตัดสินใจใช้ชีวิตคู่กับคุณ",
      description: "การตัดสินใจที่ดีที่สุดในชีวิตของเรา",
    },
    {
      id: 4,
      src: "/gallery/S__10248204_0.jpg",
      alt: "Wedding Photo 4",
      caption: "ขอบคุณที่เข้ามาเติมเต็มชีวิตให้สมบูรณ์",
      description: "ขอบคุณที่ทำให้ชีวิตของเราสมบูรณ์แบบ",
    },
    {
      id: 5,
      src: "/gallery/S__10248205_0.jpg",
      alt: "Wedding Photo 5",
      caption: "รักของเราจะเติบโตขึ้นทุกวัน ทุกปี",
      description: "รักที่เติบโตและแข็งแกร่งขึ้นเรื่อยๆ",
    },
    {
      id: 6,
      src: "/gallery/S__10248206_0.jpg",
      alt: "Wedding Photo 6",
      caption: "การได้อยู่กับคุณ คือการเดินทางที่แสนวิเศษ",
      description: "การเดินทางในชีวิตที่เต็มไปด้วยความวิเศษ",
    },
    {
      id: 7,
      src: "/gallery/S__10248207_0.jpg",
      alt: "Wedding Photo 7",
      caption: "มีกันและกันดีกว่าเสมอ",
      description: "การมีกันและกันคือสิ่งที่ดีที่สุดในโลก",
    },
    {
      id: 8,
      src: "/gallery/S__10248208_0.jpg",
      alt: "Wedding Photo 8",
      caption: "สุขสันต์วันของฉันและเธอ",
      description: "วันแห่งความสุขของเราทั้งสอง",
    },
    {
      id: 9,
      src: "/gallery/S__10248209_0.jpg",
      alt: "Wedding Photo 9",
      caption: "วันนี้ พรุ่งนี้ เสมอไป ตลอดกาล",
      description: "สัญญาที่จะอยู่เคียงข้างกันตลอดไป",
    },
    {
      id: 10,
      src: "/gallery/S__10248210_0.jpg",
      alt: "Wedding Photo 10",
      caption: "ชีวิตคู่ของเราจะมั่นคงไปจนวันสุดท้าย",
      description: "ชีวิตคู่ที่แข็งแกร่งและมั่นคง",
    },
    {
      id: 11,
      src: "/gallery/S__10248211_0.jpg",
      alt: "Wedding Photo 11",
      isFeature: true,
      caption: "ชีวิตคู่ที่เต็มไปด้วยความรักและความอบอุ่น",
      description: "ความอบอุ่นที่ล้อมรอบเราทั้งสอง",
    },
    {
      id: 12,
      src: "/gallery/S__10248213_0.jpg",
      alt: "Wedding Photo 12",
      caption: "สู่ชีวิตคู่ที่แสนวิเศษ",
      description: "เริ่มต้นชีวิตคู่ที่งดงามและวิเศษ",
    },
    {
      id: 13,
      src: "/gallery/S__10248214_0.jpg",
      alt: "Wedding Photo 13",
      caption: "ให้สิ่งที่ดีที่สุดแก่กันและกัน",
      description: "การให้และการรับที่สมดุลและงดงาม",
    },
    {
      id: 14,
      src: "/gallery/S__10248215_0.jpg",
      alt: "Wedding Photo 14",
      caption: "ขอแค่มีเราอยู่ข้างกันจนวันสุดท้าย",
      description: "ความปรารถนาเดียวคือการได้อยู่เคียงข้างกัน",
    },
    {
      id: 15,
      src: "/gallery/S__10248216_0.jpg",
      alt: "Wedding Photo 15",
      caption: "รักตลอดไปและตลอดกาล",
      description: "รักที่ไม่มีวันสิ้นสุดและไม่มีวันเปลี่ยนแปลง",
    },
    {
      id: 16,
      src: "/gallery/S__10248217_0.jpg",
      alt: "Wedding Photo 16",
      caption: "เราจะเป็นรักของกันและกันเสมอ",
      description: "สัญญาแห่งความรักที่จะคงอยู่ตลอดไป",
    },
    {
      id: 17,
      src: "/gallery/S__10248218_0.jpg",
      alt: "Wedding Photo 17",
      caption: "รักคุณเสมอทุกวันทุกเวลา",
      description: "ความรักที่ไม่มีวันหยุดหย่อนเสียเวลา",
    },
    {
      id: 18,
      src: "/gallery/S__10248219_0.jpg",
      alt: "Wedding Photo 18",
      isFeature: true,
      caption: "คุณคือรักเดียวของฉัน เราคือรักเดียวของกันและกัน",
      description: "รักเดียวในใจที่มีเพียงแค่กันและกัน",
    },
    {
      id: 19,
      src: "/gallery/S__10248220_0.jpg",
      alt: "Wedding Photo 19",
      caption: "รักของเราจะคงอยู่ตลอดไป",
      description: "ความรักที่มั่นคงและยั่งยืนตลอดกาล",
    },
    {
      id: 20,
      src: "/gallery/S__10248221_0.jpg",
      alt: "Wedding Photo 20",
      caption: "ขอบคุณที่เป็นกำลังใจเสมอ",
      description: "การเป็นกำลังใจให้กันและกันในทุกสถานการณ์",
    },
    {
      id: 21,
      src: "/gallery/S__10248222_0.jpg",
      alt: "Wedding Photo 21",
      caption: "ความรักที่ไม่มีวันเปลี่ยนแปลง",
      description: "ความรักที่แท้จริงและไม่เปลี่ยนแปลง",
    },
    {
      id: 22,
      src: "/gallery/S__10248224_0.jpg",
      alt: "Wedding Photo 22",
      caption: "คุณคือความสุขของฉัน",
      description: "แหล่งที่มาของความสุขในทุกๆ วันของชีวิต",
    },
    {
      id: 23,
      src: "/gallery/S__10248225_0.jpg",
      alt: "Wedding Photo 23",
      caption: "รักที่ไม่มีเงื่อนไข",
      description: "ความรักที่บริสุทธิ์และไม่มีเงื่อนไข",
    },
    {
      id: 24,
      src: "/gallery/S__10248226_0.jpg",
      alt: "Wedding Photo 24",
      caption: "เราจะอยู่เคียงข้างกันตลอดไป",
      description: "สัญญาที่จะไม่ทิ้งกันไม่ว่าสถานการณ์จะเป็นอย่างไร",
    },
    {
      id: 25,
      src: "/gallery/S__10248227_0.jpg",
      alt: "Wedding Photo 25",
      caption: "ให้เป็นวันของเราในทุกวันต่อจากนี้",
      description: "ทุกวันคือวันพิเศษเมื่อได้อยู่ด้วยกัน",
    },
    {
      id: 26,
      src: "/gallery/S__10248228_0.jpg",
      alt: "Wedding Photo 26",
      caption: "อยู่กับคุณไม่มีวันเบื่อ",
      description: "ความสุขที่ไม่มีวันจบสิ้นเมื่ออยู่เคียงข้างกัน",
    },
    {
      id: 27,
      src: "/gallery/S__10248229_0.jpg",
      alt: "Wedding Photo 27",
      caption: "รักทุกวันจนล้นใจ",
      description: "ความรักที่เต็มเปี่ยมและล้นเหลือในทุกวัน",
    },
    {
      id: 28,
      src: "/gallery/S__10248230_0.jpg",
      alt: "Wedding Photo 28",
      caption: "คู่ชีวิตแสนวิเศษที่รอคอย",
      description: "คู่ชีวิตในฝันที่ได้พบกันในที่สุด",
    },
    {
      id: 29,
      src: "/gallery/S__10248231_0.jpg",
      alt: "Wedding Photo 29",
      caption: "ฉันจะรักคุณแม้ตอนที่คุณแก่และมีริ้วรอย",
      description: "ความรักที่จะคงอยู่แม้กาลเวลาจะผ่านไป",
    },
    {
      id: 30,
      src: "/gallery/S__10248232_0.jpg",
      alt: "Wedding Photo 30",
      caption: "เราจะเป็นของกันและกันเสมอ",
      description: "การเป็นเจ้าของหัวใจกันและกันตลอดไป",
    },
    {
      id: 31,
      src: "/gallery/S__10248233_0.jpg",
      alt: "Wedding Photo 31",
      caption: "หนึ่งเดียวในใจคือคุณ",
      description: "คนเดียวในใจและในหัวใจตลอดกาล",
    },
    {
      id: 32,
      src: "/gallery/S__10248235_0.jpg",
      alt: "Wedding Photo 32",
      caption: "ความรักของเราจะเติบโตแข็งแกร่ง",
      description: "ความรักที่จะเติบโตและแข็งแกร่งขึ้นทุกวัน",
    },
    {
      id: 33,
      src: "/gallery/S__10248236_0.jpg",
      alt: "Wedding Photo 33",
      caption: "ของขวัญล้ำค่าและความรักอันเป็นนิรันดร์",
      description: "ของขวัญที่มีค่าที่สุดคือความรักนิรันดร์",
    },
    {
      id: 34,
      src: "/gallery/S__10248237_0.jpg",
      alt: "Wedding Photo 34",
      caption: "ฝันที่เป็นจริงของเรา",
      description: "ความฝันที่สวยงามที่ได้กลายเป็นจริง",
    },
    {
      id: 35,
      src: "/gallery/S__10248238_0.jpg",
      alt: "Wedding Photo 35",
      caption: "เริ่มชีวิตแต่งงานอย่างสวยงาม",
      description: "การเริ่มต้นชีวิตคู่ที่สวยงามและเต็มไปด้วยความหวัง",
    },
    {
      id: 36,
      src: "/gallery/S__10248239_0.jpg",
      alt: "Wedding Photo 36",
      caption: "ชีวิตกับคุณมีแต่ความสุขและความหอมหวานมากขึ้น",
      description: "ชีวิตที่หวานใสและเต็มไปด้วยความสุข",
    },
    {
      id: 37,
      src: "/gallery/S__10248240_0.jpg",
      alt: "Wedding Photo 37",
      caption: "ไม่มีใครทำให้ฉันหัวเราะได้เท่าคุณเลย",
      description: "เสียงหัวเราะที่เกิดจากความสุขที่มีต่อกัน",
    },
    {
      id: 38,
      src: "/gallery/S__10248241_0.jpg",
      alt: "Wedding Photo 38",
      caption: "รอยยิ้มของกันและกัน",
      isFeature: true,
      description: "รอยยิ้มที่เกิดขึ้นเมื่อได้มองหน้ากัน",
    },
    {
      id: 39,
      src: "/gallery/S__10248242_0.jpg",
      alt: "Wedding Photo 39",
      isFeature: true,
      caption: "ช่วงเวลาดีๆด้วยกันมากมาย",
      description: "ความทรงจำดีๆ ที่สร้างขึ้นร่วมกัน",
    },
    {
      id: 40,
      src: "/gallery/S__10248244_0.jpg",
      alt: "Wedding Photo 40",
      isFeature: true,
      caption: "เฉกเช่นรอยยิ้มในภาพเซลฟี่ของเรา",
      description: "ความสุขที่แท้จริงที่สะท้อนในทุกภาพของเรา",
    },
    {
      id: 41,
      src: "/gallery/S__10248243_0.jpg",
      alt: "Wedding Photo 41",
      caption: "ขอบคุณที่รักในตัวตนของฉันเสมอ",
      description: "การรับและรักในตัวตนที่แท้จริงของกันและกัน",
    },
    {
      id: 42,
      src: "/gallery/S__10248246_0.jpg",
      alt: "Wedding Photo 42",
      caption: "คุณทำให้ชีวิตของฉันดีขึ้นกว่าเดิม",
      description: "การเปลี่ยนแปลงชีวิตให้ดีขึ้นด้วยความรัก",
    },
    {
      id: 43,
      src: "/gallery/S__10248247_0.jpg",
      alt: "Wedding Photo 43",
      caption: "นิรันดรไม่เคยยาวนานพอให้ฉันได้อยู่กับคุณเลย",
      description: "ความปรารถนาที่จะอยู่เคียงข้างกันนานกว่านิรันดร์",
    },
    {
      id: 44,
      src: "/gallery/S__10248248_0.jpg",
      alt: "Wedding Photo 44",
      caption: "พรหมลิขิตเชื่อแล้วเมื่อพบคุณ",
      description: "เมื่อพบกันคือการพิสูจน์ว่าพรหมลิขิตมีอยู่จริง",
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
                {galleryImages.slice(0, 8).map((image, index) => (
                  <SwiperSlide key={image.id}>
                    <motion.div className="group cursor-pointer">
                      <div className="relative bg-white md:rounded-3xl shadow-xl overflow-hidden border border-rose-100 h-[600px]">
                        <div className="relative h-[550px] overflow-hidden">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={index === 0}
                            loading={index === 0 ? "eager" : "lazy"}
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyojznyDzR+ya2Z3qBXSrKf8"
                          />

                          {/* Overlay Effects */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* <motion.div
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
                          </motion.div> */}

                          <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-sm font-inter drop-shadow-lg">
                              {image.description}
                            </p>
                          </div>
                        </div>

                        <div className="pt-1 text-center">
                          <h3 className="font-inter font-semibold text-gray-800">
                            {image.caption}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
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
                // Special large cards for featured photos
                const isFeatureCard = image.isFeature;

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
                      <div className={`relative overflow-hidden w-full h-full`}>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-110"
                          sizes={
                            isFeatureCard
                              ? "(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                              : "(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          }
                          priority={index < 2}
                          loading={index < 2 ? "eager" : "lazy"}
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyojznyDzR+ya2Z3qBXSrKf8"
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
                            fill={isFeatureCard ? "currentColor" : "none"}
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
                onClick={() => setViewMode("grid")}
                className="bg-gradient-to-r from-rose-400 to-pink-400 text-white px-6 py-3 rounded-full font-inter font-semibold hover:shadow-lg transition-all duration-300"
              >
                {t("gallery.viewFull")}
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
