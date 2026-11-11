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
      <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-subtle border border-[#E8E3DA] mb-8">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-[#A78355] font-bold">
            Guest Self-Service Portal
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#252525] mt-1">
            Look Up Your Reservation
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#77736D]">
            Enter your booking reference code to view live reservation status, assigned rooms, stay dates, and payment receipt.
          </p>
        </div>

        <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A78355]" />
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value.toUpperCase())}
              placeholder="e.g. DR-202611-ABCD"
              className="w-full rounded-2xl border border-[#E8E3DA] bg-[#F8F6F1] pl-11 pr-4 py-3 text-sm font-mono uppercase tracking-wider text-[#252525] placeholder:text-[#77736D]/60 focus:border-[#A78355] focus:bg-white focus:outline-none transition"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#A78355] px-6 py-3 text-sm font-semibold text-white shadow-subtle hover:bg-[#936F43] transition disabled:opacity-50"
          >
            {isLoading ? (
              <span>Searching...</span>
            ) : (
              <>
                <Search className="h-4 w-4 text-white" />
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
        <div className="rounded-3xl bg-white shadow-subtle border border-[#E8E3DA] overflow-hidden print:border-none print:shadow-none">
          {/* Header Banner */}
          <div className="bg-[#252525] px-6 sm:px-8 py-6 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#A78355]/20 border border-[#A78355]/40 px-3 py-1 text-xs font-semibold text-[#F8F6F1] mb-2">
                <CheckCircle className="h-3.5 w-3.5 text-[#A78355]" />
                <span>Status: {booking.status}</span>
              </div>
              <h3 className="font-serif text-2xl font-bold tracking-tight text-white">
                Reservation #{booking.bookingReference}
              </h3>
              <p className="text-xs text-[#F8F6F1]/75 mt-0.5">
                Booked on {formatDate(booking.createdAt)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 text-xs font-medium text-white transition print:hidden"
              >
                <Printer className="h-3.5 w-3.5 text-[#A78355]" />
                <span>Print Voucher</span>
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Stay Dates & Guest Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-[#E8E3DA]">
              {/* Stay Dates */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#A78355] font-bold">
                  Stay Schedule
                </span>
                <div className="grid grid-cols-2 gap-4 rounded-2xl bg-[#F8F6F1] p-4 border border-[#E8E3DA]">
                  <div>
                    <span className="text-[10px] text-[#77736D] uppercase font-semibold block">
                      Check-In
                    </span>
                    <strong className="text-sm text-[#252525] block mt-0.5">
                      {formatDate(booking.checkIn)}
                    </strong>
                    <span className="text-[11px] text-[#77736D]">From 12:00 PM</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#77736D] uppercase font-semibold block">
                      Check-Out
                    </span>
                    <strong className="text-sm text-[#252525] block mt-0.5">
                      {formatDate(booking.checkOut)}
                    </strong>
                    <span className="text-[11px] text-[#77736D]">Until 10:00 AM</span>
                  </div>
                </div>
                <div className="text-xs text-[#77736D] flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-[#A78355]" />
                  <span>
                    Total Duration: <strong>{getNights(booking.checkIn, booking.checkOut)} Night(s)</strong>
                  </span>
                  <span>·</span>
                  <span>
                    Guests: <strong>{booking.adults} Adults, {booking.children} Children</strong>
                  </span>
                </div>
              </div>

              {/* Lead Guest Info */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#A78355] font-bold">
                  Guest Information
                </span>
                <div className="rounded-2xl bg-[#F8F6F1] p-4 border border-[#E8E3DA] space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#77736D]">Primary Guest:</span>
                    <strong className="text-[#252525]">{booking.leadGuest.fullName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#77736D]">Contact Phone:</span>
                    <span className="text-[#252525] font-mono">{booking.leadGuest.phone}</span>
                  </div>
                  {booking.leadGuest.email && (
                    <div className="flex justify-between">
                      <span className="text-[#77736D]">Email Address:</span>
                      <span className="text-[#252525]">{booking.leadGuest.email}</span>
                    </div>
                  )}
                  {booking.leadGuest.city && (
                    <div className="flex justify-between">
                      <span className="text-[#77736D]">City / State:</span>
                      <span className="text-[#252525]">
                        {booking.leadGuest.city}
                        {booking.leadGuest.state ? `, ${booking.leadGuest.state}` : ""}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Room Allocations */}
            <div>
              <span className="text-xs uppercase tracking-widest text-[#A78355] font-bold block mb-3">
                Accommodations Reserved
              </span>
              <div className="space-y-3">
                {booking.bookingRooms.map((br) => (
                  <div
                    key={br.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border border-[#E8E3DA] bg-[#F8F6F1] p-4 gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#252525] text-[#A78355] flex-shrink-0">
                        <Bed className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-serif text-base font-bold text-[#252525]">
                          {br.roomType.name}
                        </h4>
                        <span className="text-xs text-[#77736D] block">
                          {br.quantity} Unit(s) {br.roomType.bedConfiguration ? `· ${br.roomType.bedConfiguration}` : ""}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      {br.room ? (
                        <div className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-[#E8E3DA] px-3 py-1 text-xs font-semibold text-[#252525]">
                          <span>Assigned Room #{br.room.roomNumber}</span>
                          {br.room.floorLabel && <span className="text-[11px] text-[#77736D]">({br.room.floorLabel})</span>}
                        </div>
                      ) : (
                        <span className="text-xs text-[#77736D] italic">Room assigned at check-in</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial & GST Breakdown */}
            <div className="rounded-2xl bg-[#F8F6F1] p-5 border border-[#E8E3DA] space-y-2.5 text-xs">
              <span className="text-xs uppercase tracking-widest text-[#A78355] font-bold block mb-1">
                Payment Summary
              </span>
              <div className="flex justify-between text-[#77736D]">
                <span>Room Charges Subtotal:</span>
                <span className="font-medium text-[#252525]">₹{Number(booking.subtotal).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#77736D]">
                <span>Statutory 12% GST (CGST 6% + SGST 6%):</span>
                <span className="font-medium text-[#252525]">₹{Number(booking.taxAmount).toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-[#E8E3DA] flex justify-between items-baseline text-sm">
                <strong className="text-[#252525] font-serif text-base">Total Reservation Amount:</strong>
                <strong className="font-serif text-xl font-bold text-[#252525]">
                  ₹{Number(booking.totalAmount).toLocaleString()}
                </strong>
              </div>
            </div>

            {/* Special Requests */}
            {booking.specialRequests && (
              <div className="rounded-2xl bg-[#F8F6F1] p-4 border border-[#E8E3DA] text-xs text-[#252525]">
                <strong className="text-[#252525] block mb-1">Special Guest Notes:</strong>
                <p className="text-[#77736D]">{booking.specialRequests}</p>
              </div>
            )}

            {/* Important Resort Notes */}
            <div className="rounded-2xl bg-white p-4 border border-[#E8E3DA] text-xs text-[#77736D] space-y-1.5">
              <strong className="text-[#252525] block">Important Resort Guidelines:</strong>
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
    <main className="min-h-screen bg-[#F8F6F1]">
      {/* Page Header */}
      <section className="relative py-16 sm:py-24 bg-[#252525] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/resort/exterior_facade.jpg"
            alt="Apexify Resort Reservation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F8F6F1]/80 hover:text-white mb-4 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-[#A78355]" />
            <span>Return to Apexify Resort Home</span>
          </Link>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Reservation Confirmation
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#F8F6F1]/85 max-w-xl mx-auto font-light">
            View and verify your booking at Apexify Resort, Waliv, Vasai East.
          </p>
        </div>
      </section>

      <Suspense fallback={<div className="text-center py-20 text-xs text-[#77736D]">Loading reservation portal...</div>}>
        <BookingLookupContent />
      </Suspense>
    </main>
  );
}
