"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  MessageSquare,
  Calendar,
  MapPin,
  Clock,
  Search,
  ChevronDown,
  Camera,
  Tag,
  Info,
  HelpCircle,
} from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";
import { QuickEnquiryModal } from "@/components/common/QuickEnquiryModal";

// Full primary navigation for wide screens (>= 1280px)
const PRIMARY_NAV = [
  { label: "Home", href: "/" },
  { label: "Rooms & Suites", href: "/rooms" },
  { label: "Dining & Bar", href: "/dining" },
  { label: "Facilities", href: "/facilities" },
  { label: "Gallery", href: "/gallery" },
  { label: "Offers", href: "/offers" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Compact navigation for laptop screens (1024px - 1279px)
const COMPACT_PRIMARY_NAV = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "Dining", href: "/dining" },
  { label: "Facilities", href: "/facilities" },
  { label: "Contact", href: "/contact" },
];

const MORE_NAV_LINKS = [
  { label: "Photo Gallery", href: "/gallery", icon: Camera },
  { label: "Special Offers", href: "/offers", icon: Tag },
  { label: "About Apexify Resort", href: "/about", icon: Info },
  { label: "FAQs & Policies", href: "/faq", icon: HelpCircle },
  { label: "Look Up Reservation", href: "/booking/lookup", icon: Search },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMoreMenuOpen(false);
  }, [pathname]);

  // Click outside to close "More" dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Luxury Utility Ribbon (Desktop only) */}
      <div className="hidden lg:block bg-[#F8F6F1] text-[#77736D] border-b border-[#E8E3DA] text-[11px] font-medium tracking-wide">
        <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between px-6 lg:px-12 py-2">
          {/* Left Metadata */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#A78355]" />
              <span className="whitespace-nowrap text-[#252525]">Waliv · Vasai East · Maharashtra</span>
            </div>
            <span className="text-[#E8E3DA]">|</span>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#A78355]" />
              <span className="whitespace-nowrap">24/7 Front Desk · Check-in 12:00 PM</span>
            </div>
          </div>

          {/* Right Direct Links */}
          <div className="flex items-center gap-6">
            <Link
              href="/booking/lookup"
              className="flex items-center gap-1.5 text-[#A78355] hover:text-[#936F43] transition whitespace-nowrap font-medium"
            >
              <Search className="h-3 w-3" />
              <span>Find Reservation</span>
            </Link>
            <span className="text-[#E8E3DA]">|</span>
            <a
              href="https://wa.me/919820000000?text=Hello%20Apexify%20Resort,%20I%20would%20like%20to%20enquire%20about%20booking."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#77736D] hover:text-[#252525] transition whitespace-nowrap"
            >
              <MessageSquare className="h-3 w-3 text-[#A78355]" />
              <span>WhatsApp: +91 98200 00000</span>
            </a>
            <span className="text-[#E8E3DA]">|</span>
            <a
              href="tel:+919820000000"
              className="flex items-center gap-1.5 text-[#77736D] hover:text-[#252525] transition whitespace-nowrap"
            >
              <Phone className="h-3 w-3 text-[#A78355]" />
              <span>+91 98200 00000</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "border-b border-[#E8E3DA] bg-white shadow-subtle py-3"
            : "bg-[#F8F6F1] border-b border-[#E8E3DA] py-4"
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between px-4 sm:px-8 lg:px-12">
          {/* 1. Left: Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-3.5 group flex-shrink-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#252525] text-[#A78355] shadow-xs border border-[#E8E3DA] transition-transform duration-300 group-hover:scale-105">
              <span className="font-serif text-2xl font-bold">A</span>
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#252525] block leading-none">
                {BRAND_CONFIG.resortName}
              </span>
              <span className="block text-[9px] uppercase tracking-[0.25em] text-[#A78355] font-semibold mt-1">
                Luxury Resort & Dining · Vasai
              </span>
            </div>
          </Link>

          {/* 2. Center: Navigation Links (Wide screens: 1280px+) */}
          <nav className="hidden xl:flex items-center justify-center flex-1 mx-8 2xl:mx-12 gap-6 2xl:gap-8">
            {PRIMARY_NAV.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[12px] 2xl:text-[12.5px] uppercase tracking-[0.14em] font-medium whitespace-nowrap transition-colors relative py-1 px-1 ${
                    isActive
                      ? "text-[#252525] font-semibold"
                      : "text-[#77736D] hover:text-[#252525]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A78355] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Center: Compact Navigation (Laptop screens: 1024px to 1279px) */}
          <nav className="hidden lg:flex xl:hidden items-center justify-center flex-1 mx-6 gap-5">
            {COMPACT_PRIMARY_NAV.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors relative py-1 px-1 ${
                    isActive
                      ? "text-[#252525] font-semibold"
                      : "text-[#77736D] hover:text-[#252525]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A78355] rounded-full" />
                  )}
                </Link>
              );
            })}

            {/* More Dropdown */}
            <div className="relative" ref={moreMenuRef}>
              <button
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className="inline-flex items-center gap-1 text-xs uppercase tracking-wider font-medium text-[#77736D] hover:text-[#252525] py-1 px-1 transition whitespace-nowrap"
              >
                <span>More</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isMoreMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {isMoreMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-white p-2 shadow-card border border-[#E8E3DA] z-50">
                  {MORE_NAV_LINKS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMoreMenuOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-[#252525] hover:bg-[#F8F6F1] hover:text-[#A78355] transition whitespace-nowrap"
                      >
                        <Icon className="h-4 w-4 text-[#A78355]" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* 3. Right: Action Button */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <button
              onClick={() => setIsEnquiryModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#A78355] hover:bg-[#936F43] px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide text-white shadow-subtle transition-all hover:shadow-card whitespace-nowrap active:scale-[0.98]"
            >
              <Calendar className="h-4 w-4 text-white flex-shrink-0" />
              <span>Book / Enquire</span>
            </button>
          </div>

          {/* Mobile Right Controls (< 1024px) */}
          <div className="flex lg:hidden items-center gap-2.5 flex-shrink-0">
            <button
              onClick={() => setIsEnquiryModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#A78355] hover:bg-[#936F43] px-3.5 py-2 text-xs font-semibold text-white shadow-subtle whitespace-nowrap"
            >
              <Calendar className="h-3.5 w-3.5 text-white" />
              <span>Book</span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E8E3DA] bg-white text-[#252525] hover:bg-[#F8F6F1] transition shadow-xs"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-[#252525]" />
              ) : (
                <Menu className="h-5 w-5 text-[#252525]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Navigation Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E8E3DA] bg-[#F8F6F1] px-5 py-6 shadow-elevated max-h-[85vh] overflow-y-auto">
            {/* Nav Links */}
            <div className="flex flex-col gap-1.5">
              {PRIMARY_NAV.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? "bg-[#252525] text-white"
                        : "text-[#252525] hover:bg-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <Link
                href="/faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-[#252525] hover:bg-white"
              >
                FAQs & Resort Policies
              </Link>

              <Link
                href="/booking/lookup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#A78355] hover:bg-white flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                <span>Find / Check My Reservation</span>
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-5 border-t border-[#E8E3DA] flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsEnquiryModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#A78355] hover:bg-[#936F43] py-3 text-sm font-semibold text-white shadow-subtle"
              >
                <Calendar className="h-4 w-4 text-white" />
                <span>Reserve Room / Send Enquiry</span>
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href="tel:+919820000000"
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#E8E3DA] bg-white py-2.5 text-xs font-semibold text-[#252525]"
                >
                  <Phone className="h-3.5 w-3.5 text-[#A78355]" />
                  <span>Call Us</span>
                </a>
                <a
                  href="https://wa.me/919820000000?text=Hello%20Apexify%20Resort,%20I%20would%20like%20to%20enquire%20about%20a%20stay."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#252525] py-2.5 text-xs font-semibold text-white shadow-subtle"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-[#A78355]" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Location Footer card in drawer */}
              <div className="mt-2 rounded-xl bg-white p-3.5 border border-[#E8E3DA] text-[11px] text-[#77736D] space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-[#252525]">
                  <MapPin className="h-3.5 w-3.5 text-[#A78355]" />
                  <span>Apexify Resort, Waliv, Vasai East</span>
                </div>
                <p>Near Navjeevan Naka, Maharashtra 401208</p>
                <p className="text-[#A78355] font-medium pt-0.5">Check-in: 12:00 PM · Check-out: 10:00 AM</p>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Quick Enquiry Modal */}
      <QuickEnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
      />
    </>
  );
}
