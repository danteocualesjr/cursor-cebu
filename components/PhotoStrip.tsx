"use client";

import { motion } from "framer-motion";

// Replace with actual photos - add your images to public/gallery/
const stripPhotos = [
  { id: "1", src: "/gallery/strip-1.jpg", alt: "Event photo 1" },
  { id: "2", src: "/gallery/strip-2.jpg", alt: "Event photo 2" },
  { id: "3", src: "/gallery/strip-3.jpg", alt: "Event photo 3" },
  { id: "4", src: "/gallery/strip-4.jpg", alt: "Event photo 4" },
  { id: "5", src: "/gallery/strip-5.jpg", alt: "Event photo 5" },
  { id: "6", src: "/gallery/strip-6.jpg", alt: "Event photo 6" },
  { id: "7", src: "/gallery/strip-7.jpg", alt: "Event photo 7" },
  { id: "8", src: "/gallery/strip-8.jpg", alt: "Event photo 8" },
];

export default function PhotoStrip() {
  // Double the photos for seamless infinite scroll
  const duplicatedPhotos = [...stripPhotos, ...stripPhotos];

  return (
    <div className="py-12 overflow-hidden bg-[#080808]">
      <motion.div
        className="flex gap-4"
        animate={{
          x: [0, -50 * stripPhotos.length * 4],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {duplicatedPhotos.map((photo, index) => (
          <div
            key={`${photo.id}-${index}`}
            className="flex-shrink-0 w-48 h-32 sm:w-64 sm:h-40 rounded-xl overflow-hidden bg-[#111] border border-[#1f1f1f]"
          >
            {/* Placeholder - replace with actual Image component when photos are added */}
            <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#111] flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[#333]"
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
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
