"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const featuredPhotos = [
  {
    id: "1",
    src: "/gallery/event-2.png",
    alt: "Cursor Community Cebu group photo",
    caption: "Cursor Community Cebu Launch Meetup",
  },
  {
    id: "2",
    src: "/gallery/event-4.png",
    alt: "How to Vibe-Code presentation",
    caption: "How to Vibe-Code With Cursor",
  },
  {
    id: "3",
    src: "/gallery/event-3.png",
    alt: "Organizers with Cursor banner",
    caption: "Meet the Organizers",
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
            <Image
              src={featuredPhotos[currentIndex].src}
              alt={featuredPhotos[currentIndex].alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
              priority={currentIndex === 0}
            />

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
