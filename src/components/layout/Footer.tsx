import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowUpRight } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";

export function Footer() {
  return (
    <footer className="bg-[#0F2C59] text-[#FAF9F6] border-t border-[#C5A46D]/20">
      {/* Top Banner CTA */}
      <div className="border-b border-white/10 bg-[#1d3f33]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#C5A46D] font-semibold">
                Plan Your Getaway
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                Experience Tranquil Hospitality at Apexify Resort
              </h3>
              <p className="text-sm text-[#F4EFE5]/80 mt-1 max-w-xl">
                Located near Navjeevan Naka in Waliv, Vasai East — your peaceful weekend retreat with swimming pool, multi-cuisine dining, and party lawn.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#C5A46D] px-6 py-3 text-sm font-semibold text-[#292D2A] hover:bg-[#d6b986] transition shadow-md"
              >
                <span>Contact Front Desk</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href="https://wa.me/919820000000?text=Hello%20Apexify%20Resort,%20I%20would%20like%20to%20enquire%20about%20booking."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:bg-[#20ba5a] transition shadow-md"
              >
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C5A46D] text-[#0F2C59] shadow-sm">
                <span className="font-serif text-2xl font-bold">A</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  {BRAND_CONFIG.resortName}
                </span>
                <span className="block text-[10px] uppercase tracking-widest text-[#C5A46D] font-semibold">
                  {BRAND_CONFIG.brandSubtitle}
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#F4EFE5]/75 leading-relaxed max-w-sm">
              Apexify Resort is a premier leisure and hospitality destination nestled in Waliv, Vasai East, Maharashtra. Designed for restful staycations, pool parties, family celebrations, and banquet gatherings.
            </p>

            <p className="font-serif italic text-sm text-[#C5A46D]">
              “Apexify Resort — Your Stay, Simplified.”
            </p>

            <div className="pt-2 text-xs text-[#F4EFE5]/70 space-y-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#C5A46D] flex-shrink-0 mt-0.5" />
                <span>
                  {BRAND_CONFIG.location.address}, {BRAND_CONFIG.location.city} - {BRAND_CONFIG.location.pincode}, Maharashtra
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#C5A46D] flex-shrink-0" />
                <span>+91 98200 00000 / +91 0250 000000</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#C5A46D] flex-shrink-0" />
                <span>contact@apexify-resort.example.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-[#C5A46D] flex-shrink-0" />
                <span>24-Hour Front Desk · Check-in: 12:00 PM · Check-out: 10:00 AM</span>
              </div>
            </div>
          </div>

          {/* Column 2: Rooms & Suites */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white tracking-wide border-b border-white/10 pb-2 mb-4">
              Accommodation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F4EFE5]/80">
              <li>
                <Link href="/rooms/deluxe-double-room" className="hover:text-[#C5A46D] transition">
                  Deluxe Double Room (AC)
                </Link>
              </li>
              <li>
                <Link href="/rooms/executive-double-room" className="hover:text-[#C5A46D] transition">
                  Executive Double Room
                </Link>
              </li>
              <li>
                <Link href="/rooms/standard-double-room-fan" className="hover:text-[#C5A46D] transition">
                  Standard Double Room with Fan
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="text-[#C5A46D] hover:underline font-medium inline-flex items-center gap-1">
                  View All Rooms & Rates →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resort Experiences */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white tracking-wide border-b border-white/10 pb-2 mb-4">
              Experiences
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F4EFE5]/80">
              <li>
                <Link href="/facilities#swimming-pool" className="hover:text-[#C5A46D] transition">
                  Outdoor Swimming Pool
                </Link>
              </li>
              <li>
                <Link href="/dining" className="hover:text-[#C5A46D] transition">
                  Family Restaurant & Bar
                </Link>
              </li>
              <li>
                <Link href="/facilities#banquet-lawn" className="hover:text-[#C5A46D] transition">
                  Grand Banquet & Party Lawn
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-[#C5A46D] transition">
                  Weekend Staycation Offers
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#C5A46D] transition">
                  Photo Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Navigation & Policies */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white tracking-wide border-b border-white/10 pb-2 mb-4">
              Information & Policies
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F4EFE5]/80">
              <li>
                <Link href="/about" className="hover:text-[#C5A46D] transition">
                  About Apexify Resort
                </Link>
              </li>
              <li>
                <Link href="/booking/lookup" className="hover:text-[#C5A46D] transition font-medium text-[#C5A46D]">
                  Look Up Reservation
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#C5A46D] transition">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C5A46D] transition">
                  Directions & Location Map
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#C5A46D] transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#C5A46D] transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/cancellation-policy" className="hover:text-[#C5A46D] transition">
                  Cancellation & Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Credit Bar */}
      <div className="border-t border-white/10 bg-[#19372c] py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F4EFE5]/70">
          <p>
            © {new Date().getFullYear()} {BRAND_CONFIG.resortName}. All rights reserved. Waliv, Vasai East, Maharashtra.
          </p>
          <div className="flex items-center gap-2">
            <span>{BRAND_CONFIG.developerCredit}</span>
            <span className="text-[#C5A46D]">·</span>
            <span className="text-[#C5A46D] font-medium">{BRAND_CONFIG.poweredByCredit}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

