"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const photos = [
  {
    id: "1",
    src: "/gallery/event-1.png",
    alt: "Live coding demo",
    event: "Introduction to Cursor IDE Workshop",
  },
  {
    id: "2",
    src: "/gallery/event-2.png",
    alt: "Community group photo",
    event: "Cursor Community Cebu Launch Meetup",
  },
  {
    id: "3",
    src: "/gallery/event-3.png",
    alt: "Team with Cursor banner",
    event: "Meet the Organizers",
  },
  {
    id: "4",
    src: "/gallery/event-4.png",
    alt: "Vibe-Code presentation",
    event: "How to Vibe-Code With Cursor",
  },
  {
    id: "5",
    src: "/gallery/event-5.png",
    alt: "Technical demo",
    event: "Terraform & Infrastructure Talk",
  },
  {
    id: "6",
    src: "/gallery/event-6.png",
    alt: "Speaker presentation",
    event: "Community Presentation",
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="relative py-24 px-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-pink-400 text-sm font-medium tracking-wider uppercase mb-4"
          >
            Community Moments
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold font-mono mb-6">
            <span className="gradient-text-accent">Gallery</span>
          </h2>
          <p className="text-[#a3a3a3] max-w-2xl mx-auto text-lg">
            Moments captured from our workshops, meetups, and community events.
          </p>
        </motion.div>

        {/* Photo Grid - Masonry-like layout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-5"
        >
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-[#111] border border-white/5 rounded-2xl overflow-hidden cursor-pointer group ${
                index === 0 || index === 3 ? "aspect-[4/5]" : "aspect-square"
              }`}
              onClick={() => setSelectedImage(photo.id)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-2xl border border-purple-500/0 group-hover:border-purple-500/50 transition-all duration-500" />

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="space-y-1">
                  <p className="text-white font-medium">{photo.alt}</p>
                  <p className="text-[#a3a3a3] text-sm">{photo.event}</p>
                </div>
              </div>
              
              {/* Zoom icon */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="relative max-w-5xl w-full aspect-video bg-[#111] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {photos.find((p) => p.id === selectedImage) && (
                  <>
                    <Image
                      src={photos.find((p) => p.id === selectedImage)!.src}
                      alt={photos.find((p) => p.id === selectedImage)!.alt}
                      fill
                      className="object-contain"
                      sizes="100vw"
                    />
                    {/* Caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                      <p className="text-white font-medium">{photos.find((p) => p.id === selectedImage)!.alt}</p>
                      <p className="text-[#a3a3a3] text-sm">{photos.find((p) => p.id === selectedImage)!.event}</p>
                    </div>
                  </>
                )}

                {/* Close Button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                
                {/* Navigation hint */}
                <div className="absolute bottom-6 right-6 text-sm text-[#737373]">
                  Click outside to close
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View More Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="inline-flex items-center gap-2 text-[#737373] text-sm bg-white/5 px-4 py-2 rounded-full border border-white/5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Photos from Cursor Community Cebu events
          </p>
        </motion.div>
      </div>
    </section>
  );
}
