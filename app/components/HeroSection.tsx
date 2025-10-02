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

  const preWeddingImages = [
    "/pre-wedding-no-bg/wedding-hero2.jpg",
    "/pre-wedding-no-bg/wedding-hero1.jpg",
    "/pre-wedding-no-bg/wedding-hero4.JPG",
    "/pre-wedding-no-bg/wedding-hero6.jpg",
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden py-16 md:pt-20"
      style={{
        backgroundImage: `url('/bg/bg-2.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll",
      }}
    >
      {/* Decorative floating elements - responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 md:opacity-30">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-4 md:left-10 w-12 h-12 md:w-20 md:h-20 bg-rose-200 rounded-full opacity-20 blur-xl"
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
          className="absolute top-40 right-4 md:right-20 w-20 h-20 md:w-32 md:h-32 bg-pink-300 rounded-full opacity-15 blur-2xl"
        />
      </div>

      <div className="container mx-auto px-4 min-h-screen flex items-center relative z-30 py-4 sm:py-8 md:py-16">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 md:gap-12 items-center w-full">
          {/* Left side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center lg:text-left space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.3 }}
              className=""
            >
              <div className="inline-block bg-white/90 backdrop-blur-sm rounded-full px-4 py-1 sm:px-6 sm:py-2 mb-4 sm:mb-6 shadow-lg border border-rose-100">
                <span className="font-inter text-sm font-semibold text-rose-600 tracking-widest uppercase">
                  {t("hero.saveTheDate")}
                </span>
              </div>
              <div className="flex max-md:flex-col justify-center items-center lg:justify-between">
                <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-gray-800 leading-tight text-center lg:text-left">
                  {t("hero.weAreGetting")}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600">
                    {t("hero.married")}
                  </span>
                </h1>
                <Image
                  src="/logo/logo.png"
                  alt="logo"
                  className="max-md:w-40 md:-rotate-8"
                  width={250}
                  height={250}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="space-y-3 sm:space-y-4 md:space-y-6"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 sm:p-4 md:p-6 shadow-xl border border-rose-100">
                <h2 className="font-playfair text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
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

              <p className="font-inter text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed px-2 sm:px-4 md:px-0">
                {t("hero.description")}
              </p>

              <motion.div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center lg:justify-start px-2 sm:px-0">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const element = document.querySelector(
                      "#invitation"
                    ) as HTMLElement;
                    if (element) {
                      const headerHeight = 80;
                      const elementPosition = element.offsetTop - headerHeight;
                      window.scrollTo({
                        top: elementPosition,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full font-inter font-semibold text-sm sm:text-base md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  {t("hero.viewInvitation")}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const element = document.querySelector(
                      "#blessings"
                    ) as HTMLElement;
                    if (element) {
                      const headerHeight = 80;
                      const elementPosition = element.offsetTop - headerHeight;
                      window.scrollTo({
                        top: elementPosition,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="border-2 border-rose-300 text-rose-600 bg-white/80 backdrop-blur-sm px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full font-inter font-semibold text-sm sm:text-base md:text-lg hover:bg-rose-50 transition-all duration-300"
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
            className="relative order-1 lg:order-2 mb-4 sm:mb-8 lg:mb-0"
          >
            <div className="relative w-full">
              {/* Swiper Container */}
              <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFlip]}
                spaceBetween={30}
                slidesPerView={1}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                effect="flip"
                flipEffect={{
                  slideShadows: false,
                  limitRotation: true,
                }}
                loop={true}
                className="wedding-swiper"
              >
                {preWeddingImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="relative"
                    >
                      <div className="relative overflow-hidden border-4 md:border-8 border-white/80 backdrop-blur-sm">
                        <Image
                          src={image}
                          alt={`Pre-wedding photo ${index + 1}`}
                          width={500}
                          height={500}
                          className="w-full h-[300px] sm:h-[400px] md:h-[550px] object-cover"
                          loading={index === 0 ? "eager" : "lazy"}
                          priority={index === 0}
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyojznyDzR+ya2Z3qBXSrKf8"
                          sizes="(max-width: 640px) 300px, (max-width: 768px) 400px, 550px"
                        />

                        {/* Overlay gradient */}
                        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent rounded-2xl to-transparent" /> */}

                        {/* Floating hearts */}
                        <motion.div
                          animate={{
                            y: [0, -10, 0],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="absolute top-2 right-2 md:top-4 md:right-4 text-lg md:text-2xl"
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
                          className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-base md:text-xl"
                        >
                          💖
                        </motion.div>
                      </div>

                      {/* Decorative frame */}
                      {/* <div className="absolute -inset-4 bg-gradient-to-r from-rose-200 via-pink-200 to-rose-200 rounded-3xl opacity-30 -z-10 blur-lg" /> */}
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Side decorative elements */}
              <motion.div
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 md:-top-8 md:-right-8 w-8 h-8 md:w-16 md:h-16 bg-gradient-to-br from-rose-300 to-pink-300 rounded-full opacity-40 blur-sm"
              />
              <motion.div
                animate={{ rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 w-6 h-6 md:w-12 md:h-12 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full opacity-50 blur-sm"
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
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center cursor-pointer text-gray-600 hover:text-rose-500 transition-colors duration-300"
        >
          <span className="font-inter text-xs md:text-sm mb-2 sm:block">
            {t("hero.exploreStory")}
          </span>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-6 h-6 md:w-8 md:h-8 border-2 border-current rounded-full flex items-center justify-center"
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
