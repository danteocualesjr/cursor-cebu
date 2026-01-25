"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { speakers } from "@/data/speakers";

export default function Speakers() {
  const [showPast, setShowPast] = useState(true);

  const filteredSpeakers = speakers.filter((speaker) =>
    showPast ? speaker.isPast : !speaker.isPast
  );

  return (
    <section id="speakers" className="relative py-24 px-4 bg-[#080808]">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]" />
      
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
            className="inline-block text-cyan-400 text-sm font-medium tracking-wider uppercase mb-4"
          >
            Learn from the Best
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold font-mono mb-6">
            <span className="gradient-text-accent">Speakers</span>
          </h2>
          <p className="text-[#a3a3a3] max-w-2xl mx-auto text-lg">
            Learn from experienced developers and industry experts who share
            their knowledge and experiences with AI-powered development.
          </p>
        </motion.div>

        {/* Toggle: Past / Upcoming */}
        <div className="flex justify-center mb-12" role="tablist" aria-label="Filter speakers by status">
          <div className="inline-flex bg-[#111]/80 backdrop-blur-sm rounded-full p-1.5 border border-white/10">
            <button
              onClick={() => setShowPast(true)}
              role="tab"
              aria-selected={showPast}
              aria-controls="speakers-grid"
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808] ${
                showPast
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/25"
                  : "text-[#a3a3a3] hover:text-white"
              }`}
            >
              Past Speakers
            </button>
            <button
              onClick={() => setShowPast(false)}
              role="tab"
              aria-selected={!showPast}
              aria-controls="speakers-grid"
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808] ${
                !showPast
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/25"
                  : "text-[#a3a3a3] hover:text-white"
              }`}
            >
              Upcoming
            </button>
          </div>
        </div>

        {/* Speakers Grid */}
        <motion.div
          key={showPast ? "past" : "upcoming"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          id="speakers-grid"
          role="region"
          aria-live="polite"
          aria-label={`${showPast ? "Past" : "Upcoming"} speakers`}
        >
          {filteredSpeakers.map((speaker, index) => (
            <motion.article
              key={speaker.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-[#111]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-8 text-center transition-all duration-500 hover:border-purple-500/30 hover:shadow-[0_20px_60px_-15px_rgba(124,58,237,0.2)] focus-within:border-purple-500/30 focus-within:shadow-[0_20px_60px_-15px_rgba(124,58,237,0.2)]"
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Avatar with gradient ring */}
              <div className="relative w-28 h-28 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
                <div className="absolute inset-[3px] rounded-full bg-[#111]" />
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#222] to-[#111] flex items-center justify-center text-2xl font-bold text-[#444] overflow-hidden border-2 border-transparent group-hover:border-purple-500/50 transition-colors duration-500">
                  {speaker.imageUrl && speaker.imageUrl !== "/speakers/placeholder.jpg" ? (
                    <img
                      src={speaker.imageUrl}
                      alt={speaker.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="gradient-text-accent text-3xl">
                      {speaker.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">{speaker.name}</h3>
              <p className="text-sm bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-medium mb-1">{speaker.title}</p>
              <p className="text-sm text-[#737373] mb-4">{speaker.company}</p>

              {speaker.bio && (
                <p className="text-sm text-[#a3a3a3] line-clamp-3 leading-relaxed">
                  {speaker.bio}
                </p>
              )}

              {/* Social Links */}
              {(speaker.linkedinUrl ||
                speaker.twitterUrl ||
                speaker.githubUrl) && (
                <div className="flex justify-center gap-3 mt-6 pt-6 border-t border-white/5">
                  {speaker.linkedinUrl && (
                    <a
                      href={speaker.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#737373] hover:text-white hover:bg-[#0077B5]/20 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0077B5]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111]"
                      aria-label={`${speaker.name} on LinkedIn`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                  {speaker.twitterUrl && (
                    <a
                      href={speaker.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#737373] hover:text-white hover:bg-white/10 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111]"
                      aria-label={`${speaker.name} on Twitter`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  )}
                  {speaker.githubUrl && (
                    <a
                      href={speaker.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#737373] hover:text-white hover:bg-white/10 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111]"
                      aria-label={`${speaker.name} on GitHub`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </motion.article>
          ))}
        </motion.div>

        {/* Call for Speakers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 relative overflow-hidden bg-gradient-to-r from-purple-500/10 via-[#111] to-cyan-500/10 border border-white/10 rounded-2xl p-10 text-center"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-[80px]" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 mb-6">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">Want to Speak?</h3>
            <p className="text-[#a3a3a3] mb-8 max-w-md mx-auto">
              Share your knowledge and experience with the Cursor Community Cebu.
              We&apos;re always looking for passionate speakers.
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector("#contact");
                if (element) {
                  const headerOffset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  });
                }
              }}
              className="group inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(124,58,237,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111]"
              aria-label="Get in touch to become a speaker"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 group-hover:text-white transition-colors">Get in Touch</span>
              <svg
                className="w-4 h-4 relative z-10 group-hover:text-white group-hover:translate-x-1 transition-all"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
