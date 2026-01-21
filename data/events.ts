export type EventType = "workshop" | "meetup" | "hackathon" | "cafe";
export type EventStatus = "upcoming" | "past";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: EventType;
  status: EventStatus;
  lumaUrl?: string;
  imageUrl?: string;
}

export const events: Event[] = [
  // Past Events - Replace with actual data
  {
    id: "1",
    title: "Introduction to Cursor IDE",
    description:
      "Learn the basics of Cursor IDE and how to supercharge your development workflow with AI assistance.",
    date: "2025-11-15",
    time: "2:00 PM - 5:00 PM",
    location: "The Company Cebu, IT Park",
    type: "workshop",
    status: "past",
  },
  {
    id: "2",
    title: "Cursor Community Cebu Launch Meetup",
    description:
      "Our inaugural meetup to bring together AI-enthusiast developers in Cebu. Network, share experiences, and learn together.",
    date: "2025-10-20",
    time: "6:00 PM - 9:00 PM",
    location: "Tide Coworking, Cebu Business Park",
    type: "meetup",
    status: "past",
  },
  {
    id: "3",
    title: "Cafe Cursor: Casual Coding Session",
    description:
      "Bring your laptop and work alongside fellow developers. Casual coding, coffee, and conversations about AI tools.",
    date: "2025-12-08",
    time: "10:00 AM - 2:00 PM",
    location: "Bo's Coffee, Ayala Center",
    type: "cafe",
    status: "past",
  },
  // Upcoming Events - Placeholders
  {
    id: "4",
    title: "AI-Assisted Full Stack Development Workshop",
    description:
      "Build a complete web application from scratch using Cursor AI. From design to deployment in one session.",
    date: "2026-02-15",
    time: "1:00 PM - 6:00 PM",
    location: "TBA",
    type: "workshop",
    status: "upcoming",
    lumaUrl: "#",
  },
  {
    id: "5",
    title: "Cursor Hackathon Cebu 2026",
    description:
      "24-hour hackathon where teams compete to build innovative solutions using AI-powered development tools.",
    date: "2026-03-22",
    time: "9:00 AM (24 hours)",
    location: "TBA",
    type: "hackathon",
    status: "upcoming",
    lumaUrl: "#",
  },
  {
    id: "6",
    title: "Monthly Meetup: AI Coding Best Practices",
    description:
      "Share your experiences and learn best practices for integrating AI into your development workflow.",
    date: "2026-02-01",
    time: "6:00 PM - 9:00 PM",
    location: "TBA",
    type: "meetup",
    status: "upcoming",
    lumaUrl: "#",
  },
  {
    id: "7",
    title: "Cafe Cursor: Weekend Code & Coffee",
    description:
      "Casual weekend session for coding, collaboration, and coffee. All skill levels welcome!",
    date: "2026-01-25",
    time: "10:00 AM - 3:00 PM",
    location: "TBA",
    type: "cafe",
    status: "upcoming",
    lumaUrl: "#",
  },
];

export const eventTypeLabels: Record<EventType, string> = {
  workshop: "Workshop",
  meetup: "Meetup",
  hackathon: "Hackathon",
  cafe: "Cafe Cursor",
};
