"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "../contexts/LanguageContext";

const WeddingPlanSection = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const weddingSchedule = [
    {
      time: "06:30 น.",
      title: t("plan.guestArrival"),
      description: t("plan.guestArrivalDesc"),
      icon: "📅",
      location: "ศาลาประชาคม อำเภอหนองฉาง",
      duration: "30 นาที",
    },
    {
      time: "07:09 น.",
      title: t("plan.buddha"),
      description: t("plan.buddhaDesc"),
      icon: "🪷",
      location: "ศาลาประชาคม อำเภอหนองฉาง",
      duration: "1 ชั่วโมง",
    },
    {
      time: "08:09 น.",
      title: t("plan.ceremony"),
      description: t("plan.ceremonyDesc"),
      icon: "👰🏻🤵🏻",
      location: "ศาลาประชาคม อำเภอหนองฉาง",
      duration: "1 ชั่วโมง",
      highlight: true,
    },
    {
      time: "09:09 น.",
      title: t("plan.blessings"),
      description: t("plan.blessingsDesc"),
      icon: "🐚",
      location: "ศาลาประชาคม อำเภอหนองฉาง",
      duration: "30 นาที",
      highlight: true,
    },
    {
      time: "10:00 น.",
      title: t("plan.lunch"),
      description: t("plan.lunchDesc"),
      icon: "🍽️",
      location: "ศาลาประชาคม อำเภอหนองฉาง",
      duration: "1 ชั่วโมง",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage: `url('/bg/bg-2.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 bg-purple-300 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-32 h-32 bg-rose-300 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-60 h-60 bg-pink-200 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            {t("plan.title")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-6" />
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            {t("plan.description")}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-300 via-rose-300 to-pink-300 rounded-full hidden md:block" />

            {weddingSchedule.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <motion.div
                  className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full hidden md:block z-10 ${
                    event.highlight
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
                      : "bg-gradient-to-r from-purple-300 to-rose-300"
                  }`}
                  whileHover={{ scale: 1.3 }}
                />

                {/* Content card */}
                <div
                  className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`rounded-3xl shadow-xl p-6 md:p-8 border relative overflow-hidden ${
                      event.highlight
                        ? "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200"
                        : "bg-white border-rose-100"
                    }`}
                  >
                    {/* Highlight badge */}
                    {event.highlight && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {"highlight"}
                      </div>
                    )}

                    {/* Time badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2 rounded-full font-inter font-bold text-lg">
                        {event.time}
                      </div>
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                        className="text-4xl"
                      >
                        {event.icon}
                      </motion.div>
                    </div>

                    <h3 className="font-playfair text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                      {event.title}
                    </h3>

                    <p className="font-inter text-gray-600 leading-relaxed mb-4">
                      {event.description}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <svg
                          className="w-4 h-4 text-purple-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="font-inter text-sm text-gray-600 font-semibold">
                          {event.location}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg
                          className="w-4 h-4 text-purple-500"
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
                        <span className="font-inter text-sm text-gray-600">
                          Duration: {event.duration}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block md:w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-3xl mx-auto border border-purple-100">
            <h3 className="font-playfair text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {t("plan.importantNotes")}
            </h3>
            <div className="grid md:grid-cols-1 gap-6 text-left">
              <div>
                <h4 className="font-inter font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="mr-2">👗</span>
                  {t("plan.dressCode")}
                </h4>
                <p className="font-inter text-gray-600 text-sm mb-3">
                  {t("plan.dressCodeDesc")}
                </p>
                {/* Color indicators */}
                <div className="flex justify-center flex-wrap md:gap-8 gap-3">
                  <div className="flex items-center space-x-1">
                    <div className="w-8 h-8 bg-[#993F0D] rounded-full"></div>
                    <span className="text-xs text-gray-500"></span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-8 h-8 bg-[#C0654C] rounded-full"></div>
                    <span className="text-xs text-gray-500"></span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-8 h-8 bg-[#C78344] rounded-full"></div>
                    <span className="text-xs text-gray-500"></span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-8 h-8 bg-[#E28955] rounded-full"></div>
                    <span className="text-xs text-gray-500"></span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-8 h-8 bg-[#D9B9AE] rounded-full"></div>
                    <span className="text-xs text-gray-500"></span>
                  </div>
                </div>
              </div>
              {/* <div>
                <h4 className="font-inter font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="mr-2">🚗</span>
                  {t("plan.transportation")}
                </h4>
                <p className="font-inter text-gray-600 text-sm">
                  {t("plan.transportationDesc")}
                </p>
              </div> */}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeddingPlanSection;
