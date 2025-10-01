"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "../contexts/LanguageContext";

const OurStorySection = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const storyItems = [
    {
      title: t("story.firstMeet"),
      date: t("story.firstMeetDate"),
      story: t("story.firstMeetDesc"),
      position: "left",
    },
    {
      title: t("story.firstDate"),
      date: t("story.firstDateDate"),
      story: t("story.firstDateDesc"),
      position: "right",
    },
    {
      title: t("story.proposal"),
      date: t("story.proposalDate"),
      story: t("story.proposalDesc"),
      position: "left",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-rose-50 to-pink-100 relative overflow-hidden shadow-xl shadow-black"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-rose-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-300 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
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
              initial={{ opacity: 0, x: item.position === "left" ? -100 : 100 }}
              animate={
                inView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: item.position === "left" ? -100 : 100 }
              }
              transition={{ duration: 0.8, delay: index * 0.3 }}
              className={`flex flex-col md:flex-row items-center mb-16 ${
                item.position === "right" ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="md:w-1/2 p-8">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 to-pink-400" />
                  <h3 className="font-playfair text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="font-inter text-rose-600 font-semibold mb-4 text-lg">
                    {item.date}
                  </p>
                  <p className="font-inter text-gray-600 leading-relaxed">
                    {item.story}
                  </p>
                </motion.div>
              </div>

              <div className="md:w-1/2 flex justify-center items-center p-8">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-rose-200 to-pink-300 rounded-full flex items-center justify-center shadow-2xl"
                >
                  <div className="text-6xl md:text-7xl">
                    {index === 0 ? "☕" : index === 1 ? "🌅" : "💍"}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl shadow-xl p-12 max-w-3xl mx-auto border border-rose-100">
            <h3 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {t("story.andNow")}
            </h3>
            <p className="font-inter text-lg text-gray-600 leading-relaxed mb-6">
              {t("story.nextChapter")}
            </p>
            <div className="flex items-center justify-center space-x-4 text-2xl">
              <span>💕</span>
              <span className="font-playfair text-xl text-rose-600 font-semibold">
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
