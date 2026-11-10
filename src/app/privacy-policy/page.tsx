import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";

export const metadata: Metadata = {
  title: "Privacy Policy | Apexify Resort",
  description: "Read the guest data protection and privacy policy for Apexify Resort, Waliv, Vasai East.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#234B3C] hover:text-[#C5A46D] transition mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-sm border border-[#E8DEC9] space-y-8">
          <div className="border-b border-[#E8DEC9] pb-6">
            <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-bold">
              Legal & Compliance
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#234B3C] mt-1">
              Privacy Policy
            </h1>
            <p className="mt-2 text-xs text-[#292D2A]/60">
              Last updated: November 2026 · Apexify Resort, Waliv, Vasai East
            </p>
          </div>

          <div className="prose prose-sm max-w-none text-[#292D2A]/80 space-y-6 text-sm leading-relaxed">
            <section className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#234B3C]">1. Introduction</h3>
              <p>
                Apexify Resort (&quot;we,&quot; &quot;our,&quot; or &quot;the Resort&quot;) is committed to respecting and protecting the privacy of our website visitors, guests, and patrons. This Privacy Policy describes the types of information we may collect from you and our practices for collecting, using, maintaining, and protecting that information.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#234B3C]">2. Information We Collect</h3>
              <p>When you make an enquiry, request room reservation assistance, or contact us through our website, we may collect:</p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>Personal identification details such as your full name, mobile number, and email address.</li>
                <li>Stay preferences including check-in date, check-out date, guest counts, and room type preference.</li>
                <li>Special hospitality requests or notes provided voluntarily in enquiry forms.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#234B3C]">3. How We Use Your Information</h3>
              <p>We use information collected strictly for the purpose of:</p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>Facilitating reservation enquiries, date availability checks, and front desk communications.</li>
                <li>Answering customer inquiries regarding banquet packages, restaurant services, and pool passes.</li>
                <li>Complying with statutory guest registration requirements mandated by local authorities.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#234B3C]">4. Data Protection & Sharing</h3>
              <p>
                Apexify Resort does not sell, trade, or rent guest personal details to third-party marketing companies. Information is shared strictly with authorized operational staff members responsible for servicing your reservation.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#234B3C]">5. Contact Regarding Privacy</h3>
              <p>
                If you have questions regarding this policy, please reach out to our management at:
              </p>
              <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8DEC9] text-xs">
                <p><strong>Apexify Resort Management</strong></p>
                <p>Near Navjeevan Naka, Waliv, Vasai East, Maharashtra 401208, India</p>
                <p>Email: info@apexify-resort.example.com | Tel: +91 98200 00000</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

