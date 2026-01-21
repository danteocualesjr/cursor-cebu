export interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  bio?: string;
  imageUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  githubUrl?: string;
  isPast: boolean;
}

export const speakers: Speaker[] = [
  // Past Speakers - Replace with actual data
  {
    id: "1",
    name: "Speaker Name 1",
    title: "Senior Software Engineer",
    company: "Tech Company",
    bio: "Experienced developer passionate about AI-powered tools and their impact on developer productivity.",
    imageUrl: "/speakers/placeholder.jpg",
    isPast: true,
  },
  {
    id: "2",
    name: "Speaker Name 2",
    title: "Full Stack Developer",
    company: "Startup Inc",
    bio: "Building products with AI assistance. Early adopter of Cursor and AI coding tools.",
    imageUrl: "/speakers/placeholder.jpg",
    isPast: true,
  },
  {
    id: "3",
    name: "Speaker Name 3",
    title: "Tech Lead",
    company: "Enterprise Corp",
    bio: "Leading engineering teams in adopting AI-powered development practices.",
    imageUrl: "/speakers/placeholder.jpg",
    isPast: true,
  },
  // Upcoming/Future Speakers - Placeholders
  {
    id: "4",
    name: "To Be Announced",
    title: "Upcoming Speaker",
    company: "February Workshop",
    bio: "Speaker details coming soon for our upcoming workshop.",
    imageUrl: "/speakers/placeholder.jpg",
    isPast: false,
  },
  {
    id: "5",
    name: "To Be Announced",
    title: "Upcoming Speaker",
    company: "Hackathon Judge",
    bio: "Speaker details coming soon for our upcoming hackathon.",
    imageUrl: "/speakers/placeholder.jpg",
    isPast: false,
  },
];
