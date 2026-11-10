import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";

export const metadata: Metadata = {
  title: "Terms and Conditions | Apexify Resort",
  description: "Terms and conditions governing stays, dining, and property use at Apexify Resort, Waliv, Vasai East.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F2C59] hover:text-[#C5A46D] transition mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-sm border border-[#E8DEC9] space-y-8">
          <div className="border-b border-[#E8DEC9] pb-6">
            <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-bold">
              Guest Agreement
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2C59] mt-1">
              Terms & Conditions
            </h1>
            <p className="mt-2 text-xs text-[#292D2A]/60">
              Standard Hospitality Terms · Apexify Resort, Waliv, Vasai East
            </p>
          </div>

          <div className="prose prose-sm max-w-none text-[#292D2A]/80 space-y-6 text-sm leading-relaxed">
            <section className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#0F2C59]">1. Check-in & Identification</h3>
              <p>
                Standard check-in time is 12:00 PM (noon) and check-out time is 10:00 AM. In accordance with government regulations, all adult guests must present valid government-issued photo identification (Aadhaar, Passport, Driving License, or Voter ID) at check-in. PAN cards are not accepted as proof of address.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#0F2C59]">2. Swimming Pool Rules</h3>
              <p>
                The outdoor swimming pool is open daily between 7:00 AM and 7:00 PM. Appropriate synthetic swimwear (nylon or lycra) is mandatory. Guests enter the pool at their own discretion; children under 12 must be supervised by an adult at all times. Glassware and food items are prohibited within the water.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#0F2C59]">3. Room Occupancy & Extra Beds</h3>
              <p>
                Standard double rooms accommodate a maximum of 2 adults and 1 child under 5 years sharing existing bedding. Additional rollaway beds or mattresses can be requested for an extra charge of ₹500 per guest per night, subject to room category capacity.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#0F2C59]">4. Pet & Smoking Policies</h3>
              <p>
                Pets are not allowed on the property premises. All indoor guest rooms and closed dining areas are strictly non-smoking. Designated outdoor smoking zones are provided on the property grounds.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#0F2C59]">5. Banquet & Event Guidelines</h3>
              <p>
                Events hosted on the Grand Banquet Lawn must comply with local municipal sound regulations. Loud music or public address systems must cease by 10:00 PM in accordance with local laws.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

