"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Placeholder images - replace with actual event photos
const photos = [
  {
    id: "1",
    src: "/gallery/placeholder-1.jpg",
    alt: "Workshop session",
    event: "Introduction to Cursor IDE Workshop",
  },
  {
    id: "2",
    src: "/gallery/placeholder-2.jpg",
    alt: "Community meetup",
    event: "Launch Meetup",
  },
  {
    id: "3",
    src: "/gallery/placeholder-3.jpg",
    alt: "Cafe Cursor session",
    event: "Cafe Cursor: Casual Coding",
  },
  {
    id: "4",
    src: "/gallery/placeholder-4.jpg",
    alt: "Networking event",
    event: "Community Networking",
  },
  {
    id: "5",
    src: "/gallery/placeholder-5.jpg",
    alt: "Presentation",
    event: "AI Development Talk",
  },
  {
    id: "6",
    src: "/gallery/placeholder-6.jpg",
    alt: "Group photo",
    event: "Community Group Photo",
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
              {/* Placeholder - Replace with actual Image component when you have photos */}
              <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#111] flex items-center justify-center">
                <div className="text-center p-4">
                  <svg
                    className="w-12 h-12 mx-auto text-[#333] mb-2"
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
                  <p className="text-xs text-[#555]">Photo coming soon</p>
                </div>
              </div>

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
                {/* Placeholder for actual image */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="w-24 h-24 mx-auto text-[#333] mb-4"
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
                    <p className="text-[#555]">
                      {photos.find((p) => p.id === selectedImage)?.event}
                    </p>
                  </div>
                </div>

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

        {/* Coming Soon Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[#737373] text-sm mt-8"
        >
          More photos coming soon from our events!
        </motion.p>
      </div>
    </section>
  );
}
