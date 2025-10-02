"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Blessing, ApiResponse } from "@/types/blessing";

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
  const [isLoading, setIsLoading] = useState(false);
  const [blessings, setBlessings] = useState<Blessing[]>([]);
  const [isLoadingBlessings, setIsLoadingBlessings] = useState(true);

  // Fetch blessings on component mount
  useEffect(() => {
    fetchBlessings();
  }, []);

  const fetchBlessings = async () => {
    try {
      setIsLoadingBlessings(true);
      const response = await fetch("/api/blessings");
      const result: ApiResponse<Blessing[]> = await response.json();

      if (result.success && result.data) {
        setBlessings(result.data);
      } else {
        console.error("Failed to fetch blessings:", result.error);
      }
    } catch (error) {
      console.error("Error fetching blessings:", error);
    } finally {
      setIsLoadingBlessings(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await fetch("/api/blessings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result: ApiResponse<Blessing> = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });

        // Refresh blessings list
        await fetchBlessings();
      } else {
        console.error("Failed to submit blessing:", result.error);
        alert("Failed to submit blessing. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting blessing:", error);
      alert("Failed to submit blessing. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-rose-50 to-pink-100 relative overflow-hidden"
      style={{
        backgroundImage: `url('/bg/bg-cloud.jpg')`,
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
                    disabled={isLoading}
                    whileHover={{ scale: isLoading ? 1 : 1.05 }}
                    whileTap={{ scale: isLoading ? 1 : 0.95 }}
                    className={`w-full py-4 rounded-xl font-inter font-semibold text-lg transition-all duration-300 ${
                      isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-rose-400 to-pink-400 text-white hover:shadow-lg"
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      t("blessings.send")
                    )}
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
                {isLoadingBlessings ? (
                  // Loading skeleton
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-2xl border border-rose-100 animate-pulse"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                          <div className="h-3 bg-gray-200 rounded w-16"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 bg-gray-200 rounded w-full"></div>
                          <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : blessings.length > 0 ? (
                  blessings.map((blessing, index) => (
                    <motion.div
                      key={blessing.id}
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
                          {new Date(blessing.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="font-inter text-gray-600 leading-relaxed">
                        {blessing.message}
                      </p>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p className="font-inter">
                      No blessings yet. Be the first to send your wishes!
                    </p>
                  </div>
                )}
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
