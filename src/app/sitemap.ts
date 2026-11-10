import { MetadataRoute } from "next";
import { ROOMS_DATA } from "@/data/rooms.data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://apexify-resort.example.com";
  const lastModified = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/rooms",
    "/dining",
    "/facilities",
    "/gallery",
    "/offers",
    "/contact",
    "/faq",
    "/privacy-policy",
    "/terms",
    "/cancellation-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: (route === "" ? "daily" : "weekly") as "daily" | "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const roomRoutes = ROOMS_DATA.map((room) => ({
    url: `${baseUrl}/rooms/${room.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...roomRoutes];
}

