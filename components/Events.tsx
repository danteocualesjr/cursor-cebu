"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { events, eventTypeLabels, EventType } from "@/data/events";
import { communityLinks } from "@/data/links";

const filterOptions: { label: string; value: EventType | "all" }[] = [
  { label: "All Events", value: "all" },
  { label: "Workshops", value: "workshop" },
  { label: "Meetups", value: "meetup" },
  { label: "Hackathons", value: "hackathon" },
  { label: "Cafe Cursor", value: "cafe" },
];

export default function Events() {
  const [filter, setFilter] = useState<EventType | "all">("all");
  const [showUpcoming, setShowUpcoming] = useState(true);

  const filteredEvents = events.filter((event) => {
    const matchesType = filter === "all" || event.type === filter;
    const matchesStatus = showUpcoming
      ? event.status === "upcoming"
      : event.status === "past";
    return matchesType && matchesStatus;
  });

  const getBadgeClass = (type: EventType) => {
    const classes: Record<EventType, string> = {
      workshop: "badge-workshop",
      meetup: "badge-meetup",
      hackathon: "badge-hackathon",
      cafe: "badge-cafe",
    };
    return classes[type];
  };

  return (
    <section id="events" className="relative py-24 px-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-dots opacity-30" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      
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
            className="inline-block text-purple-400 text-sm font-medium tracking-wider uppercase mb-4"
          >
            What&apos;s Happening
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold font-mono mb-6">
            <span className="gradient-text-accent">Events</span>
          </h2>
          <p className="text-[#a3a3a3] max-w-2xl mx-auto text-lg">
            Join our workshops, meetups, hackathons, and Cafe Cursor sessions.
            Learn, connect, and build with AI-powered tools.
          </p>
        </motion.div>

        {/* Toggle: Upcoming / Past */}
        <div className="flex justify-center mb-8" role="tablist" aria-label="Filter events by status">
          <div className="inline-flex bg-[#111]/80 backdrop-blur-sm rounded-full p-1.5 border border-white/10">
            <button
              onClick={() => setShowUpcoming(true)}
              role="tab"
              aria-selected={showUpcoming}
              aria-controls="events-grid"
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] ${
                showUpcoming
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/25"
                  : "text-[#a3a3a3] hover:text-white"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setShowUpcoming(false)}
              role="tab"
              aria-selected={!showUpcoming}
              aria-controls="events-grid"
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] ${
                !showUpcoming
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/25"
                  : "text-[#a3a3a3] hover:text-white"
              }`}
            >
              Past Events
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" role="group" aria-label="Filter events by type">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] ${
                filter === option.value
                  ? "border-purple-500/50 text-white bg-purple-500/20 shadow-lg shadow-purple-500/10"
                  : "border-white/10 text-[#a3a3a3] hover:border-white/20 hover:text-white hover:bg-white/5"
              }`}
              aria-pressed={filter === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${filter}-${showUpcoming}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8"
            id="events-grid"
            role="region"
            aria-live="polite"
            aria-label={`${showUpcoming ? "Upcoming" : "Past"} events${filter !== "all" ? ` filtered by ${filterOptions.find(o => o.value === filter)?.label}` : ""}`}
          >
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <motion.article
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-[#111]/80 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:border-purple-500/30 hover:shadow-[0_20px_60px_-15px_rgba(124,58,237,0.2)] focus-within:border-purple-500/30 focus-within:shadow-[0_20px_60px_-15px_rgba(124,58,237,0.2)]"
                >
                  {/* Gradient border on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-[0] rounded-2xl bg-gradient-to-r from-purple-500/20 via-transparent to-cyan-500/20" />
                  </div>
                  
                  {/* Event Image */}
                  <div className="h-48 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] relative overflow-hidden">
                    {event.imageUrl ? (
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/10 to-cyan-500/10">
                        <svg
                          className="w-16 h-16 text-white/10"
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
                    )}
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
                    
                    {/* Badges overlay on image */}
                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                      <span className={`badge ${getBadgeClass(event.type)}`}>
                        {eventTypeLabels[event.type]}
                      </span>
                      <span
                        className={`badge ${
                          event.status === "upcoming"
                            ? "badge-upcoming"
                            : "badge-past"
                        }`}
                      >
                        {event.status === "upcoming" ? "Upcoming" : "Past"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 relative">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-300 transition-colors">{event.title}</h3>
                    <p className="text-[#a3a3a3] text-sm mb-5 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3 text-[#737373] group-hover:text-[#a3a3a3] transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-purple-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <span>
                          {new Date(event.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[#737373] group-hover:text-[#a3a3a3] transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-cyan-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[#737373] group-hover:text-[#a3a3a3] transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-pink-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <span>{event.location}</span>
                      </div>
                    </div>

                    {event.status === "upcoming" && event.lumaUrl && (
                      <a
                        href={event.lumaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 text-sm font-medium bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity group/link focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111] rounded"
                        aria-label={`Register for ${event.title} on Luma`}
                      >
                        Register on Luma
                        <svg
                          className="w-4 h-4 text-purple-400 transition-transform group-hover/link:translate-x-1"
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
                    )}
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="col-span-2 text-center py-16" role="status" aria-live="polite">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#737373]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-[#737373]">No {showUpcoming ? "upcoming" : "past"} events found.</p>
                <p className="text-[#555] text-sm mt-2">Check back soon for more events!</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* View All on Luma */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href={communityLinks.luma}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-[#a3a3a3] hover:text-white hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300"
          >
            View all events on Luma
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
