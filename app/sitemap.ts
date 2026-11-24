import type { MetadataRoute } from "next";
import { allNavLinks } from "@/data/site-content";
import { specialtyPages } from "@/data/more-content";
import { getPosts } from "@/lib/cms";

const base = "https://nuvalyf.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const pages = [...new Set([...allNavLinks.map((l) => l.href), "/book-a-demo", "/ar", "/tools/clinic-wait-time-calculator"])];
  return [
    { url: base, priority: 1 },
    ...pages.map((p) => ({ url: `${base}${p}`, priority: p === "/book-a-demo" || p === "/products" || p === "/docconnect" ? 0.9 : 0.8 })),
    ...specialtyPages.map((s) => ({ url: `${base}/specialties/${s.slug}`, priority: 0.6 })),
    ...posts.map((p) => ({ url: `${base}/blogs/${p.slug}`, lastModified: p.date ?? undefined, priority: 0.6 })),
    { url: `${base}/privacy`, priority: 0.2 },
    { url: `${base}/terms`, priority: 0.2 },
  ];
}
