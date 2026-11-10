"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  AlertCircle,
  ArrowLeft,
  Printer,
  Sparkles,
  Bed,
  FileText,
} from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";

interface BookingDetails {
  id: string;
  bookingReference: string;
  status: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  specialRequests?: string;
  createdAt: string;
  leadGuest: {
    fullName: string;
    phone: string;
    email?: string;
    city?: string;
    state?: string;
  };
  bookingRooms: Array<{
    id: string;
    quantity: number;
    roomType: {
      name: string;
      slug: string;
      bedConfiguration?: string;
      images: Array<{ storagePath: string }>;
    };
    room?: {
      roomNumber: string;
      floorLabel?: string;
    };
  }>;
  priceSnapshot?: any;
  policySnapshot?: any;
}

function BookingLookupContent() {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get("ref") || "";

  const [reference, setReference] = useState(initialRef);
  const [isLoading, setIsLoading] = useState(false);
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchBooking = async (refToFetch: string) => {
    const clean = refToFetch.trim().toUpperCase();
    if (!clean) {
      setError("Please enter a valid booking reference (e.g., DR-202611-ABCD).");
      return;
    }

    setIsLoading(true);
    setError(null);
    setBooking(null);

    try {
      const res = await fetch(`/api/bookings/${encodeURIComponent(clean)}`);
      const data = await res.json();

      if (res.ok && data.success && data.data) {
        setBooking(data.data);
      } else {
        setError(data?.error?.message || "Booking reference not found in our resort records.");
      }
    } catch {
      setError("Unable to connect to the reservation service. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialRef) {
      fetchBooking(initialRef);
    }
  }, [initialRef]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBooking(reference);
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-IN", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const getNights = (inDate: string, outDate: string) => {
    try {
      const d1 = new Date(inDate);
      const d2 = new Date(outDate);
      return Math.max(1, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));
    } catch {
      return 1;
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Search Header Card */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-[#E8DEC9] mb-8">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-bold">
            Guest Self-Service Portal
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#234B3C] mt-1">
            Look Up Your Reservation
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#292D2A]/75">
            Enter your booking reference code to view live reservation status, assigned rooms, stay dates, and payment receipt.
          </p>
        </div>

        <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C5A46D]" />
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value.toUpperCase())}
              placeholder="e.g. DR-202611-ABCD"
              className="w-full rounded-2xl border border-[#E8DEC9] bg-[#FAF9F6] pl-11 pr-4 py-3 text-sm font-mono uppercase tracking-wider text-[#292D2A] focus:border-[#234B3C] focus:bg-white focus:outline-none transition"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#234B3C] px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#1b3b2f] transition disabled:opacity-50"
          >
            {isLoading ? (
              <span>Searching...</span>
            ) : (
              <>
                <Search className="h-4 w-4 text-[#C5A46D]" />
                <span>Search Reservation</span>
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 flex items-center gap-2.5 rounded-xl bg-red-50 p-3.5 text-xs text-red-700 border border-red-200">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Booking Details Display */}
      {booking && (
        <div className="rounded-3xl bg-white shadow-lg border border-[#C5A46D]/30 overflow-hidden print:border-none print:shadow-none">
          {/* Header Banner */}
          <div className="bg-[#234B3C] px-6 sm:px-8 py-6 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#C5A46D]/20 border border-[#C5A46D]/40 px-3 py-1 text-xs font-semibold text-[#F4EFE5] mb-2">
                <CheckCircle className="h-3.5 w-3.5 text-[#C5A46D]" />
                <span>Status: {booking.status}</span>
              </div>
              <h3 className="font-serif text-2xl font-bold tracking-tight">
                Reservation #{booking.bookingReference}
              </h3>
              <p className="text-xs text-[#F4EFE5]/75 mt-0.5">
                Booked on {formatDate(booking.createdAt)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 text-xs font-medium text-white transition print:hidden"
              >
                <Printer className="h-3.5 w-3.5 text-[#C5A46D]" />
                <span>Print Voucher</span>
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Stay Dates & Guest Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-[#E8DEC9]">
              {/* Stay Dates */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-bold">
                  Stay Schedule
                </span>
                <div className="grid grid-cols-2 gap-4 rounded-2xl bg-[#FAF9F6] p-4 border border-[#E8DEC9]">
                  <div>
                    <span className="text-[10px] text-[#292D2A]/60 uppercase font-semibold block">
                      Check-In
                    </span>
                    <strong className="text-sm text-[#234B3C] block mt-0.5">
                      {formatDate(booking.checkIn)}
                    </strong>
                    <span className="text-[11px] text-[#292D2A]/60">From 12:00 PM</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#292D2A]/60 uppercase font-semibold block">
                      Check-Out
                    </span>
                    <strong className="text-sm text-[#234B3C] block mt-0.5">
                      {formatDate(booking.checkOut)}
                    </strong>
                    <span className="text-[11px] text-[#292D2A]/60">Until 10:00 AM</span>
                  </div>
                </div>
                <div className="text-xs text-[#292D2A]/70 flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-[#C5A46D]" />
                  <span>Total Duration: <strong>{getNights(booking.checkIn, booking.checkOut)} Night(s)</strong></span>
                  <span>·</span>
                  <span>Guests: <strong>{booking.adults} Adults, {booking.children} Children</strong></span>
                </div>
              </div>

              {/* Lead Guest Info */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-bold">
                  Guest Information
                </span>
                <div className="rounded-2xl bg-[#FAF9F6] p-4 border border-[#E8DEC9] space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#292D2A]/60">Primary Guest:</span>
                    <strong className="text-[#234B3C]">{booking.leadGuest.fullName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#292D2A]/60">Contact Phone:</span>
                    <span className="text-[#292D2A] font-mono">{booking.leadGuest.phone}</span>
                  </div>
                  {booking.leadGuest.email && (
                    <div className="flex justify-between">
                      <span className="text-[#292D2A]/60">Email Address:</span>
                      <span className="text-[#292D2A]">{booking.leadGuest.email}</span>
                    </div>
                  )}
                  {booking.leadGuest.city && (
                    <div className="flex justify-between">
                      <span className="text-[#292D2A]/60">City / State:</span>
                      <span className="text-[#292D2A]">
                        {booking.leadGuest.city}{booking.leadGuest.state ? `, ${booking.leadGuest.state}` : ""}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Room Allocations */}
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-bold block mb-3">
                Accommodations Reserved
              </span>
              <div className="space-y-3">
                {booking.bookingRooms.map((br) => (
                  <div
                    key={br.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border border-[#E8DEC9] bg-[#FAF9F6] p-4 gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#234B3C] text-[#C5A46D] flex-shrink-0">
                        <Bed className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-serif text-base font-bold text-[#234B3C]">
                          {br.roomType.name}
                        </h4>
                        <span className="text-xs text-[#292D2A]/70 block">
                          {br.quantity} Unit(s) {br.roomType.bedConfiguration ? `· ${br.roomType.bedConfiguration}` : ""}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      {br.room ? (
                        <div className="inline-flex items-center gap-1.5 rounded-lg bg-[#234B3C]/10 px-3 py-1 text-xs font-semibold text-[#234B3C]">
                          <span>Assigned Room #{br.room.roomNumber}</span>
                          {br.room.floorLabel && <span className="text-[11px] text-[#292D2A]/60">({br.room.floorLabel})</span>}
                        </div>
                      ) : (
                        <span className="text-xs text-[#292D2A]/60 italic">Room assigned at check-in</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial & GST Breakdown */}
            <div className="rounded-2xl bg-[#F4EFE5]/50 p-5 border border-[#C5A46D]/30 space-y-2.5 text-xs">
              <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-bold block mb-1">
                Payment Summary
              </span>
              <div className="flex justify-between text-[#292D2A]/75">
                <span>Room Charges Subtotal:</span>
                <span className="font-medium text-[#292D2A]">₹{Number(booking.subtotal).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#292D2A]/75">
                <span>Statutory 12% GST (CGST 6% + SGST 6%):</span>
                <span className="font-medium text-[#292D2A]">₹{Number(booking.taxAmount).toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-[#C5A46D]/30 flex justify-between items-baseline text-sm">
                <strong className="text-[#234B3C] font-serif text-base">Total Reservation Amount:</strong>
                <strong className="font-serif text-xl font-bold text-[#234B3C]">
                  ₹{Number(booking.totalAmount).toLocaleString()}
                </strong>
              </div>
            </div>

            {/* Special Requests */}
            {booking.specialRequests && (
              <div className="rounded-2xl bg-[#FAF9F6] p-4 border border-[#E8DEC9] text-xs text-[#292D2A]/80">
                <strong className="text-[#234B3C] block mb-1">Special Guest Notes:</strong>
                <p>{booking.specialRequests}</p>
              </div>
            )}

            {/* Important Resort Notes */}
            <div className="rounded-2xl bg-white p-4 border border-[#E8DEC9] text-xs text-[#292D2A]/75 space-y-1.5">
              <strong className="text-[#234B3C] block">Important Resort Guidelines:</strong>
              <p>• Government-issued photo ID is required for all adult guests at the front desk upon arrival.</p>
              <p>• Swimming pool timings are 7:00 AM to 8:00 PM (proper nylon swimwear mandatory).</p>
              <p>• For any changes to stay dates or special requests, please contact reception at <strong>+91 98200 00000</strong>.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookingLookupPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      {/* Page Header */}
      <section className="relative py-16 sm:py-24 bg-[#234B3C] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/images/resort/exterior_facade.jpg"
            alt="Apexify Resort Reservation"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F4EFE5]/80 hover:text-white mb-4 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-[#C5A46D]" />
            <span>Return to Apexify Resort Home</span>
          </Link>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">
            Reservation Confirmation
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#F4EFE5]/85 max-w-xl mx-auto font-light">
            View and verify your booking at Apexify Resort, Waliv, Vasai East.
          </p>
        </div>
      </section>

      <Suspense fallback={<div className="text-center py-20 text-xs text-[#292D2A]/60">Loading reservation portal...</div>}>
        <BookingLookupContent />
      </Suspense>
    </main>
  );
}

