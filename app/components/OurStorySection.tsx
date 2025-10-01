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
      ref={ref}
      className="py-20 bg-gradient-to-b from-rose-100 via-orange-50 to-pink-200 relative overflow-hidden shadow-xl shadow-black"
    >
      {/* Pre-wedding Background Images */}
      <div className="absolute inset-0 z-0">
        {/* Top Left Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={
            inView
              ? { opacity: 0.15, scale: 1, rotate: -5 }
              : { opacity: 0, scale: 0.8, rotate: -10 }
          }
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute top-10 left-10 w-32 h-32 md:w-48 md:h-48 border-4"
          style={{
            backgroundImage: `url('/pre-wedding-no-bg/wedding-hero1.JPG')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />

        {/* Top Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 15 }}
          animate={
            inView
              ? { opacity: 0.12, scale: 1, rotate: 10 }
              : { opacity: 0, scale: 0.8, rotate: 15 }
          }
          transition={{ duration: 1.2, delay: 0.4 }}
          className="absolute top-14 right-16 w-28 h-28 md:w-40 md:h-40"
          style={{
            backgroundImage: `url('/pre-wedding-no-bg/wedding-hero2.JPG')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />

        {/* Upper Left - Secondary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 20 }}
          animate={
            inView
              ? { opacity: 0.08, scale: 1, rotate: 15 }
              : { opacity: 0, scale: 0.8, rotate: 20 }
          }
          transition={{ duration: 1.2, delay: 0.8 }}
          className="absolute top-64 left-32 w-20 h-20 md:w-32 md:h-32"
          style={{
            backgroundImage: `url('/pre-wedding-no-bg/wedding-hero4.jpg')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />

        {/* Upper Right - Secondary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -25 }}
          animate={
            inView
              ? { opacity: 0.1, scale: 1, rotate: -20 }
              : { opacity: 0, scale: 0.8, rotate: -25 }
          }
          transition={{ duration: 1.2, delay: 1.0 }}
          className="absolute top-56 right-56 w-24 h-24 md:w-36 md:h-36"
          style={{
            backgroundImage: `url('/pre-wedding-no-bg/wedding-hero5.jpg')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />

        {/* Far Top Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
          animate={
            inView
              ? { opacity: 0.06, scale: 1, rotate: 5 }
              : { opacity: 0, scale: 0.8, rotate: 10 }
          }
          transition={{ duration: 1.2, delay: 1.2 }}
          className="absolute top-8 right-60 w-16 h-16 md:w-24 md:h-24"
          style={{
            backgroundImage: `url('/pre-wedding-no-bg/wedding-hero6.jpg')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />

        <div
          className="absolute bottom-[-100px] right-[-100px] w-[720px] h-[1080px] opacity-100 z-50"
          style={{
            backgroundImage: `url('/pre-wedding-no-bg/wedding-withOut-bg.png')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
      </div>

      {/* Subtle Color Blobs */}

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
                  className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-rose-200 to-pink-300 rounded-full flex items-center justify-center shadow-2xl p-4"
                >
                  {/* Image is set as background */}
                  <div
                    className="w-full h-full bg-cover bg-center rounded-4xl overflow-hidden shadow-lg"
                    style={{ backgroundImage: `url('${item.url}')` }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16 z-99"
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
