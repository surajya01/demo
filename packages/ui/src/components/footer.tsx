import * as React from "react";
import Link from "next/link";

export interface FooterProps {
  brandName?: string;
  address?: string;
  phone?: string;
  email?: string;
  developerCredit?: string;
}

export function Footer({
  brandName = "Apexify Resort",
  address = "Near Navjeevan Naka, Waliv, Vasai Road - East, 401208 Vasai, Maharashtra, India",
  phone = "+91 00000 00000",
  email = "info@apexify-resort.example.com",
  developerCredit = "Designed & Developed by Apexify",
}: FooterProps) {
  return (
    <footer className="border-t border-[#E8DEC9] bg-[#234B3C] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C5A46D] text-[#234B3C] font-serif font-bold text-xl">A</div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                {brandName}
              </span>
            </div>
            <p className="max-w-md text-sm text-[#B8D1C4] leading-relaxed">
              Experience serene hospitality in Vasai with comfortable rooms, outdoor pool, lush lawns, and authentic dining.
            </p>
            <p className="text-xs text-[#B8D1C4]/80">
              {address}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D]">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-[#DDE8E2]">
              <li><Link href="#rooms" className="hover:text-white transition-colors">Accommodation</Link></li>
              <li><Link href="#dining" className="hover:text-white transition-colors">Apexify Restaurant & Bar</Link></li>
              <li><Link href="#facilities" className="hover:text-white transition-colors">Resort Amenities</Link></li>
              <li><Link href="#gallery" className="hover:text-white transition-colors">Photo Gallery</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">Location & Contact</Link></li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D]">
              Guest Assistance
            </h4>
            <div className="space-y-2 text-sm text-[#DDE8E2]">
              <p>Front Desk: 24 Hours</p>
              <p>Check-in: From 12:00 PM</p>
              <p>Check-out: Until 10:00 AM</p>
              <p className="pt-2 text-xs text-[#C5A46D]">Phone: {phone}</p>
              <p className="text-xs text-[#C5A46D]">Email: {email}</p>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-[#3E7461] pt-6 text-xs text-[#B8D1C4] sm:flex-row gap-4">
          <p>© {new Date().getFullYear()} {brandName}. All rights reserved.</p>
          <p className="font-medium text-[#C5A46D]">
            {developerCredit}
          </p>
        </div>
      </div>
    </footer>
  );
}
