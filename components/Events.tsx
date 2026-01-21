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
    <section id="events" className="py-20 px-4">
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
            Events
          </h2>
          <p className="text-[#a3a3a3] max-w-2xl mx-auto">
            Join our workshops, meetups, hackathons, and Cafe Cursor sessions.
            Learn, connect, and build with AI-powered tools.
          </p>
        </motion.div>

        {/* Toggle: Upcoming / Past */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-[#111] rounded-full p-1 border border-[#1f1f1f]">
            <button
              onClick={() => setShowUpcoming(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                showUpcoming
                  ? "bg-white text-black"
                  : "text-[#a3a3a3] hover:text-white"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setShowUpcoming(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                !showUpcoming
                  ? "bg-white text-black"
                  : "text-[#a3a3a3] hover:text-white"
              }`}
            >
              Past Events
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                filter === option.value
                  ? "border-white text-white bg-[#1a1a1a]"
                  : "border-[#333] text-[#a3a3a3] hover:border-[#555] hover:text-white"
              }`}
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
            className="grid md:grid-cols-2 gap-6"
          >
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#111] border border-[#1f1f1f] rounded-xl p-6 card-hover"
                >
                  <div className="flex items-start justify-between mb-4">
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

                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-[#a3a3a3] text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2 text-sm text-[#737373]">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
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
                      <span>
                        {new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
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
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
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
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {event.status === "upcoming" && event.lumaUrl && (
                    <a
                      href={event.lumaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white hover:text-[#a78bfa] transition-colors"
                    >
                      Register on Luma
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
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
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 text-[#737373]">
                <p>No {showUpcoming ? "upcoming" : "past"} events found.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* View All on Luma */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href={communityLinks.luma}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#a3a3a3] hover:text-white transition-colors"
          >
            View all events on Luma
            <svg
              className="w-4 h-4"
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
