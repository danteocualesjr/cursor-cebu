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
    <section id="gallery" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-mono mb-4">
            Gallery
          </h2>
          <p className="text-[#a3a3a3] max-w-2xl mx-auto">
            Moments captured from our workshops, meetups, and community events.
          </p>
        </motion.div>

        {/* Photo Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square bg-[#111] border border-[#1f1f1f] rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => setSelectedImage(photo.id)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div>
                  <p className="text-white text-sm font-medium">{photo.alt}</p>
                  <p className="text-[#a3a3a3] text-xs">{photo.event}</p>
                </div>
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
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-4xl w-full aspect-video bg-[#111] rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {photos.find((p) => p.id === selectedImage) && (
                <Image
                  src={photos.find((p) => p.id === selectedImage)!.src}
                  alt={photos.find((p) => p.id === selectedImage)!.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              )}

                {/* Close Button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View More Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[#737373] text-sm mt-8"
        >
          Photos from Cursor Community Cebu events
        </motion.p>
      </div>
    </section>
  );
}
