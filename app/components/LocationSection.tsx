"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "../contexts/LanguageContext";

const LocationSection = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const venues = [
    {
      title: t("location.venue"),
      name: t("location.name"),
      address: t("location.address"),
      time: t("location.time"),
      description: t("location.description"),
      icon: "⛪",
      mapUrl: "https://maps.app.goo.gl/waLEsnL2mae4L4Et7",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-gray-50 to-rose-50 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-rose-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-300 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            {t("location.title")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto mb-6" />
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            {t("location.description")}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center">
            {venues.map((venue, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden border border-rose-100 h-full"
                >
                  <div className="relative h-64 bg-gradient-to-br from-rose-100 to-pink-200 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                      className="text-8xl mb-4"
                    >
                      {venue.icon}
                    </motion.div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                      <span className="font-inter font-semibold text-rose-600 text-sm">
                        {venue.title}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="font-playfair text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                      {venue.name}
                    </h3>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-start space-x-3">
                        <svg
                          className="w-5 h-5 text-rose-500 mt-1 flex-shrink-0"
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
                        <p className="font-inter text-gray-600">
                          {venue.address}
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
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
                        <p className="font-inter font-semibold text-gray-800">
                          {venue.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <motion.a
                        href={venue.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-gradient-to-r from-rose-400 to-pink-400 text-white px-6 py-3 rounded-full font-inter font-semibold text-center hover:shadow-lg transition-all duration-300"
                      >
                        {t("location.getDirections")}
                      </motion.a>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 border-2 border-rose-300 text-rose-600 rounded-full font-inter font-semibold hover:bg-rose-50 transition-all duration-300"
                      >
                        {t("location.addToCalendar")}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 mb-16"
        >
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-rose-100 max-w-5xl mx-auto">
            <div className="p-6 bg-gradient-to-r from-rose-50 to-pink-50">
              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-gray-800 text-center mb-2">
                🗺️ {t("location.mapTitle")}
              </h3>
              <p className="font-inter text-gray-600 text-center">
                {t("location.mapDescription")}
              </p>
            </div>

            {/* Google Maps Embed */}
            <div className="relative h-96 md:h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7659.123456789!2d99.8123456!3d15.2123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e0123456789!2z4Lio4Liy4Lil4Liy4Lib4Lij4Liw4LiI4Liy4LiE4Lih4Lit4Liz4LmA4Lig4Lit4Lir4LiZ4Lit4LiH4LiJ4Liy4LiH!5e0!3m2!1sen!2sth!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wedding Venue Location"
                className="rounded-b-3xl"
              ></iframe>
            </div>

            {/* Map Controls */}
            <div className="p-6 bg-gradient-to-r from-rose-50 to-pink-50">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="https://goo.gl/maps/PLACE_ID_FOR_NONG_CHANG_COMMUNITY_HALL"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-rose-400 to-pink-400 text-white px-6 py-3 rounded-full font-inter font-semibold text-center hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{t("location.openInMaps")}</span>
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const address = venues[0].address;
                    const url = `https://maps.google.com/maps?q=${encodeURIComponent(
                      address
                    )}`;
                    window.open(url, "_blank");
                  }}
                  className="px-6 py-3 border-2 border-rose-300 text-rose-600 rounded-full font-inter font-semibold hover:bg-rose-50 transition-all duration-300 flex items-center justify-center space-x-2"
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
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"
                    />
                  </svg>
                  <span>{t("location.getDirections")}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const eventDate = "20241119T063000Z"; // November 19, 2024 at 06:30 AM UTC+7
                    const eventTitle = "Nattapong & Nattaporn Wedding";
                    const eventLocation =
                      "Nong Chang District Community Hall, Uthai Thani";
                    const eventDetails =
                      "Wedding ceremony of Nattapong & Nattaporn";

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
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto border border-rose-100">
            <h3 className="font-playfair text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {t("location.additionalInfo")}
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-inter font-semibold text-gray-800 mb-2">
                  🚗 {t("location.parking")}
                </h4>
                <p className="font-inter text-gray-600 text-sm">
                  {t("location.parkingDesc")}
                </p>
              </div>
              <div>
                <h4 className="font-inter font-semibold text-gray-800 mb-2">
                  🚌 {t("location.transport")}
                </h4>
                <p className="font-inter text-gray-600 text-sm">
                  {t("location.transportDesc")}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection;
