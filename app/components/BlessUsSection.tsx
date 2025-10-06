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
  const [showConfirmation, setShowConfirmation] = useState(false); // เพิ่ม state สำหรับ confirmation popup
  const [pendingFormData, setPendingFormData] = useState<
    typeof formData | null
  >(null); // เก็บ form data ชั่วคราว

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
    // เก็บ form data และแสดง confirmation popup
    setPendingFormData(formData);
    setShowConfirmation(true);
  };

  // Function สำหรับส่งคำอวยพรจริง
  const submitBlessing = async (dataToSubmit: typeof formData) => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/blessings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
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
        setShowConfirmation(false);
        setPendingFormData(null);

        // Refresh blessings list
        await fetchBlessings();

        toast.success("ส่งคำอวยพรเรียบร้อยแล้ว! 💖", {
          icon: "🎉",
        });
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

  // Function สำหรับยืนยันการส่งคำอวยพรโดยไม่ donate
  const confirmSendWithoutDonation = () => {
    if (pendingFormData) {
      submitBlessing(pendingFormData);
    }
  };

  // Function สำหรับเปิด QR Code เพื่อ donate
  const openDonationFlow = () => {
    setShowConfirmation(false);
    setShowQRCode(true);
  };

  // Function สำหรับยืนยัน donation และส่งคำอวยพร
  const confirmDonationAndSubmit = () => {
    if (pendingFormData) {
      const updatedData = { ...pendingFormData, hasDonated: true };
      setShowQRCode(false);
      submitBlessing(updatedData);
      toast.success("ขอบคุณสำหรับการบริจาค! 💝", {
        icon: "🙏",
        duration: 3000,
      });
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
                        <span>กำลังส่ง...</span>
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

      {/* Confirmation Modal */}
      {showConfirmation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="text-4xl sm:text-5xl mb-4">💝</div>
              <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                ส่งคำอวยพร
              </h3>
              <p className="font-inter text-gray-600 mb-6 leading-relaxed">
                คุณต้องการส่งคำอวยพรหรือไม่?
                <br />
                <span className="text-sm text-gray-500">
                  หรือต้องการมอบของขวัญให้บ่าวสาวด้วย?
                </span>
              </p>

              <div className="space-y-3">
                {/* ปุ่มส่งคำอวยพรโดยไม่ donate */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={confirmSendWithoutDonation}
                  disabled={isLoading}
                  className={`w-full py-3 px-4 rounded-xl font-inter font-semibold transition-all duration-300 ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-rose-400 to-pink-400 text-white hover:shadow-lg"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>กำลังส่ง...</span>
                    </div>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span>💌</span>
                      <span>ส่งคำอวยพร</span>
                    </span>
                  )}
                </motion.button>

                {/* ปุ่มมอบของขวัญ */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openDonationFlow}
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-white font-inter font-semibold transition-all duration-300 hover:shadow-lg"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>🎁</span>
                    <span>มอบของขวัญ + ส่งคำอวยพร</span>
                  </span>
                </motion.button>

                {/* ปุ่มยกเลิก */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowConfirmation(false);
                    setPendingFormData(null);
                  }}
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl border-2 border-gray-200 text-gray-600 hover:border-gray-300 font-inter font-semibold transition-all duration-300"
                >
                  ยกเลิก
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* QR Code Modal */}
      {showQRCode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 w-full max-w-sm sm:max-w-md md:max-w-4xl mx-2 sm:mx-4 max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button for mobile */}
            <div className="flex justify-end mb-2 md:hidden">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowQRCode(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
              >
                ✕
              </motion.button>
            </div>

            {/* Header */}
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">
                💝 Wedding Gift
              </h3>
              <p className="font-inter text-sm sm:text-base text-gray-600 leading-relaxed px-2">
                ขอบคุณสำหรับความใจดีของทุกคน 🙏
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                สแกน QR Code เพื่อส่งของขวัญให้บ่าวสาว
              </p>
            </div>

            {/* Content - 2 columns for md+ screens, 1 column for mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Left Column - QR Code */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 p-3 sm:p-4">
                  <div className="mx-auto bg-white rounded-lg sm:rounded-xl border-2 border-gray-200 shadow-lg flex items-center justify-center p-2 sm:p-3">
                    <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 relative">
                      <Image
                        src="/logo/qrcode.png"
                        alt="QR Code for Wedding Donation"
                        fill
                        className="object-cover object-center rounded-lg"
                        priority
                        sizes="(max-width: 640px) 192px, (max-width: 1024px) 224px, 256px"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Bank Details & Actions */}
              <div className="space-y-4 sm:space-y-6">
                {/* Bank Details */}
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-left border border-rose-100">
                  <h4 className="font-inter font-bold text-gray-700 mb-2 sm:mb-3 text-sm sm:text-base flex items-center">
                    <span className="text-lg sm:text-xl mr-2">🏦</span>
                    รายละเอียดบัญชี
                  </h4>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="bg-white rounded-lg p-2 sm:p-3">
                      <p className="text-xs sm:text-sm text-gray-600">
                        <strong className="text-gray-700">ธนาคาร:</strong>{" "}
                        ธนาคารกรุงไทย
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        <strong className="text-gray-700">ชื่อบัญชี:</strong>{" "}
                        นาย ณัฐพงษ์ คำทอง (เจ้าบ่าว)
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        <strong className="text-gray-700">เลขบัญชี:</strong>
                        <span className="font-mono font-bold text-blue-600 ml-1">
                          766-0-39416-9
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  {/* Copy button - primary action */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      navigator.clipboard.writeText("766-0-39416-9");
                      toast.success("คัดลอกเลขบัญชีแล้ว! 📋", {
                        icon: "✅",
                      });
                    }}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-white font-inter font-semibold transition-all duration-300 hover:shadow-lg text-sm sm:text-base"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span>📋</span>
                      <span>คัดลอกเลขบัญชี</span>
                    </span>
                  </motion.button>

                  {/* Close button - desktop only */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowQRCode(false)}
                    className="hidden md:block flex-1 py-3 px-4 rounded-xl border-2 border-gray-200 text-gray-600 hover:border-gray-300 font-inter font-semibold transition-all duration-300"
                  >
                    ปิด
                  </motion.button>
                </div>

                {/* Note */}
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs sm:text-sm text-blue-600 text-center leading-relaxed">
                    <span className="text-blue-500">📌</span>{" "}
                    เมื่อส่งคำอวยพรและกดปุ่มด้านล่าง
                    <br className="sm:hidden" />
                    จะแสดงป้าย &quot;มอบของขวัญ&quot; ให้เห็นด้วยนะ
                  </p>
                </div>

                {/* Donation confirmation buttons */}
                <div className="flex flex-col gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={confirmDonationAndSubmit}
                    disabled={isLoading}
                    className={`w-full py-3 sm:py-4 px-4 rounded-xl font-inter font-semibold transition-all duration-300 hover:shadow-lg border-2 border-transparent text-sm sm:text-base ${
                      isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-400 to-emerald-400 text-white hover:border-green-300"
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>กำลังส่ง...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-base sm:text-lg">💝</span>
                        <span>ยืนยันการให้ของขวัญและส่งคำอวยพร</span>
                      </div>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowQRCode(false);
                      setShowConfirmation(true);
                    }}
                    disabled={isLoading}
                    className="w-full py-2 px-4 rounded-xl border-2 border-gray-200 text-gray-600 hover:border-gray-300 font-inter font-medium transition-all duration-300 text-sm"
                  >
                    กลับไปเลือกใหม่
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default BlessUsSection;
