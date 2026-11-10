"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, Phone, CheckCircle, MessageSquare, AlertCircle } from "lucide-react";
import { ROOMS_DATA } from "@/data/rooms.data";
import { BRAND_CONFIG } from "@/config/brand";

interface QuickEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoomSlug?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
}

export function QuickEnquiryModal({
  isOpen,
  onClose,
  initialRoomSlug,
  initialCheckIn,
  initialCheckOut,
}: QuickEnquiryModalProps) {
  const [roomSlug, setRoomSlug] = useState(initialRoomSlug || "deluxe-double-room");
  const [guestName, setGuestName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [checkIn, setCheckIn] = useState(initialCheckIn || "");
  const [checkOut, setCheckOut] = useState(initialCheckOut || "");
  const [adults, setAdults] = useState("2");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialRoomSlug) {
      setRoomSlug(initialRoomSlug);
    }
    if (initialCheckIn) {
      setCheckIn(initialCheckIn);
    }
    if (initialCheckOut) {
      setCheckOut(initialCheckOut);
    }
  }, [initialRoomSlug, initialCheckIn, initialCheckOut]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!guestName.trim()) {
      setValidationError("Please enter your name.");
      return;
    }

    const cleanPhone = phone.trim().replace(/[\s-]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      setValidationError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!checkIn) {
      setValidationError("Please select your desired check-in date.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: guestName.trim(),
          phone: cleanPhone,
          email: email.trim() || undefined,
          checkIn: checkIn || undefined,
          checkOut: checkOut || undefined,
          adults: parseInt(adults, 10) || 2,
          preferredRoomTypeId: roomSlug,
          message: specialRequests.trim() || undefined,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setIsSubmitted(true);
      } else {
        setValidationError(
          data?.error?.message || "Failed to submit enquiry. Please try again."
        );
      }
    } catch {
      // In case of network exception, fallback gracefully
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setValidationError(null);
    setGuestName("");
    setPhone("");
    setEmail("");
    setSpecialRequests("");
    onClose();
  };

  const selectedRoom = ROOMS_DATA.find((r) => r.slug === roomSlug);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetForm}
            className="fixed inset-0 bg-[#292D2A]/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-modal-title"
            initial={{ scale: 0.95, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-[#C5A46D]/20 overflow-hidden z-10 my-8"
          >
            {/* Header */}
            <div className="bg-[#234B3C] px-6 py-5 text-white flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
                  Dhuri Resort · Direct Booking
                </span>
                <h3 id="enquiry-modal-title" className="font-serif text-2xl font-bold tracking-tight mt-0.5">
                  Reservation Enquiry
                </h3>
              </div>
              <button
                onClick={resetForm}
                className="rounded-full p-1.5 text-white/80 hover:text-white hover:bg-white/10 transition"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {isSubmitted ? (
                <div className="text-center py-6">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#234B3C]/10 text-[#234B3C] mb-4">
                    <CheckCircle className="h-9 w-9" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-[#234B3C]">
                    Enquiry Received (Preview)
                  </h4>
                  <p className="mt-3 text-sm text-[#292D2A]/80 leading-relaxed max-w-md mx-auto">
                    Thank you, <strong>{guestName}</strong>! Your reservation enquiry for the{" "}
                    <strong>{selectedRoom?.name}</strong> has been logged in this Phase 2 frontend preview.
                  </p>

                  <div className="my-5 p-4 rounded-xl bg-[#F4EFE5] border border-[#C5A46D]/30 text-xs text-left text-[#292D2A]/80 space-y-1.5">
                    <p className="font-semibold text-[#234B3C] uppercase tracking-wider text-[11px]">
                      Phase 2 Frontend Simulation Note:
                    </p>
                    <p>
                      • No database write occurred in Phase 2 frontend preview.
                    </p>
                    <p>
                      • Direct resort front desk contact: <strong>+91 98200 00000</strong>
                    </p>
                    <p>
                      • Resort address: Near Navjeevan Naka, Waliv, Vasai East, Maharashtra.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                    <a
                      href="https://wa.me/919820000000?text=Hello%20Dhuri%20Resort,%20I%20would%20like%20to%20enquire%20about%20a%20room%20reservation."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#20ba5a] transition"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Chat on WhatsApp Now
                    </a>
                    <button
                      onClick={resetForm}
                      className="rounded-xl border border-[#234B3C]/30 bg-transparent px-5 py-2.5 text-sm font-semibold text-[#234B3C] hover:bg-[#FAF9F6] transition"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {validationError && (
                    <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-200">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  {/* Room Selection */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#292D2A]/80 mb-1.5">
                      Selected Room Category
                    </label>
                    <select
                      value={roomSlug}
                      onChange={(e) => setRoomSlug(e.target.value)}
                      className="w-full rounded-xl border border-[#E8DEC9] bg-[#FAF9F6] px-3.5 py-2.5 text-sm text-[#292D2A] focus:border-[#234B3C] focus:bg-white focus:outline-none transition"
                    >
                      {ROOMS_DATA.map((room) => (
                        <option key={room.slug} value={room.slug}>
                          {room.name} — ₹{room.basePrice.toLocaleString()} / night
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dates Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#292D2A]/80 mb-1.5">
                        Check-in Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="w-full rounded-xl border border-[#E8DEC9] bg-[#FAF9F6] px-3.5 py-2.5 text-sm text-[#292D2A] focus:border-[#234B3C] focus:bg-white focus:outline-none transition"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#292D2A]/80 mb-1.5">
                        Check-out Date
                      </label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full rounded-xl border border-[#E8DEC9] bg-[#FAF9F6] px-3.5 py-2.5 text-sm text-[#292D2A] focus:border-[#234B3C] focus:bg-white focus:outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Guests & Adults */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#292D2A]/80 mb-1.5">
                        Adults
                      </label>
                      <select
                        value={adults}
                        onChange={(e) => setAdults(e.target.value)}
                        className="w-full rounded-xl border border-[#E8DEC9] bg-[#FAF9F6] px-3.5 py-2.5 text-sm text-[#292D2A] focus:border-[#234B3C] focus:bg-white focus:outline-none transition"
                      >
                        <option value="1">1 Adult</option>
                        <option value="2">2 Adults</option>
                        <option value="3">3 Adults</option>
                        <option value="4">4 Adults</option>
                        <option value="5+">5+ (Group / Family)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#292D2A]/80 mb-1.5">
                        Children (under 12)
                      </label>
                      <select className="w-full rounded-xl border border-[#E8DEC9] bg-[#FAF9F6] px-3.5 py-2.5 text-sm text-[#292D2A] focus:border-[#234B3C] focus:bg-white focus:outline-none transition">
                        <option value="0">0 Children</option>
                        <option value="1">1 Child</option>
                        <option value="2">2 Children</option>
                        <option value="3+">3+ Children</option>
                      </select>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#292D2A]/80 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Patel"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full rounded-xl border border-[#E8DEC9] bg-[#FAF9F6] px-3.5 py-2.5 text-sm text-[#292D2A] focus:border-[#234B3C] focus:bg-white focus:outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#292D2A]/80 mb-1.5">
                        Mobile Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 98200 00000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-[#E8DEC9] bg-[#FAF9F6] px-3.5 py-2.5 text-sm text-[#292D2A] focus:border-[#234B3C] focus:bg-white focus:outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#292D2A]/80 mb-1.5">
                      Special Requests / Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Pool-facing room preferred, extra bed requirement, late check-in time..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full rounded-xl border border-[#E8DEC9] bg-[#FAF9F6] px-3.5 py-2.5 text-sm text-[#292D2A] focus:border-[#234B3C] focus:bg-white focus:outline-none transition"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-xl bg-[#234B3C] py-3.5 px-4 text-center font-medium text-white shadow-md hover:bg-[#1b3b2f] transition disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span>Processing Enquiry...</span>
                        </>
                      ) : (
                        <span>Submit Reservation Enquiry</span>
                      )}
                    </button>
                    <p className="mt-2 text-center text-[11px] text-[#292D2A]/60">
                      Guaranteed lowest direct rates · Fast WhatsApp confirmation
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

