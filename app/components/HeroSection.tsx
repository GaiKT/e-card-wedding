"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFlip } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-flip";

const HeroSection = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const preWeddingImages = [
    "/pre-wedding-no-bg/wedding-hero1.JPG",
    "/pre-wedding-no-bg/wedding-hero2.JPG",
    "/pre-wedding-no-bg/wedding-hero3.jpg",
    "/pre-wedding-no-bg/wedding-hero4.jpg",
    "/pre-wedding-no-bg/wedding-hero5.jpg",
    "/pre-wedding-no-bg/wedding-hero6.jpg",
    "/pre-wedding-no-bg/wedding-hero7.jpg",
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden pt-16 md:pt-20"
      style={{
        backgroundImage: `url('/bg/bg-2.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Decorative floating elements - reduced */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-20 h-20 bg-rose-200 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -5, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-40 right-20 w-32 h-32 bg-pink-300 rounded-full opacity-15 blur-2xl"
        />
      </div>

      <div className="container mx-auto px-4 h-screen flex items-center relative z-30 max-md:mt-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
            className="text-center lg:text-left space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{
                transform: `translateY(${scrollY * 0.05}px)`,
              }}
              className="max-md:hidden"
            >
              <div className="inline-block bg-white/90 backdrop-blur-sm rounded-full px-6 py-2 mb-6 shadow-lg border border-rose-100">
                <span className="font-inter text-sm font-semibold text-rose-600 tracking-widest uppercase">
                  {t("hero.saveTheDate")}
                </span>
              </div>
              <div className="className flex justify-around">
                <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 leading-tight mb-4">
                  {t("hero.weAreGetting")}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600">
                    {t("hero.married")}
                  </span>
                </h1>
                <Image
                  src="/logo/logo.png"
                  className="object-contain"
                  alt="logo"
                  width={250}
                  height={250}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.6 }}
              style={{
                transform: `translateY(${scrollY * 0.08}px)`,
              }}
              className="space-y-6"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-rose-100">
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  {t("hero.names")}
                </h2>
                <div className="flex items-center justify-center lg:justify-start space-x-4 text-gray-600">
                  <div className="flex items-center space-x-2">
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
                    <span className="font-inter font-semibold">
                      {t("hero.date")}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2 mt-2">
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
                  <span className="font-inter text-gray-600">
                    {t("hero.time")}
                  </span>
                </div>
              </div>

              <p className="font-inter text-lg text-gray-600 leading-relaxed">
                {t("hero.description")}
              </p>

              <motion.div
                style={{
                  transform: `translateY(${scrollY * 0.06}px)`,
                }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-full font-inter font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  {t("hero.viewInvitation")}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-rose-300 text-rose-600 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full font-inter font-semibold text-lg hover:bg-rose-50 transition-all duration-300"
                >
                  {t("hero.rsvp")}
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right side - Image Swiper */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{
              transform: `translateY(${scrollY * -0.1}px)`,
            }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-lg">
              {/* Swiper Container */}
              <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFlip]}
                spaceBetween={30}
                slidesPerView={1}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                // pagination={{
                //   clickable: true,
                //   bulletClass: "swiper-pagination-bullet custom-bullet",
                //   bulletActiveClass:
                //     "swiper-pagination-bullet-active custom-bullet-active",
                // }}
                effect="flip"
                flipEffect={{
                  slideShadows: true,
                  limitRotation: true,
                }}
                loop={true}
                className="wedding-swiper rounded-3xl shadow-2xl rotate-3"
              >
                {preWeddingImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="relative"
                    >
                      <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white/80 backdrop-blur-sm">
                        <Image
                          src={image}
                          alt={`Pre-wedding photo ${index + 1}`}
                          width={500}
                          height={600}
                          className="w-full h-auto object-cover"
                          priority={index === 0}
                        />

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                        {/* Floating hearts */}
                        <motion.div
                          animate={{
                            y: [0, -10, 0],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="absolute top-4 right-4 text-2xl"
                        >
                          💕
                        </motion.div>
                        <motion.div
                          animate={{
                            y: [0, -15, 0],
                            opacity: [0.3, 0.8, 0.3],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: 1,
                          }}
                          className="absolute bottom-4 left-4 text-xl"
                        >
                          💖
                        </motion.div>
                      </div>

                      {/* Decorative frame */}
                      <div className="absolute -inset-4 bg-gradient-to-r from-rose-200 via-pink-200 to-rose-200 rounded-3xl opacity-30 -z-10 blur-lg" />
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Buttons */}
              {/* <div className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg cursor-pointer hover:bg-white transition-all duration-300 group">
                <svg
                  className="w-5 h-5 text-rose-600 group-hover:text-rose-700"
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
              </div>
              <div className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg cursor-pointer hover:bg-white transition-all duration-300 group">
                <svg
                  className="w-5 h-5 text-rose-600 group-hover:text-rose-700"
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
              </div> */}

              {/* Side decorative elements */}
              <motion.div
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-rose-300 to-pink-300 rounded-full opacity-40 blur-sm"
              />
              <motion.div
                animate={{ rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-8 -left-8 w-12 h-12 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full opacity-50 blur-sm"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center cursor-pointer text-gray-600 hover:text-rose-500 transition-colors duration-300"
        >
          <span className="font-inter text-sm mb-2">
            {t("hero.exploreStory")}
          </span>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-8 h-8 border-2 border-current rounded-full flex items-center justify-center"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
