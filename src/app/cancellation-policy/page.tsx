import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";

export const metadata: Metadata = {
  title: "Cancellation Policy | Apexify Resort",
  description: "Read the room reservation and banquet event cancellation terms for Apexify Resort, Waliv, Vasai East.",
};

export default function CancellationPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F8F6F1] py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#252525] hover:text-[#A78355] transition mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-subtle border border-[#E8E3DA] space-y-8">
          <div className="border-b border-[#E8E3DA] pb-6">
            <span className="text-xs uppercase tracking-widest text-[#A78355] font-bold">
              Booking Terms
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#252525] mt-1">
              Cancellation & Refund Policy
            </h1>
            <p className="mt-2 text-xs text-[#77736D]">
              Apexify Resort, Waliv, Vasai East, Maharashtra
            </p>
          </div>

          <div className="prose prose-sm max-w-none text-[#77736D] space-y-6 text-sm leading-relaxed">
            <section className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#252525]">1. Standard Individual Room Reservations</h3>
              <p>For direct room bookings:</p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>
                  <strong>Cancellation 48+ Hours Prior to Check-in:</strong> Cancellations received at least 48 hours prior to the standard 12:00 PM check-in time are eligible for a full refund or free date modification, subject to room availability.
                </li>
                <li>
                  <strong>Cancellation Within 48 Hours:</strong> Cancellations made within 48 hours of check-in will incur a charge equal to the first night room rate.
                </li>
                <li>
                  <strong>No-Shows:</strong> Failure to arrive on the scheduled check-in date without prior written or telephonic notice will result in the forfeiture of the entire booking advance.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#252525]">2. Day Picnic & Pool Pass Tickets</h3>
              <p>
                Day picnic and swimming pool passes may be rescheduled up to 24 hours in advance. Same-day cancellations or non-arrivals are non-refundable.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#252525]">3. Banquet Lawn & Wedding Event Bookings</h3>
              <p>
                Due to the exclusive allocation of property lawns and custom culinary preparation for banquet events:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>Banquet cancellations made 30+ days prior to the event date are eligible for a 75% refund of the advance deposit.</li>
                <li>Cancellations made between 15 and 29 days prior are eligible for a 50% refund.</li>
                <li>Cancellations within 14 days of the scheduled function are non-refundable. Date rescheduling is considered on a case-by-case basis.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#252525]">4. Refund Processing Time</h3>
              <p>
                Approved refunds are processed through the original payment method within 7 to 10 business days following written cancellation confirmation.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
