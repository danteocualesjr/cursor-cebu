"use client";

import Image from "next/image";
import Link from "next/link";
import { communityLinks } from "@/data/links";

const navigation = [
  { name: "Events", href: "#events" },
  { name: "Speakers", href: "#speakers" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

const social = [
  {
    name: "Discord",
    href: communityLinks.discord,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: communityLinks.whatsapp,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    name: "Luma",
    href: communityLinks.luma,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-[#0a0a0a]">
      {/* Gradient line at top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="group flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                <Image
                  src="/cursor-logo.png"
                  alt="Cursor Logo"
                  width={40}
                  height={40}
                  className="relative"
                />
              </div>
              <span className="font-mono text-lg font-semibold">
                Cursor <span className="text-[#737373] group-hover:text-purple-400 transition-colors">Cebu</span>
              </span>
            </Link>
            <p className="text-[#a3a3a3] text-sm max-w-sm mb-6 leading-relaxed">
              The Cebu community for AI-powered developers. Learn, connect, and
              build with Cursor and other AI development tools.
            </p>
            {/* Built with Cursor Badge */}
            <div className="group inline-flex items-center gap-2 text-xs text-[#737373] bg-white/5 border border-white/5 rounded-full px-4 py-2 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all cursor-default">
              <span>Built with</span>
              <Image
                src="/cursor-logo.png"
                alt="Cursor"
                width={16}
                height={16}
                className="transition-transform group-hover:scale-110"
              />
              <span className="font-medium bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Cursor</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-sm mb-6 text-white">Navigate</h4>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      if (item.href.startsWith("#")) {
                        e.preventDefault();
                        const element = document.querySelector(item.href);
                        if (element) {
                          const headerOffset = 80;
                          const elementPosition = element.getBoundingClientRect().top;
                          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                          window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth",
                          });
                        }
                      }
                    }}
                    className="group flex items-center gap-2 text-sm text-[#a3a3a3] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] rounded"
                    aria-label={`Navigate to ${item.name} section`}
                  >
                    <span className="w-0 h-px bg-purple-500 group-hover:w-3 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold text-sm mb-6 text-white">Community</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={communityLinks.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm text-[#a3a3a3] hover:text-white transition-colors"
                >
                  <span className="w-0 h-px bg-[#5865F2] group-hover:w-3 transition-all" />
                  Discord
                </a>
              </li>
              <li>
                <a
                  href={communityLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm text-[#a3a3a3] hover:text-white transition-colors"
                >
                  <span className="w-0 h-px bg-[#25D366] group-hover:w-3 transition-all" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={communityLinks.luma}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm text-[#a3a3a3] hover:text-white transition-colors"
                >
                  <span className="w-0 h-px bg-[#FF5A5F] group-hover:w-3 transition-all" />
                  Luma Events
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${communityLinks.email}`}
                  className="group flex items-center gap-2 text-sm text-[#a3a3a3] hover:text-white transition-colors"
                >
                  <span className="w-0 h-px bg-cyan-500 group-hover:w-3 transition-all" />
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-[#737373]">
            &copy; {currentYear} Cursor Community Cebu. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#737373] hover:text-white hover:bg-white/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                aria-label={`Visit our ${item.name} page`}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
        
        {/* Back to top */}
        <div className="mt-8 text-center">
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 text-xs text-[#555] hover:text-[#737373] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] rounded"
            aria-label="Back to top"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
