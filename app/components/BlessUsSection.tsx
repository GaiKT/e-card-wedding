"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const BlessUsSection = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Blessing submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  const sampleBlessings = [
    {
      name: "Sarah & John",
      message:
        "Wishing you a lifetime of love and happiness. May your marriage be blessed with joy, laughter, and endless adventures together!",
      date: "2 days ago",
    },
    {
      name: "The Johnson Family",
      message:
        "Congratulations on your special day! We're so excited to celebrate with you and can't wait to see what the future holds for you both.",
      date: "3 days ago",
    },
    {
      name: "Lisa Marie",
      message:
        "You two are perfect for each other! May your love story continue to inspire everyone around you. Congratulations! 💕",
      date: "5 days ago",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-rose-50 to-pink-100 relative overflow-hidden"
      style={{
        backgroundImage: `url('/bg/bg-3.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-rose-300 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-300 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-rose-200 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            {t("blessings.title")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto mb-6" />
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            {t("blessings.description")}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Blessing Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-rose-100">
              <h3 className="font-playfair text-3xl font-bold text-gray-800 mb-6 text-center">
                {t("blessings.sendTitle")}
              </h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="text-6xl mb-4">💖</div>
                  <h4 className="font-playfair text-2xl font-bold text-gray-800 mb-2">
                    {t("blessings.thankYou")}
                  </h4>
                  <p className="font-inter text-gray-600">
                    {t("blessings.thankYouDesc")}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-inter font-semibold text-gray-700 mb-2"
                    >
                      {t("blessings.name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                      placeholder={t("blessings.namePlaceholder")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block font-inter font-semibold text-gray-700 mb-2"
                    >
                      {t("blessings.email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                      placeholder={t("blessings.emailPlaceholder")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block font-inter font-semibold text-gray-700 mb-2"
                    >
                      {t("blessings.message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder={t("blessings.messagePlaceholder")}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-rose-400 to-pink-400 text-white py-4 rounded-xl font-inter font-semibold text-lg hover:shadow-lg transition-all duration-300"
                  >
                    {t("blessings.send")}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Blessings Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-rose-100 h-full">
              <h3 className="font-playfair text-3xl font-bold text-gray-800 mb-6 text-center">
                {t("blessings.recent")}
              </h3>

              <div className="space-y-6 max-h-96 overflow-y-auto custom-scrollbar">
                {sampleBlessings.map((blessing, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-2xl border border-rose-100"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-inter font-semibold text-gray-800">
                        {blessing.name}
                      </h4>
                      <span className="text-sm text-gray-500 font-inter">
                        {blessing.date}
                      </span>
                    </div>
                    <p className="font-inter text-gray-600 leading-relaxed">
                      {blessing.message}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-rose-300 text-rose-600 px-6 py-3 rounded-full font-inter font-semibold hover:bg-rose-50 transition-all duration-300"
                >
                  {t("blessings.viewAll")}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-rose-100">
            <h3 className="font-playfair text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {t("blessings.presence")}
            </h3>
            <p className="font-inter text-lg text-gray-600">
              {t("blessings.presenceDesc")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlessUsSection;
