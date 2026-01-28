"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { events, eventTypeLabels, EventType } from "@/data/events";
import { communityLinks } from "@/data/links";

// Countdown timer component
function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-3 sm:gap-4">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="flex flex-col items-center">
          <motion.div
            key={unit.value}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative w-14 sm:w-16 h-14 sm:h-16 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden"
          >
            <span className="text-2xl sm:text-3xl font-bold font-mono text-white">
              {unit.value.toString().padStart(2, "0")}
            </span>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </motion.div>
          <span className="text-[10px] sm:text-xs text-[#737373] mt-2 uppercase tracking-wider">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}

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

  // Get the next upcoming event (closest date)
  const nextEvent = events
    .filter((e) => e.status === "upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  // Count events by type for badges
  const getEventCount = (type: EventType | "all") => {
    if (type === "all") {
      return events.filter(e => showUpcoming ? e.status === "upcoming" : e.status === "past").length;
    }
    return events.filter(e => 
      e.type === type && (showUpcoming ? e.status === "upcoming" : e.status === "past")
    ).length;
  };

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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-block text-purple-400 text-sm font-medium tracking-wider uppercase mb-4 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20"
          >
            What&apos;s Happening
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold font-mono mb-6"
          >
            <span className="gradient-text-accent animate-gradient">Events</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-[#a3a3a3] max-w-2xl mx-auto text-lg"
          >
            Join our workshops, meetups, hackathons, and Cafe Cursor sessions.
            Learn, connect, and build with AI-powered tools.
          </motion.p>
        </motion.div>

        {/* Featured Next Event with Countdown */}
        {nextEvent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mb-16 overflow-hidden"
          >
            <div className="relative bg-gradient-to-r from-purple-500/10 via-[#111] to-cyan-500/10 border border-purple-500/20 rounded-3xl p-6 sm:p-8 md:p-10">
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_0deg,#7c3aed_60deg,transparent_120deg)] animate-spin" style={{ animationDuration: '4s' }} />
                <div className="absolute inset-[1px] bg-[#111] rounded-3xl" />
              </div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                {/* Event Info */}
                <div className="text-center lg:text-left flex-1">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-green-400 text-sm font-medium uppercase tracking-wider">Next Event</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3 gradient-text-primary">{nextEvent.title}</h3>
                  <p className="text-[#a3a3a3] mb-4 max-w-xl">{nextEvent.description}</p>
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-[#737373]">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(nextEvent.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {nextEvent.time}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {nextEvent.location}
                    </span>
                  </div>
                </div>
                
                {/* Countdown */}
                <div className="flex flex-col items-center gap-4">
                  <span className="text-sm text-[#737373] uppercase tracking-wider">Countdown</span>
                  <CountdownTimer targetDate={nextEvent.date} />
                  {nextEvent.lumaUrl && (
                    <a
                      href={nextEvent.lumaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 group relative inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="relative z-10 group-hover:text-white transition-colors">Register Now</span>
                      <svg className="w-4 h-4 relative z-10 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Toggle: Upcoming / Past */}
        <motion.div 
          className="flex justify-center mb-8" 
          role="tablist" 
          aria-label="Filter events by status"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative inline-flex bg-[#111]/80 backdrop-blur-sm rounded-full p-1.5 border border-white/10">
            {/* Animated background slider */}
            <motion.div
              className="absolute inset-y-1.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 shadow-lg shadow-purple-500/25"
              initial={false}
              animate={{
                left: showUpcoming ? "0.375rem" : "50%",
                right: showUpcoming ? "50%" : "0.375rem",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            />
            <button
              onClick={() => setShowUpcoming(true)}
              role="tab"
              aria-selected={showUpcoming}
              aria-controls="events-grid"
              className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] ${
                showUpcoming
                  ? "text-white"
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
              className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] ${
                !showUpcoming
                  ? "text-white"
                  : "text-[#a3a3a3] hover:text-white"
              }`}
            >
              Past Events
            </button>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12" 
          role="group" 
          aria-label="Filter events by type"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {filterOptions.map((option, index) => {
            const count = getEventCount(option.value);
            return (
              <motion.button
                key={option.value}
                onClick={() => setFilter(option.value)}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] ${
                  filter === option.value
                    ? "border-purple-500/50 text-white bg-purple-500/20 shadow-lg shadow-purple-500/10"
                    : "border-white/10 text-[#a3a3a3] hover:border-white/20 hover:text-white hover:bg-white/5"
                }`}
                aria-pressed={filter === option.value}
              >
                <span className="relative z-10">{option.label}</span>
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                      filter === option.value
                        ? "bg-white/20 text-white"
                        : "bg-white/10 text-[#a3a3a3]"
                    }`}
                  >
                    {count}
                  </motion.span>
                )}
                {filter === option.value && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

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
                  className="group relative bg-[#111]/80 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:border-purple-500/30 hover:shadow-[0_20px_60px_-15px_rgba(124,58,237,0.2)] hover:-translate-y-2 focus-within:border-purple-500/30 focus-within:shadow-[0_20px_60px_-15px_rgba(124,58,237,0.2)] card-glow"
                >
                  {/* Gradient border on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-[0] rounded-2xl bg-gradient-to-r from-purple-500/20 via-transparent to-cyan-500/20" />
                  </div>
                  
                  {/* Event Image */}
                  <div className="h-48 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] relative overflow-hidden">
                    {event.imageUrl ? (
                      <div className="relative w-full h-full">
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
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
                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
                      <motion.span 
                        className={`badge ${getBadgeClass(event.type)}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {eventTypeLabels[event.type]}
                      </motion.span>
                      <motion.span
                        className={`badge ${
                          event.status === "upcoming"
                            ? "badge-upcoming"
                            : "badge-past"
                        }`}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {event.status === "upcoming" ? "Upcoming" : "Past"}
                      </motion.span>
                    </div>
                  </div>

                  <div className="p-6 relative">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-300 transition-colors">{event.title}</h3>
                    <p className="text-[#a3a3a3] text-sm mb-5 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-3 text-sm">
                      <motion.div 
                        className="flex items-center gap-3 text-[#737373] group-hover:text-[#a3a3a3] transition-colors"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <motion.div 
                          className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
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
                        </motion.div>
                        <span>
                          {new Date(event.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center gap-3 text-[#737373] group-hover:text-[#a3a3a3] transition-colors"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 300, delay: 0.05 }}
                      >
                        <motion.div 
                          className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
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
                        </motion.div>
                        <span>{event.time}</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center gap-3 text-[#737373] group-hover:text-[#a3a3a3] transition-colors"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                      >
                        <motion.div 
                          className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center group-hover:bg-pink-500/20 transition-colors"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
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
                        </motion.div>
                        <span>{event.location}</span>
                      </motion.div>
                    </div>

                    {event.status === "upcoming" && event.lumaUrl && (
                      <motion.a
                        href={event.lumaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 text-sm font-medium bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity group/link focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111] rounded"
                        aria-label={`Register for ${event.title} on Luma`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative">
                          Register on Luma
                          <motion.span
                            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-purple-500 to-cyan-500"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </span>
                        <motion.svg
                          className="w-4 h-4 text-purple-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </motion.svg>
                      </motion.a>
                    )}
                  </div>
                </motion.article>
              ))
            ) : (
              <motion.div 
                className="col-span-2 text-center py-16" 
                role="status" 
                aria-live="polite"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center"
                  animate={{ 
                    rotate: [0, 10, -10, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 0.5, delay: 0.2 },
                    scale: { duration: 0.3, delay: 0.7 }
                  }}
                >
                  <svg className="w-8 h-8 text-[#737373]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </motion.div>
                <motion.p 
                  className="text-[#737373] text-lg font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  No {showUpcoming ? "upcoming" : "past"} events found.
                </motion.p>
                <motion.p 
                  className="text-[#555] text-sm mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Check back soon for more events!
                </motion.p>
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <button
                    onClick={() => setFilter("all")}
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4"
                  >
                    View all events
                  </button>
                </motion.div>
              </motion.div>
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
