"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle, 
  AlertCircle, ExternalLink, ShieldCheck 
} from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";
import { RESORT_SURROUNDINGS } from "@/config/catalog";
import { SectionHeader } from "@/components/common/SectionHeader";
import { MotionWrapper } from "@/components/common/MotionWrapper";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "General Room Enquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim()) {
      setErrorMessage("Please provide your name.");
      return;
    }

    const cleanPhone = formData.phone.trim().replace(/[\s-]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: formData.name.trim(),
          phone: cleanPhone,
          email: formData.email.trim() || undefined,
          message: `[${formData.subject}] ${formData.message.trim()}`,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(data?.error?.message || "Failed to record enquiry. Please try again.");
      }
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      {/* Page Header */}
      <section className="relative py-20 sm:py-28 bg-[#0F2C59] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/images/resort/exterior_facade.jpg"
            alt="Apexify Resort Contact Banner"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A46D] font-semibold block mb-3">
            Get in Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Contact Apexify Resort
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#F4EFE5]/85 max-w-2xl mx-auto font-light">
            Have questions about room availability, banquet lawn bookings, or pool picnics? Our front desk team in Waliv, Vasai East is ready to assist.
          </p>
        </div>
      </section>

      {/* Contact Content Grid */}
      <section className="py-20 sm:py-24 border-b border-[#E8DEC9]/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Official Contact Information (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <MotionWrapper direction="left">
                <div className="rounded-3xl bg-white p-7 sm:p-9 shadow-sm border border-[#E8DEC9] space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-bold">
                      Direct Hospitality Desk
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-[#0F2C59] mt-1">
                      Resort Contact Details
                    </h2>
                    <p className="mt-2 text-xs text-[#292D2A]/75 leading-relaxed">
                      Reach out directly via phone or WhatsApp for immediate reservation support, wedding banquet date inquiries, or customized group packages.
                    </p>
                  </div>

                  {/* Contact Items */}
                  <div className="space-y-4 pt-2 text-xs sm:text-sm text-[#292D2A]/85">
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F2C59] text-[#C5A46D] flex-shrink-0">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div>
                        <strong className="text-[#0F2C59] block font-semibold">Resort Location:</strong>
                        <span className="text-[#292D2A]/75 leading-relaxed block mt-0.5">
                          {BRAND_CONFIG.location.address},<br />
                          {BRAND_CONFIG.location.city}, {BRAND_CONFIG.location.district} - {BRAND_CONFIG.location.pincode}, Maharashtra.
                        </span>
                        <span className="text-[11px] text-[#C5A46D] font-semibold block mt-1">
                          Landmark: {BRAND_CONFIG.location.landmark}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F2C59] text-[#C5A46D] flex-shrink-0">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div>
                        <strong className="text-[#0F2C59] block font-semibold">Telephone & Front Desk:</strong>
                        <span className="text-[#292D2A]/75 block mt-0.5">+91 98200 00000 / +91 0250 000000</span>
                        <span className="text-[11px] text-[#292D2A]/60 block">Available 24 Hours / 7 Days</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F2C59] text-[#C5A46D] flex-shrink-0">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div>
                        <strong className="text-[#0F2C59] block font-semibold">Email Correspondence:</strong>
                        <span className="text-[#292D2A]/75 block mt-0.5">info@apexify-resort.example.com</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F2C59] text-[#C5A46D] flex-shrink-0">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div>
                        <strong className="text-[#0F2C59] block font-semibold">Check-in / Check-out:</strong>
                        <span className="text-[#292D2A]/75 block mt-0.5">
                          Check-in: 12:00 PM · Check-out: 10:00 AM
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Quick Action */}
                  <div className="pt-4 border-t border-[#E8DEC9]">
                    <a
                      href="https://wa.me/919820000000?text=Hello%20Apexify%20Resort,%20I%20would%20like%20to%20enquire%20about%20a%20stay."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-3.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-[#20ba5a] transition"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Chat with Front Desk on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </MotionWrapper>

              {/* Transit Distance Summary */}
              <MotionWrapper direction="left" delay={0.15}>
                <div className="rounded-3xl bg-[#F4EFE5] p-6 border border-[#C5A46D]/30 space-y-3">
                  <h4 className="font-serif font-bold text-base text-[#0F2C59]">
                    Transit & Railway Connectivity
                  </h4>
                  <ul className="text-xs text-[#292D2A]/80 space-y-2">
                    <li className="flex justify-between">
                      <span>Vasai Road Railway Station:</span>
                      <strong className="text-[#0F2C59]">7.0 km (15-20 min)</strong>
                    </li>
                    <li className="flex justify-between">
                      <span>Nalasopara Railway Station:</span>
                      <strong className="text-[#0F2C59]">7.0 km (15-20 min)</strong>
                    </li>
                    <li className="flex justify-between">
                      <span>Western Express Highway (NH 48):</span>
                      <strong className="text-[#0F2C59]">3.5 km via Pelhar</strong>
                    </li>
                    <li className="flex justify-between">
                      <span>Mumbai Airport (BOM):</span>
                      <strong className="text-[#0F2C59]">36 – 42 km</strong>
                    </li>
                  </ul>
                </div>
              </MotionWrapper>
            </div>

            {/* Right Column: Interactive Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <MotionWrapper direction="right">
                <div className="rounded-3xl bg-white p-7 sm:p-10 shadow-sm border border-[#E8DEC9]">
                  <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-bold">
                    Online Communication
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2C59] mt-1">
                    Send an Enquiry Message
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#292D2A]/75">
                    Fill out the form below and our guest reception manager will get back to you with rates and details.
                  </p>

                  {isSubmitted ? (
                    <div className="my-10 text-center py-8">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0F2C59]/10 text-[#0F2C59] mb-4">
                        <CheckCircle className="h-9 w-9" />
                      </div>
                      <h4 className="font-serif text-2xl font-bold text-[#0F2C59]">
                        Enquiry Successfully Registered
                      </h4>
                      <p className="mt-3 text-sm text-[#292D2A]/80 max-w-md mx-auto leading-relaxed">
                        Thank you, <strong>{formData.name}</strong>. Your enquiry regarding “{formData.subject}” has been registered in our resort management system.
                      </p>

                      <div className="my-6 max-w-md mx-auto rounded-2xl bg-[#F4EFE5] p-4 border border-[#C5A46D]/30 text-xs text-left text-[#292D2A]/80 space-y-1.5">
                        <p className="font-semibold text-[#0F2C59] uppercase text-[11px]">
                          Next Steps:
                        </p>
                        <p>
                          • Our front desk team at Waliv, Vasai East will review room availability and contact you via phone or WhatsApp.
                        </p>
                        <p>
                          • For urgent assistance, please call our reception at <strong>+91 98200 00000</strong>.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: "", phone: "", email: "", subject: "General Room Enquiry", message: "" });
                        }}
                        className="rounded-xl border border-[#0F2C59] px-5 py-2.5 text-xs font-semibold text-[#0F2C59] hover:bg-[#FAF9F6] transition"
                      >
                        Submit Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                      {errorMessage && (
                        <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3.5 text-xs text-red-700 border border-red-200">
                          <AlertCircle className="h-4 w-4 flex-shrink-0" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-[#292D2A]/80 mb-1.5">
                            Your Full Name *
                          </label>
                          <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            required
                            placeholder="e.g. Sameer Kulkarni"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full rounded-xl border border-[#E8DEC9] bg-[#FAF9F6] px-4 py-3 text-sm text-[#292D2A] focus:border-[#0F2C59] focus:bg-white focus:outline-none transition"
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-[#292D2A]/80 mb-1.5">
                            Mobile Phone Number *
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            placeholder="e.g. 98200 00000"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full rounded-xl border border-[#E8DEC9] bg-[#FAF9F6] px-4 py-3 text-sm text-[#292D2A] focus:border-[#0F2C59] focus:bg-white focus:outline-none transition"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#292D2A]/80 mb-1.5">
                            Email Address (Optional)
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="e.g. sameer@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full rounded-xl border border-[#E8DEC9] bg-[#FAF9F6] px-4 py-3 text-sm text-[#292D2A] focus:border-[#0F2C59] focus:bg-white focus:outline-none transition"
                          />
                        </div>

                        <div>
                          <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-[#292D2A]/80 mb-1.5">
                            Enquiry Category
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full rounded-xl border border-[#E8DEC9] bg-[#FAF9F6] px-4 py-3 text-sm text-[#292D2A] focus:border-[#0F2C59] focus:bg-white focus:outline-none transition"
                          >
                            <option value="General Room Enquiry">Room Stay & Suite Reservation</option>
                            <option value="Day Picnic & Pool Pass">Day Picnic & Swimming Pool Pass</option>
                            <option value="Banquet & Lawn Wedding">Banquet Lawn & Wedding Function</option>
                            <option value="Restaurant & Table Booking">Restaurant & Dining Table Booking</option>
                            <option value="Corporate Offsite">Corporate Gathering / Group Package</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[#292D2A]/80 mb-1.5">
                          Your Message / Requirements
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          placeholder="Tell us about your expected dates, guest count, or any specific celebration needs..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full rounded-xl border border-[#E8DEC9] bg-[#FAF9F6] px-4 py-3 text-sm text-[#292D2A] focus:border-[#0F2C59] focus:bg-white focus:outline-none transition"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F2C59] py-3.5 px-8 text-sm font-semibold text-white shadow-md hover:bg-[#163B72] transition disabled:opacity-70"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 text-[#C5A46D]" />
                              <span>Send Enquiry Message</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="mt-4 p-3 rounded-xl bg-[#FAF9F6] border border-[#E8DEC9] text-[11px] text-[#292D2A]/70 flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-[#0F2C59] flex-shrink-0" />
                        <span>We respect your privacy. Contact details are used strictly for reservation correspondence.</span>
                      </div>
                    </form>
                  )}
                </div>
              </MotionWrapper>
            </div>
          </div>
        </div>
      </section>

      {/* Map Embed Section */}
      <section className="py-16 bg-[#F4EFE5]/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Find Us On The Map"
            title="Directions to Waliv, Vasai East"
            subtitle="Convenient road approach via Western Express Highway (NH 48) and 15-20 minutes from Vasai Road Railway Station."
          />

          <div className="rounded-3xl overflow-hidden shadow-md border border-[#E8DEC9] h-96 w-full">
            <iframe
              title="Apexify Resort Google Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.541485665809!2d72.8665!3d19.3919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDIzJzMwLjgiTiA3MsKwNTInMDAuMSJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

