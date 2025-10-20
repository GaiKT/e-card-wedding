"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import FacebookCommentImporter from "@/app/components/FacebookCommentImporter";
import toast from "react-hot-toast";

const AdminPage = () => {
  const [syncMethod, setSyncMethod] = useState<"manual" | "api">("manual");
  const [postId, setPostId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const syncFromAPI = async () => {
    if (!postId.trim()) {
      toast.error("กรุณากรอก Post ID");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/facebook-comments?postId=${postId}`);
      const result = await response.json();

      if (result.success) {
        toast.success(
          `นำเข้า ${result.data.saved} คำอวยพรจาก Facebook สำเร็จ! 🎉`
        );
        setPostId("");
      } else {
        toast.error(result.error || "ไม่สามารถนำเข้าได้");
      }
    } catch (error) {
      console.error("Sync error:", error);
      toast.error("เกิดข้อผิดพลาดในการนำเข้าข้อมูล");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            🎊 Admin Dashboard
          </h1>
          <p className="text-gray-600 font-inter text-lg">
            จัดการคำอวยพรจาก Facebook
          </p>
        </motion.div>

        {/* Method Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-rose-100"
        >
          <h2 className="font-playfair text-2xl font-bold text-gray-800 mb-4">
            เลือกวิธีการนำเข้า
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSyncMethod("manual")}
              className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                syncMethod === "manual"
                  ? "border-rose-400 bg-rose-50"
                  : "border-gray-200 hover:border-rose-300"
              }`}
            >
              <div className="text-4xl mb-3">✍️</div>
              <h3 className="font-inter font-bold text-lg mb-2">
                Manual Import
              </h3>
              <p className="text-sm text-gray-600">
                คัดลอกคำอวยพรมากรอกเอง (ง่ายที่สุด)
              </p>
              <div className="mt-3 text-xs text-gray-500">
                ✅ ไม่ต้องตั้งค่า API
                <br />✅ ทำได้ทันที
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSyncMethod("api")}
              className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                syncMethod === "api"
                  ? "border-rose-400 bg-rose-50"
                  : "border-gray-200 hover:border-rose-300"
              }`}
            >
              <div className="text-4xl mb-3">🔄</div>
              <h3 className="font-inter font-bold text-lg mb-2">
                Facebook API
              </h3>
              <p className="text-sm text-gray-600">
                ดึงอัตโนมัติจาก Facebook (ต้องตั้งค่า)
              </p>
              <div className="mt-3 text-xs text-gray-500">
                ✅ ดึงข้อมูลครบถ้วน
                <br />
                ⚠️ ต้องมี Access Token
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Content based on selected method */}
        {syncMethod === "manual" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FacebookCommentImporter />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-rose-100"
          >
            <h2 className="font-playfair text-3xl font-bold text-gray-800 mb-6 text-center">
              🔄 Sync จาก Facebook API
            </h2>

            <div className="max-w-2xl mx-auto">
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-600">
                  <strong>📌 วิธีหา Post ID:</strong>
                  <br />
                  1. เปิด Facebook post ที่ต้องการ
                  <br />
                  2. URL จะเป็น: facebook.com/USER_ID/posts/
                  <strong>POST_ID</strong>
                  <br />
                  3. คัดลอก POST_ID มากรอกด้านล่าง
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-inter font-semibold text-gray-700 mb-2">
                    Facebook Post ID
                  </label>
                  <input
                    type="text"
                    value={postId}
                    onChange={(e) => setPostId(e.target.value)}
                    placeholder="เช่น: 123456789012345"
                    className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={syncFromAPI}
                  disabled={isLoading || !postId.trim()}
                  className={`w-full py-4 rounded-xl font-inter font-semibold text-lg transition-all duration-300 ${
                    isLoading || !postId.trim()
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-rose-400 to-pink-400 text-white hover:shadow-lg"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>กำลังดึงข้อมูล...</span>
                    </div>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span>🔄</span>
                      <span>ดึงคำอวยพรจาก Facebook</span>
                    </span>
                  )}
                </motion.button>
              </div>

              <div className="mt-8 bg-amber-50 rounded-xl p-4">
                <p className="text-sm text-amber-700">
                  <strong>⚠️ หมายเหตุ:</strong>
                  <br />- ต้องตั้งค่า{" "}
                  <code className="bg-amber-100 px-2 py-1 rounded">
                    FACEBOOK_ACCESS_TOKEN
                  </code>{" "}
                  ใน .env ก่อน
                  <br />- ดูวิธีตั้งค่าใน{" "}
                  <code className="bg-amber-100 px-2 py-1 rounded">
                    FACEBOOK_COMMENTS_GUIDE.md
                  </code>
                  <br />- ต้องมี permissions:{" "}
                  <code className="bg-amber-100 px-2 py-1 rounded">
                    pages_read_engagement
                  </code>
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Documentation Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <p className="text-gray-600 font-inter">
            📖 อ่านคู่มือฉบับเต็มได้ที่{" "}
            <code className="bg-white px-3 py-1 rounded-lg border border-gray-200">
              FACEBOOK_COMMENTS_GUIDE.md
            </code>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;
