import React from "react";
import { MapPin, Navigation, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";
import { RESORT_SURROUNDINGS } from "@/config/catalog";
import { SectionHeader } from "@/components/common/SectionHeader";
import { MotionWrapper } from "@/components/common/MotionWrapper";

export function LocationSection() {
  return (
    <section className="py-20 sm:py-24 bg-[#FAF9F6]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Convenient Connectivity"
          title="Easy to Reach in Vasai East"
          subtitle="Conveniently situated near Navjeevan Naka in Waliv, Apexify Resort offers smooth road access from Mumbai, Thane, and the Western Express Highway."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Location Details & Distance Table */}
          <div className="lg:col-span-5 space-y-6">
            <MotionWrapper direction="left">
              <div className="rounded-2xl bg-white p-7 shadow-sm border border-[#E8DEC9]">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F2C59] text-[#C5A46D] flex-shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#0F2C59]">
                      Property Address
                    </h3>
                    <p className="mt-1 text-sm text-[#292D2A]/80 leading-relaxed">
                      {BRAND_CONFIG.location.address},<br />
                      {BRAND_CONFIG.location.city}, {BRAND_CONFIG.location.district} - {BRAND_CONFIG.location.pincode}, Maharashtra, India.
                    </p>
                    <p className="mt-2 text-xs text-[#C5A46D] font-semibold">
                      Landmark: {BRAND_CONFIG.location.landmark}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[#E8DEC9] space-y-3 text-xs text-[#292D2A]/80">
                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-[#0F2C59]" />
                    <span className="font-medium">+91 98200 00000 / Front Desk</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-[#0F2C59]" />
                    <span>info@apexify-resort.example.com</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="h-4 w-4 text-[#0F2C59]" />
                    <span>Check-in: 12:00 PM · Check-out: 10:00 AM</span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[#E8DEC9]">
                  <a
                    href="https://maps.google.com/?q=Waliv+Vasai+East+Maharashtra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-[#0F2C59] py-3 text-xs font-semibold text-white shadow-sm hover:bg-[#163B72] transition"
                  >
                    <Navigation className="h-4 w-4 text-[#C5A46D]" />
                    <span>Open in Google Maps</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </MotionWrapper>

            {/* Nearby Distances Card */}
            <MotionWrapper direction="left" delay={0.2}>
              <div className="rounded-2xl bg-[#F4EFE5] p-6 border border-[#C5A46D]/30">
                <h4 className="font-serif text-lg font-bold text-[#0F2C59] mb-3">
                  Nearby Landmarks & Transit
                </h4>
                <div className="divide-y divide-[#C5A46D]/20 text-xs">
                  {RESORT_SURROUNDINGS.map((item, i) => (
                    <div key={i} className="py-2.5 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-[#292D2A] block">{item.name}</span>
                        <span className="text-[10px] text-[#292D2A]/60">{item.type}</span>
                      </div>
                      <span className="font-serif font-bold text-sm text-[#0F2C59] bg-white/80 px-2.5 py-1 rounded-lg border border-[#C5A46D]/20">
                        {item.distance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </MotionWrapper>
          </div>

          {/* Right Column: Visual Map / Directions Graphic */}
          <div className="lg:col-span-7">
            <MotionWrapper direction="right">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E8DEC9] bg-white h-[480px] lg:h-[540px] flex flex-col">
                {/* Embed Map / Interactive Map Placeholder */}
                <div className="relative flex-grow w-full bg-[#FAF9F6]">
                  <iframe
                    title="Apexify Resort Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.541485665809!2d72.8665!3d19.3919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDIzJzMwLjgiTiA3MsKwNTInMDAuMSJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full grayscale-[20%] contrast-105"
                  />
                  <div className="absolute top-4 left-4 rounded-xl bg-white/95 px-4 py-2.5 shadow-md backdrop-blur-sm border border-[#E8DEC9] text-xs max-w-xs">
                    <p className="font-bold text-[#0F2C59]">Apexify Resort Location Pin</p>
                    <p className="text-[11px] text-[#292D2A]/70 mt-0.5">
                      Waliv, Vasai East — 7 km from Vasai Road Railway Station
                    </p>
                  </div>
                </div>

                {/* Map Bottom Bar Directions */}
                <div className="p-4 bg-white border-t border-[#E8DEC9] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="text-[#292D2A]/80">
                    <strong className="text-[#0F2C59]">Driving from Mumbai/Thane:</strong> Exit Western Express Highway (NH 48) at Pelhar / Sativali and follow Navjeevan Naka signs into Waliv.
                  </div>
                  <a
                    href="https://maps.google.com/?q=Waliv+Vasai+East+Maharashtra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 font-semibold text-[#0F2C59] hover:text-[#C5A46D] transition flex items-center gap-1"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}

