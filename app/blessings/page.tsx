"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Blessing, ApiResponse } from "@/types/blessing";
import { useLanguage } from "../contexts/LanguageContext";
import Link from "next/link";

const AllBlessingsPage = () => {
  const { t } = useLanguage();
  const [blessings, setBlessings] = useState<Blessing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlessings();
  }, []);

  const fetchBlessings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/blessings");
      const result: ApiResponse<Blessing[]> = await response.json();

      if (result.success && result.data) {
        setBlessings(result.data);
      }
    } catch (error) {
      console.error("Error fetching blessings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 py-12 px-4"
      style={{
        backgroundImage: `url('/bg/bg-cloud.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 mb-6 font-inter font-semibold transition-colors"
          >
            <span>←</span>
            <span>กลับหน้าหลัก</span>
          </Link>

          <h1 className="font-playfair text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            💖 คำอวยพรทั้งหมด
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto mb-6" />
          <p className="font-inter text-lg text-gray-600">
            ขอบคุณทุกคำอวยพรดีๆ จากทุกคน
          </p>
        </motion.div>

        {/* Blessings Board */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-rose-100 animate-pulse"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="h-5 bg-gray-300 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : blessings.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {blessings.map((blessing, index) => (
              <motion.div
                key={blessing.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-rose-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col gap-3 mb-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-inter font-bold text-lg text-gray-800">
                      {blessing.name}
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {new Date(blessing.createdAt).toLocaleDateString(
                        "th-TH",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    {blessing.email?.startsWith("facebook_") && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200">
                        <span className="mr-1">📘</span>
                        <span>Facebook</span>
                      </span>
                    )}

                    {blessing.willAttend !== null && (
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          blessing.willAttend
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-red-100 text-pink-700 border border-red-200"
                        }`}
                      >
                        <span className="mr-1">
                          {blessing.willAttend ? "✅" : "❤️"}
                        </span>
                        <span>
                          {blessing.willAttend ? "มาร่วมงาน" : "ส่งใจไป"}
                        </span>
                      </span>
                    )}

                    {blessing.hasDonated && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200">
                        <span className="mr-1">🎁</span>
                        <span>มอบของขวัญ</span>
                      </span>
                    )}
                  </div>
                </div>

                <p className="font-inter text-gray-600 leading-relaxed text-sm">
                  &quot;{blessing.message}&quot;
                </p>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">😔</div>
            <p className="font-inter text-lg text-gray-600">
              ไม่พบคำอวยพรในหมวดนี้
            </p>
          </motion.div>
        )}

        {/* Back to Top Button */}
        {blessings.length > 9 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-white/80 backdrop-blur-sm border-2 border-rose-300 text-rose-600 px-8 py-3 rounded-full font-inter font-semibold hover:bg-rose-50 transition-all duration-300 hover:shadow-lg"
            >
              ↑ กลับด้านบน
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllBlessingsPage;
