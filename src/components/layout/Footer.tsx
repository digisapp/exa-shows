"use client";

import Link from "next/link";
import { Instagram, Youtube, Twitter } from "lucide-react";

const footerLinks = {
  shows: [
    { name: "Upcoming Shows", href: "/shows" },
    { name: "Watch Videos", href: "/videos" },
    { name: "Live Streams", href: "/live" },
    { name: "TV Mode", href: "/tv" },
  ],
  apply: [
    { name: "For Models", href: "/apply/talent" },
    { name: "For Designers", href: "/apply/talent" },
    { name: "For Brands", href: "/apply/industry" },
    { name: "For Media", href: "/apply/industry" },
  ],
  company: [
    { name: "About EXA Shows", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { name: "Instagram", href: "https://instagram.com/exashows", icon: Instagram },
  { name: "YouTube", href: "https://youtube.com/@exashows", icon: Youtube },
  { name: "Twitter", href: "https://twitter.com/exashows", icon: Twitter },
];

export function Footer() {
  return (
    <footer className="relative mt-20">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF69B4]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold gradient-text">EXA SHOWS</span>
            </Link>
            <p className="mt-4 text-white/60 text-sm leading-relaxed">
              The world&apos;s premier platform for fashion shows, swimwear events, and
              resortwear presentations.
            </p>
            {/* Social links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,105,180,0.3)]"
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Shows column */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Shows
            </h4>
            <ul className="space-y-3">
              {footerLinks.shows.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#00BFFF] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Apply column */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Apply
            </h4>
            <ul className="space-y-3">
              {footerLinks.apply.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#00BFFF] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#00BFFF] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} EXA Shows. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-white/40 text-sm">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-white/60 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
