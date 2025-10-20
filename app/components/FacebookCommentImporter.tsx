"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

interface CommentInput {
  name: string;
  message: string;
}

const FacebookCommentImporter = () => {
  const [comments, setComments] = useState<CommentInput[]>([
    { name: "", message: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const addCommentField = () => {
    setComments([...comments, { name: "", message: "" }]);
  };

  const removeCommentField = (index: number) => {
    const newComments = comments.filter((_, i) => i !== index);
    setComments(newComments);
  };

  const updateComment = (
    index: number,
    field: "name" | "message",
    value: string
  ) => {
    const newComments = [...comments];
    newComments[index][field] = value;
    setComments(newComments);
  };

  const handleImport = async () => {
    // Filter out empty comments
    const validComments = comments.filter(
      (c) => c.name.trim() && c.message.trim()
    );

    if (validComments.length === 0) {
      toast.error("กรุณากรอกข้อมูลอย่างน้อย 1 คำอวยพร");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/facebook-comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comments: validComments,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(`นำเข้า ${validComments.length} คำอวยพรสำเร็จ! 🎉`);
        // Reset form
        setComments([{ name: "", message: "" }]);
      } else {
        toast.error("ไม่สามารถนำเข้าคำอวยพรได้");
      }
    } catch (error) {
      console.error("Import error:", error);
      toast.error("เกิดข้อผิดพลาดในการนำเข้าข้อมูล");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-rose-100">
        <h2 className="font-playfair text-3xl font-bold text-gray-800 mb-4 text-center">
          📱 นำเข้าคำอวยพรจาก Facebook
        </h2>
        <p className="text-center text-gray-600 mb-8">
          คัดลอกคำอวยพรจาก Facebook มากรอกในฟอร์มด้านล่าง
        </p>

        <div className="space-y-4 max-h-96 overflow-y-auto mb-6">
          {comments.map((comment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 rounded-xl p-4 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-gray-700">
                  คำอวยพรที่ {index + 1}
                </span>
                {comments.length > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeCommentField(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕ ลบ
                  </motion.button>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    ชื่อ
                  </label>
                  <input
                    type="text"
                    value={comment.name}
                    onChange={(e) =>
                      updateComment(index, "name", e.target.value)
                    }
                    placeholder="ชื่อผู้ส่งคำอวยพร"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    ข้อความ
                  </label>
                  <textarea
                    value={comment.message}
                    onChange={(e) =>
                      updateComment(index, "message", e.target.value)
                    }
                    placeholder="คำอวยพร"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={addCommentField}
            className="flex-1 py-3 px-4 rounded-xl border-2 border-rose-300 text-rose-600 hover:bg-rose-50 font-semibold transition-all duration-300"
          >
            ➕ เพิ่มคำอวยพร
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleImport}
            disabled={isLoading}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-rose-400 to-pink-400 text-white hover:shadow-lg"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>กำลังนำเข้า...</span>
              </div>
            ) : (
              "💾 บันทึกทั้งหมด"
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default FacebookCommentImporter;
