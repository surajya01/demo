import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Apexify Resort | Luxury Resort & Dining in Vasai East",
    template: "%s | Apexify Resort",
  },
  description:
    "Apexify Resort in Waliv, Vasai East — Your Stay, Simplified. Featuring an outdoor swimming pool, air-conditioned deluxe rooms, multi-cuisine restaurant, and grand banquet lawn.",
  keywords: [
    "Apexify Resort",
    "Apexify Resort Vasai",
    "Resort near Mumbai",
    "Resort with swimming pool",
    "Waliv Vasai East",
    "Day picnic resort",
    "Banquet lawn Vasai",
  ],
  authors: [{ name: "Apexify" }],
  metadataBase: new URL("https://apexify-resort.example.com"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#234B3C",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased bg-[#FAF9F6] text-[#292D2A] selection:bg-[#C5A46D]/30 selection:text-[#234B3C] flex flex-col min-h-screen overflow-x-hidden max-w-full">
        <Header />
        <div className="flex-grow overflow-x-hidden max-w-full">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
