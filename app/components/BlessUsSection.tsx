"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Blessing, ApiResponse } from "@/types/blessing";
import Image from "next/image";
import toast from "react-hot-toast";

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
    willAttend: null as boolean | null, // เพิ่ม field สำหรับการเข้าร่วมงาน
    hasDonated: false as boolean, // เพิ่ม field สำหรับการบริจาค
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [blessings, setBlessings] = useState<Blessing[]>([]);
  const [isLoadingBlessings, setIsLoadingBlessings] = useState(true);
  const [showQRCode, setShowQRCode] = useState(false); // เพิ่ม state สำหรับแสดง QR Code

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

  // เพิ่ม function สำหรับจัดการ attendance selection
  const handleAttendanceChange = (willAttend: boolean) => {
    setFormData({
      ...formData,
      willAttend,
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
        setFormData({
          name: "",
          email: "",
          message: "",
          willAttend: null,
          hasDonated: false,
        });

        // Refresh blessings list
        await fetchBlessings();
      } else {
        console.error("Failed to submit blessing:", result.error);
        toast.error("ไม่สามารถส่งคำอวยพรได้ กรุณาลองใหม่อีกครั้ง", {
          icon: "😔",
        });
      }
    } catch (error) {
      console.error("Error submitting blessing:", error);
      toast.error("เกิดข้อผิดพลาดในการส่งคำอวยพร กรุณาลองใหม่อีกครั้ง", {
        icon: "⚠️",
      });
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

                  {/* เพิ่ม Attendance Selection */}
                  <div>
                    <label className="block font-inter font-semibold text-gray-700 mb-3">
                      {t("blessings.willAttend")}
                    </label>
                    <div className="flex gap-4">
                      <motion.button
                        type="button"
                        onClick={() => handleAttendanceChange(true)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all duration-300 ${
                          formData.willAttend === true
                            ? "border-green-400 bg-green-50 text-green-700"
                            : "border-gray-200 text-gray-600 hover:border-green-300"
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <span className="text-2xl">✅</span>
                          <span className="font-inter font-semibold">
                            {t("blessings.willAttendYes")}
                          </span>
                        </div>
                      </motion.button>

                      <motion.button
                        type="button"
                        onClick={() => handleAttendanceChange(false)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all duration-300 ${
                          formData.willAttend === false
                            ? "border-red-400 bg-red-50 text-red-700"
                            : "border-gray-200 text-gray-600 hover:border-red-300"
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <span className="text-2xl">❌</span>
                          <span className="font-inter font-semibold">
                            {t("blessings.willAttendNo")}
                          </span>
                        </div>
                      </motion.button>
                    </div>
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

                  {/* Donate Button */}
                  <motion.button
                    type="button"
                    onClick={() => setShowQRCode(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-4 rounded-xl font-inter font-semibold text-lg transition-all duration-300 bg-gradient-to-r from-amber-400 to-orange-400 text-white hover:shadow-lg border-2 border-transparent hover:border-amber-300"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span>{t("blessings.showQRCode")}</span>
                    </div>
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
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <h4 className="font-inter font-semibold text-gray-800">
                            {blessing.name}
                          </h4>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {/* แสดงสถานะการเข้าร่วมงาน */}
                            {blessing.willAttend !== null && (
                              <span
                                className={`text-xs px-2 py-1 rounded-full font-inter font-medium whitespace-nowrap ${
                                  blessing.willAttend
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-pink-700"
                                }`}
                              >
                                <span>
                                  {blessing.willAttend
                                    ? "ไปร่วมงาน"
                                    : "ติดธุระ แต่ส่งใจไป"}
                                </span>
                                {blessing.willAttend ? " ✅" : " ❤️"}
                              </span>
                            )}
                            {/* แสดง Badge สำหรับผู้บริจาค */}
                            {blessing.hasDonated && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200 whitespace-nowrap">
                                <span className="text-sm mr-1">🎁</span>
                                <span>มอบของขวัญ</span>
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500 font-inter whitespace-nowrap">
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
                      ยังไม่มีคำอวยพรในขณะนี้ เริ่มอวยพรเป็นคนแรกกันเถอะ!
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

      {/* QR Code Modal */}
      {showQRCode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <h3 className="font-playfair text-3xl font-bold text-gray-800 mb-4">
                💝 Wedding Gift
              </h3>
              <p className="font-inter text-gray-600 mb-6">
                ขอบคุณสำหรับความใจดีของทุกคน 🙏
                <br />
                สแกน QR Code เพื่อส่งของขวัญให้บ่าวสาว
              </p>

              {/* QR Code Image - Replace with your actual QR code */}
              <div className="bg-gray-100 rounded-2xl mb-6">
                <div className="mx-auto bg-white rounded-xl border-2 border-gray-200 flex items-center justify-center p-2">
                  {/* You can replace this with an actual QR code image */}
                  <Image
                    src="/logo/qrcode.png"
                    alt="QR Code for Wedding Donation"
                    width={256}
                    height={256}
                    className="object-cover object-center w-full h-full rounded-xl"
                    priority
                  />
                </div>
              </div>

              {/* Bank Details */}
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-4 mb-6 text-left">
                <h4 className="font-inter font-bold text-gray-700 mb-2">
                  🏦 รายละเอียดบัญชี
                </h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <strong>ธนาคาร:</strong> ธนาคารกรุงไทย
                  </p>
                  <p>
                    <strong>ชื่อบัญชี:</strong> นาย ณัฐพงษ์ คำทอง (เจ้าบ่าว)
                  </p>
                  <p>
                    <strong>เลขบัญชี:</strong> 766-0-39416-9
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowQRCode(false)}
                  className="flex-1 py-3 px-4 rounded-xl border-2 border-gray-200 text-gray-600 hover:border-gray-300 font-inter font-semibold transition-all duration-300"
                >
                  ปิด
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    // Copy bank account number to clipboard
                    navigator.clipboard.writeText("766-0-39416-9");
                    toast.success("คัดลอกเลขบัญชีแล้ว! 📋", {
                      icon: "✅",
                    });
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-white font-inter font-semibold transition-all duration-300 hover:shadow-lg"
                >
                  📋 คัดลอกเลขบัญชี
                </motion.button>
              </div>
              <p className="text-xs text-gray-400 mt-4">
                📌 เมื่อส่งคำอวยพรและกดปุ่มด้านล่าง จะแสดงป้าย "มอบของขวัญ"
                ให้เห็นด้วยนะ
              </p>
              {/* เพิ่มปุ่ม "ฉันได้บริจาคแล้ว" */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  // Mark user as donated and close modal
                  setFormData({ ...formData, hasDonated: true });
                  setShowQRCode(false);
                  toast.success(
                    "ขอบคุณสำหรับการบริจาค! เมื่อส่งคำอวยพรจะแสดงป้าย 'มอบของขวัญ' ให้เห็น",
                    {
                      icon: "💝",
                      duration: 5000,
                    }
                  );
                }}
                className="w-full mt-3 py-3 px-4 rounded-xl bg-gradient-to-r from-green-400 to-emerald-400 text-white font-inter font-semibold transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-green-300"
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg">💝</span>
                  <span>มอบของขวัญเรียบร้อยแล้ว</span>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default BlessUsSection;
