"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const CountdownSection = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isExpired, setIsExpired] = useState(false);

  // Remove heavy scroll tracking for better performance
  // const [scrollY, setScrollY] = useState(0);

  // Track scroll for parallax effects - REMOVED FOR PERFORMANCE
  // useEffect(() => {
  //   const handleScroll = () => setScrollY(window.scrollY);
  //   window.addEventListener("scroll", handleScroll, { passive: true });
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  useEffect(() => {
    // Wedding date: November 19, 2025 at 4:00 PM
    const weddingDate = new Date("2025-11-19T16:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsExpired(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
      }
    };

    // Update immediately
    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: t("countdown.days"), value: timeLeft.days, icon: "📅" },
    { label: t("countdown.hours"), value: timeLeft.hours, icon: "⏰" },
    { label: t("countdown.minutes"), value: timeLeft.minutes, icon: "⏳" },
    { label: t("countdown.seconds"), value: timeLeft.seconds, icon: "⚡" },
  ];

  return (
    <section
      ref={ref}
      className="py-20 relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100"
    >
      {/* Simplified decorative elements for better performance */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-16 h-16 bg-rose-300 rounded-full" />
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-pink-300 rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-30">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            {isExpired ? t("countdown.marriedTitle") : t("countdown.title")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto mb-6" />
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            {isExpired
              ? t("countdown.marriedDescription")
              : t("countdown.description")}
          </p>
        </motion.div>

        {!isExpired ? (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {timeUnits.map((unit, index) => (
                <motion.div
                  key={unit.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={
                    inView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.5 }
                  }
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-white rounded-3xl shadow-lg p-6 md:p-8 border border-rose-100 relative overflow-hidden"
                  >
                    {/* Simplified background gradient */}
                    <div className="absolute inset-0 bg-rose-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300" />

                    <div className="relative z-10 text-center">
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.5,
                        }}
                        className="text-4xl md:text-5xl mb-4"
                      >
                        {unit.icon}
                      </motion.div>

                      <motion.div
                        key={unit.value}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className={`font-playfair text-4xl md:text-6xl font-bold ${
                          index === 3 ? "text-pink-500" : "text-gray-800"
                        } mb-2`}
                      >
                        {unit.value.toString().padStart(2, "0")}
                      </motion.div>

                      <p className="font-inter text-lg md:text-xl font-semibold text-gray-600 uppercase tracking-wider">
                        {unit.label}
                      </p>
                    </div>

                    {/* Simplified decorative corner elements */}
                    <div className="absolute top-2 right-2 w-6 h-6 bg-rose-200 rounded-full opacity-30" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 bg-pink-200 rounded-full opacity-30" />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mt-12"
            >
              <div className="bg-white/90 rounded-2xl shadow-lg p-8 max-w-3xl mx-auto border border-rose-100">
                <h3 className="font-playfair text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  Save the Date
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-3">
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-inter text-xl font-bold text-gray-800">
                      19 พฤศจิกายน 2568
                    </span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-inter text-xl font-bold text-gray-800">
                      06:30 น.
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center mt-6 space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const eventDate = "20241119T063000Z"; // November 19, 2024 at 06:30 AM UTC+7
                      const eventTitle = "ไปงานแต่งงาน ไก่ & โดนัท";
                      const eventLocation =
                        "Nong Chang District Community Hall, Uthai Thani";
                      const eventDetails =
                        "ไปงานแต่งงานของไก่ & โดนัท ที่ศาลาประชาคมอำเภอหนองฉาง เวลา 06:30 น. ขอให้เดินทางโดยสวัสดิภาพนะครับ";

                      const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                        eventTitle
                      )}&dates=${eventDate}/${eventDate}&details=${encodeURIComponent(
                        eventDetails
                      )}&location=${encodeURIComponent(eventLocation)}`;
                      window.open(calendarUrl, "_blank");
                    }}
                    className="px-6 py-3 border-2 border-purple-300 text-purple-600 rounded-full font-inter font-semibold hover:bg-purple-50 transition-all duration-300 flex items-center justify-center space-x-2"
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{t("location.addToCalendar")}</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="bg-white rounded-3xl shadow-xl p-12 max-w-2xl mx-auto border border-rose-100">
              <div className="text-8xl mb-6">💑</div>
              <h3 className="font-playfair text-4xl font-bold text-gray-800 mb-4">
                Just Married!
              </h3>
              <p className="font-inter text-lg text-gray-600 mb-6">
                Thank you for being part of our magical day. Our forever journey
                has begun!
              </p>
              <div className="flex items-center justify-center space-x-4 text-2xl">
                <span>💕</span>
                <span className="font-playfair text-xl text-rose-600 font-semibold">
                  Gai & Donut
                </span>
                <span>💕</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CountdownSection;
