"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Replace these with actual photos - add your images to public/gallery/
const featuredPhotos = [
  {
    id: "1",
    src: "/gallery/featured-1.jpg",
    alt: "Cursor Community Cebu Workshop",
    caption: "Workshop: Introduction to Cursor IDE",
  },
  {
    id: "2",
    src: "/gallery/featured-2.jpg",
    alt: "Community Meetup",
    caption: "Monthly Community Meetup",
  },
  {
    id: "3",
    src: "/gallery/featured-3.jpg",
    alt: "Cafe Cursor Session",
    caption: "Cafe Cursor: Code & Coffee",
  },
  {
    id: "4",
    src: "/gallery/featured-4.jpg",
    alt: "Hackathon",
    caption: "Cursor Hackathon Cebu",
  },
];

export default function PhotoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredPhotos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <div
      className="relative w-full max-w-4xl mx-auto mt-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Carousel */}
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#111] border border-[#1f1f1f]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {/* Placeholder - replace with actual Image component when photos are added */}
            <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center">
              <div className="text-center p-8">
                <svg
                  className="w-16 h-16 mx-auto text-[#333] mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-[#555] text-sm">
                  {featuredPhotos[currentIndex].caption}
                </p>
                <p className="text-[#444] text-xs mt-2">Drop photos to add</p>
              </div>
            </div>

            {/* Caption overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white font-medium">
                {featuredPhotos[currentIndex].caption}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={() =>
            setCurrentIndex(
              (prev) =>
                (prev - 1 + featuredPhotos.length) % featuredPhotos.length
            )
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={() =>
            setCurrentIndex((prev) => (prev + 1) % featuredPhotos.length)
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {featuredPhotos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-white w-6"
                : "bg-[#444] hover:bg-[#666]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
