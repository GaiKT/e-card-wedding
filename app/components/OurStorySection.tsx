"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";

const OurStorySection = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    threshold: 0.05,
    triggerOnce: true,
    rootMargin: "50px 0px",
  });

  // Fallback to show content after 2 seconds even if intersection observer doesn't trigger
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const storyItems = [
    {
      title: t("story.firstMeet"),
      date: t("story.firstMeetDate"),
      story: t("story.firstMeetDesc"),
      position: "left",
      url: "/our-story/firstchat.jpg",
    },
    {
      title: t("story.feeling"),
      date: t("story.feelingDate"),
      story: t("story.feelingDesc"),
      position: "right",
      url: "/our-story/gaming.jpg",
    },
    {
      title: t("story.firstDate"),
      date: t("story.firstDateDate"),
      story: t("story.firstDateDesc"),
      position: "left",
      url: "/our-story/firstdate.jpg",
    },
    {
      title: t("story.pet"),
      date: t("story.petDate"),
      story: t("story.petDesc"),
      position: "right",
      url: "/our-story/pet.jpg",
    },
    {
      title: t("story.bigtrip"),
      date: t("story.bigtripDate"),
      story: t("story.bigtripDesc"),
      position: "left",
      url: "/our-story/bigtrip.jpg",
    },
    {
      title: t("story.proposal"),
      date: t("story.proposalDate"),
      story: t("story.proposalDesc"),
      position: "right",
      url: "/our-story/proposal.gif",
    },
  ];

  return (
    <section
      id="story"
      ref={ref}
      className="py-12 md:py-20 bg-gradient-to-b from-rose-50 via-orange-50 to-pink-100 relative overflow-hidden min-h-screen"
    >
      {/* Simplified decorative elements - Performance optimized */}
      <div className="absolute inset-0 opacity-5 md:opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 md:w-32 md:h-32 bg-rose-300 rounded-full blur-sm" />
        <div className="absolute bottom-20 right-10 w-20 h-20 md:w-40 md:h-40 bg-pink-300 rounded-full blur-sm" />
        <div className="absolute top-40 right-20 w-12 h-12 md:w-24 md:h-24 bg-rose-200 rounded-full blur-lg" />
        <div className="absolute bottom-40 left-20 w-14 h-14 md:w-28 md:h-28 bg-pink-200 rounded-full blur-lg" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            inView || showFallback
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            {t("story.title")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto mb-6" />
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            {t("story.description")}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {storyItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: item.position === "left" ? -30 : 30 }}
              animate={
                inView || showFallback
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: item.position === "left" ? -30 : 30 }
              }
              transition={{ duration: 0.6, delay: Math.min(index * 0.2, 1.0) }}
              className={`flex flex-col items-center mb-6 md:mb-12 ${
                item.position === "right"
                  ? "md:flex-row-reverse"
                  : "md:flex-row"
              } min-h-[200px] md:min-h-[300px]`}
            >
              <div className="w-full md:w-1/2 p-4 md:p-8">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="bg-white rounded-2xl shadow-lg md:shadow-xl p-4 md:p-6 lg:p-8 relative overflow-hidden min-h-[150px]"
                >
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 to-pink-400" />
                  <h3 className="font-playfair text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="font-inter text-rose-600 font-semibold mb-4 text-base md:text-lg">
                    {item.date}
                  </p>
                  <p className="font-inter text-gray-600 leading-relaxed text-sm md:text-base">
                    {item.story}
                  </p>
                </motion.div>
              </div>

              <div
                className={`w-full md:w-1/2 flex justify-center items-center p-4 md:p-8`}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-gradient-to-br from-rose-200 to-pink-300 rounded-full flex items-center justify-center shadow-lg md:shadow-2xl p-2 md:p-3 lg:p-4"
                >
                  {/* Next.js Image with lazy loading */}
                  <div className="w-full h-full rounded-full overflow-hidden shadow-lg">
                    <Image
                      src={item.url}
                      alt={`Story ${index + 1}`}
                      width={256}
                      height={256}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyojznyDzR+ya2Z3qBXSrKf8"
                      sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            inView || showFallback
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-8 md:mt-16 relative z-10"
        >
          <div className="bg-white rounded-2xl shadow-lg md:shadow-xl p-6 md:p-12 max-w-3xl mx-auto border border-rose-100">
            <h3 className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
              {t("story.andNow")}
            </h3>
            <p className="font-inter text-base md:text-lg text-gray-600 leading-relaxed mb-4 md:mb-6">
              {t("story.nextChapter")}
            </p>
            <div className="flex items-center justify-center space-x-3 md:space-x-4 text-xl md:text-2xl">
              <span>💕</span>
              <span className="font-playfair text-lg md:text-xl text-rose-600 font-semibold">
                {t("story.forever")}
              </span>
              <span>💕</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStorySection;
