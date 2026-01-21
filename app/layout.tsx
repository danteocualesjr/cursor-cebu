import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cursor Community Cebu | AI-Powered Developers",
  description:
    "The Cebu community for AI-powered developers. Join our workshops, meetups, hackathons, and Cafe Cursor events.",
  keywords: [
    "Cursor",
    "AI",
    "Cebu",
    "developers",
    "community",
    "workshops",
    "meetups",
    "hackathons",
  ],
  authors: [{ name: "Cursor Community Cebu" }],
  openGraph: {
    title: "Cursor Community Cebu",
    description: "The Cebu community for AI-powered developers",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cursor Community Cebu",
    description: "The Cebu community for AI-powered developers",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-[#ededed]`}
      >
        {children}
      </body>
    </html>
  );
}
