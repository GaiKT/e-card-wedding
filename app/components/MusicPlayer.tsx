"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Song {
  title: string;
  artist: string;
  src: string;
}

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [autoplayAttempted, setAutoplayAttempted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // รายการเพลง - คุณสามารถเพิ่มเพลงได้ที่นี่
  const playlist: Song[] = [
    {
      title: "Perfect",
      artist: "Ed Sheeran",
      src: "/music/Perfect.mp3",
    },
    {
      title: "At Last",
      artist: "Etta James",
      src: "/music/At_Last.mp3",
    },
    {
      title: "Marry You",
      artist: "Bruno Mars",
      src: "/music/Marry_You.mp3",
    },
  ];

  const currentSong = playlist[currentSongIndex];

  const nextSong = useCallback(() => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
  }, [playlist.length]);

  const prevSong = useCallback(() => {
    setCurrentSongIndex((prev) =>
      prev === 0 ? playlist.length - 1 : prev - 1
    );
  }, [playlist.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      // เล่นเพลงถัดไปเมื่อจบ
      nextSong();
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [nextSong]);

  // อัพเดท volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // เล่นเพลงใหม่เมื่อเปลี่ยน
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [currentSongIndex, isPlaying]);

  // Autoplay เมื่อเข้าเว็บ
  useEffect(() => {
    const attemptAutoplay = async () => {
      if (audioRef.current && !autoplayAttempted) {
        setAutoplayAttempted(true);
        try {
          // ลอง autoplay - จะทำงานได้เพราะมี Landing Page interaction ก่อนหน้านี้แล้ว
          await audioRef.current.play();
          setIsPlaying(true);
          console.log("Autoplay successful!");
        } catch (error) {
          // Fallback: ถ้ายังไม่ได้ interaction (แม้ว่าจะมี Landing Page แล้ว)
          console.log("Autoplay prevented:", error);

          const playOnInteraction = async () => {
            try {
              if (audioRef.current) {
                await audioRef.current.play();
                setIsPlaying(true);
              }
            } catch (err) {
              console.log("Still cannot autoplay:", err);
            }
          };

          // Listen for any user interaction
          document.addEventListener("click", playOnInteraction, { once: true });
          document.addEventListener("touchstart", playOnInteraction, {
            once: true,
          });
        }
      }
    };

    // รอให้ component mount เสร็จก่อน (รอหลัง Landing Page หายไป)
    const timer = setTimeout(() => {
      attemptAutoplay();
    }, 500); // ลดเวลาลงเหลือ 0.5 วินาที เพราะมี user interaction จาก Landing Page แล้ว

    return () => clearTimeout(timer);
  }, [autoplayAttempted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <audio ref={audioRef} src={currentSong.src} />

      {/* Floating Music Player */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-20 right-0 w-80 bg-gradient-to-br from-rose-50 to-pink-50 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-6 mb-2"
            >
              {/* Song Info */}
              <div className="mb-4">
                <h3 className="font-playfair text-xl font-bold text-gray-800 mb-1 truncate">
                  {currentSong.title}
                </h3>
                <p className="font-inter text-sm text-gray-600 truncate">
                  {currentSong.artist}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-rose-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                  style={{
                    background: `linear-gradient(to right, rgb(251, 113, 133) 0%, rgb(251, 113, 133) ${
                      (currentTime / duration) * 100
                    }%, rgb(254, 205, 211) ${
                      (currentTime / duration) * 100
                    }%, rgb(254, 205, 211) 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1 font-inter">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-4 mb-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevSong}
                  className="p-2 rounded-full bg-white/50 hover:bg-white/80 transition-all duration-200 shadow-md"
                >
                  <svg
                    className="w-6 h-6 text-rose-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                  </svg>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  className="p-4 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 transition-all duration-200 shadow-lg"
                >
                  {isPlaying ? (
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextSong}
                  className="p-2 rounded-full bg-white/50 hover:bg-white/80 transition-all duration-200 shadow-md"
                >
                  <svg
                    className="w-6 h-6 text-rose-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 18h2V6h-2zm-11-7l8.5-6v12z" />
                  </svg>
                </motion.button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMute}
                  className="p-2 rounded-full hover:bg-white/50 transition-all duration-200"
                >
                  {isMuted || volume === 0 ? (
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                    </svg>
                  ) : volume < 0.5 ? (
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 9v6h4l5 5V4l-5 5H7z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                    </svg>
                  )}
                </motion.button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full h-2 bg-rose-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                  style={{
                    background: `linear-gradient(to right, rgb(251, 113, 133) 0%, rgb(251, 113, 133) ${
                      (isMuted ? 0 : volume) * 100
                    }%, rgb(254, 205, 211) ${
                      (isMuted ? 0 : volume) * 100
                    }%, rgb(254, 205, 211) 100%)`,
                  }}
                />
              </div>

              {/* Playlist indicator */}
              <div className="flex items-center justify-center space-x-1 mt-4">
                {playlist.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentSongIndex(index)}
                    className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                      index === currentSongIndex
                        ? "w-8 bg-rose-500"
                        : "w-1.5 bg-rose-300 hover:bg-rose-400"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 shadow-2xl flex items-center justify-center relative overflow-hidden group"
        >
          {/* Animated background */}
          {isPlaying && (
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-white rounded-full"
            />
          )}

          {/* Icon */}
          <div className="relative z-10">
            {isPlaying ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </motion.div>
            ) : (
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            )}
          </div>

          {/* Expand indicator */}
          {!isExpanded && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <svg
                className="w-3 h-3 text-rose-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </div>
          )}
        </motion.button>
      </motion.div>

      {/* Custom Slider Styles */}
      <style jsx global>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f43f5e 0%, #ec4899 100%);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(244, 63, 94, 0.4);
          transition: all 0.2s ease;
        }

        .slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(244, 63, 94, 0.6);
        }

        .slider-thumb::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f43f5e 0%, #ec4899 100%);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(244, 63, 94, 0.4);
          transition: all 0.2s ease;
        }

        .slider-thumb::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(244, 63, 94, 0.6);
        }
      `}</style>
    </>
  );
};

export default MusicPlayer;
