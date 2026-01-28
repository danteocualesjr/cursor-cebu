"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
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
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimationControls();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Triple the photos for seamless infinite scroll
  const duplicatedPhotos = [...stripPhotos, ...stripPhotos, ...stripPhotos];

  useEffect(() => {
    if (isPaused) {
      controls.stop();
    } else {
      controls.start({
        x: -50 * stripPhotos.length * 4.5,
        transition: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 40,
          ease: "linear",
        },
      });
    }
  }, [isPaused, controls]);

  return (
    <div 
      ref={containerRef}
      className="relative py-16 overflow-hidden bg-[#080808] group/strip"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Pause indicator */}
      <div className={`absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${isPaused ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-white/80 flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
          Paused
        </div>
      </div>
      
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />
      
      {/* Subtle top/bottom glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      
      <motion.div
        className="flex gap-6"
        initial={{ x: 0 }}
        animate={controls}
      >
        {duplicatedPhotos.map((photo, index) => (
          <div
            key={`${photo.id}-${index}`}
            className="group relative flex-shrink-0 w-56 h-36 sm:w-72 sm:h-44 rounded-xl overflow-hidden bg-[#111] border border-white/5 transition-all duration-300 hover:border-purple-500/30 hover:scale-105 focus-within:border-purple-500/30 focus-within:scale-105"
            tabIndex={0}
            role="img"
            aria-label={photo.alt}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 224px, 288px"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300" />
            {/* Caption on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-300">
              <p className="text-xs text-white/80 font-medium">{photo.alt}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
