"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface VirtualScrollGalleryProps {
  images: Array<{
    id: number;
    src: string;
    alt: string;
    caption: string;
    description: string;
    isFeature?: boolean;
  }>;
  itemHeight?: number;
  containerHeight?: number;
  className?: string;
}

const SimpleVirtualScrollGallery = ({
  images,
  itemHeight = 250,
  containerHeight = 600,
  className = "",
}: VirtualScrollGalleryProps) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate grid dimensions
  const { itemsPerRow, totalRows, visibleItems } = (() => {
    const containerWidth = containerDimensions.width;
    const minItemWidth = 250;
    const gap = 16;

    const itemsPerRow = Math.max(
      1,
      Math.floor((containerWidth + gap) / (minItemWidth + gap))
    );
    const totalRows = Math.ceil(images.length / itemsPerRow);

    const startRow = Math.floor(scrollTop / (itemHeight + gap));
    const endRow = Math.min(
      totalRows,
      startRow + Math.ceil(containerHeight / (itemHeight + gap)) + 1
    );

    const visibleItems = [];
    for (let row = startRow; row < endRow; row++) {
      for (let col = 0; col < itemsPerRow; col++) {
        const index = row * itemsPerRow + col;
        if (index < images.length) {
          visibleItems.push({
            ...images[index],
            row,
            col,
            index,
            top: row * (itemHeight + gap),
            left: col * (100 / itemsPerRow),
          });
        }
      }
    }

    return { itemsPerRow, totalRows, visibleItems };
  })();

  // Update container dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Handle scroll
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const totalHeight = totalRows * (itemHeight + 16);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      {/* Virtual container */}
      <div style={{ height: totalHeight, position: "relative" }}>
        {visibleItems.map((item) => (
          <motion.div
            key={item.id}
            className="absolute group cursor-pointer"
            style={{
              top: item.top,
              left: `${item.left}%`,
              width: `${100 / itemsPerRow - 1}%`,
              height: itemHeight,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: item.index * 0.01 }}
          >
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden border border-rose-100 h-full ${
                item.isFeature ? "ring-2 ring-rose-200" : ""
              }`}
            >
              <div className="relative w-full h-[200px] overflow-hidden bg-rose-50">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  priority={item.index < 6}
                  quality={item.isFeature ? 90 : 75}
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  onLoad={() => console.log(`✅ Loaded: ${item.src}`)}
                  onError={(e) =>
                    console.error(`❌ Failed to load: ${item.src}`, e)
                  }
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                {/* Caption */}
                <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <p className="text-xs font-medium drop-shadow-lg line-clamp-1">
                    {item.caption}
                  </p>
                </div>

                {/* Feature badge */}
                {item.isFeature && (
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-rose-400 to-pink-400 text-white px-2 py-1 rounded-full text-xs font-medium">
                    ✨
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-3">
                <h4 className="font-inter font-medium text-sm text-gray-800 line-clamp-1">
                  {item.caption}
                </h4>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SimpleVirtualScrollGallery;
