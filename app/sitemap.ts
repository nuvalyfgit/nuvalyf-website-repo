import type { MetadataRoute } from "next";
import { specialtyPages } from "@/data/more-content";

const base = "https://nuvalyf.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, priority: 1 },
    { url: `${base}/ar`, priority: 0.8 },
    { url: `${base}/docconnect`, priority: 0.9 },
    { url: `${base}/find-a-doctor`, priority: 0.8 },
    ...specialtyPages.map((s) => ({ url: `${base}/specialties/${s.slug}`, priority: 0.7 })),
    { url: `${base}/privacy`, priority: 0.2 },
    { url: `${base}/terms`, priority: 0.2 },
  ];
}
