"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "./button";

export interface NavItem {
  label: string;
  href: string;
}

export interface NavbarProps {
  brandName?: string;
  items?: NavItem[];
  onBookNowClick?: () => void;
}

export function Navbar({
  brandName = "Apexify Resort",
  items = [
    { label: "Home", href: "/" },
    { label: "Rooms", href: "#rooms" },
    { label: "Dining", href: "#dining" },
    { label: "Facilities", href: "#facilities" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ],
  onBookNowClick,
}: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E8DEC9]/50 bg-[#FAF9F6]/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#234B3C] text-[#C5A46D] shadow-sm">
            <span className="font-serif text-xl font-bold">A</span>
          </div>
          <div>
            <span className="font-serif text-xl font-bold tracking-tight text-[#234B3C]">
              {brandName}
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-[#C5A46D] font-semibold">
              Vasai · Maharashtra
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#292D2A] transition-colors hover:text-[#234B3C]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={onBookNowClick}
            className="shadow-sm"
          >
            Book Your Stay
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-[#E8DEC9] text-[#292D2A] hover:bg-[#F4EFE5]"
        >
          {isOpen ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-[#E8DEC9] bg-[#FAF9F6] px-4 pt-2 pb-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2 text-base font-medium text-[#292D2A] hover:bg-[#F4EFE5]"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => {
                setIsOpen(false);
                onBookNowClick?.();
              }}
            >
              Book Your Stay
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
