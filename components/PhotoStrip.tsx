"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const stripPhotos = [
  { id: "1", src: "/gallery/event-1.png", alt: "Live coding demo" },
  { id: "2", src: "/gallery/event-2.png", alt: "Community group photo" },
  { id: "3", src: "/gallery/event-3.png", alt: "Team with Cursor banner" },
  { id: "4", src: "/gallery/event-4.png", alt: "Vibe-Code presentation" },
  { id: "5", src: "/gallery/event-5.png", alt: "Technical demo" },
  { id: "6", src: "/gallery/event-6.png", alt: "Speaker presentation" },
  { id: "7", src: "/gallery/event-7.png", alt: "Organizers group photo" },
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
            className="relative flex-shrink-0 w-48 h-32 sm:w-64 sm:h-40 rounded-xl overflow-hidden bg-[#111] border border-[#1f1f1f]"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 192px, 256px"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
