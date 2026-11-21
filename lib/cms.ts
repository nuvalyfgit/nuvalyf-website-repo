import "server-only";
import { cache } from "react";
import { draftMode } from "next/headers";
import config from "@payload-config";
import { getPayload } from "payload";
import type { Media, Post } from "@/payload-types";

/** Website content from the Payload CMS (/admin). Same function names as before, so pages didn't change. */
export const cms = cache(async () => getPayload({ config }));

const url = (m: number | Media | null | undefined) => (m && typeof m === "object" ? m.url ?? null : null);
const alt = (m: number | Media | null | undefined) => (m && typeof m === "object" ? m.alt : "");

export const departmentLabels: Record<string, string> = {
  leadership: "Founders & Leadership",
  technology: "R&D and Technology",
  business: "Business Development",
  marketing: "Marketing and Creative",
  interns: "Interns & Contributors",
};

export const categoryLabels: Record<string, string> = {
  guides: "Guides",
  product: "Product updates",
  operations: "Clinic operations",
  news: "News",
};

export const formatDate = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "";

export async function getTeam() {
  const { docs } = await (await cms()).find({ collection: "team", sort: "order", limit: 200, depth: 1 });
  return docs.map((t) => ({ slug: String(t.id), name: t.name, role: t.role, department: t.department, focus: t.focus ?? "", bio: t.bio ?? "", photo: url(t.photo), linkedin: t.linkedin ?? null, order: t.order ?? 10 }));
}

export async function getStats() {
  const s = await (await cms()).findGlobal({ slug: "stats" });
  return { clinics: s.clinics ?? 50, countries: s.countries ?? 2, teamSize: s.teamSize ?? null, patientsServed: s.patientsServed ?? null, patientsServedPeriod: s.patientsServedPeriod ?? "this month", extra: (s.extra ?? []).map((e) => ({ value: e.value, label: e.label })) };
}

export async function getMilestones() {
  const m = await (await cms()).findGlobal({ slug: "milestones" });
  return (m.items ?? []).map((i) => ({ when: i.when ?? "", title: i.title, text: i.text ?? "" }));
}

function shapePost(p: Post) {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    date: p.publishedAt,
    updated: p.updatedAt,
    author: p.author ?? "NuvaLyf team",
    category: p.category ?? "guides",
    tags: p.tags ?? [],
    cover: url(p.cover),
    coverAlt: alt(p.cover) || p.title,
    seo: { title: p.meta?.title ?? "", description: p.meta?.description ?? "", image: url(p.meta?.image as Media | number | null) },
    content: p.content,
  };
}

/** Published posts, newest first. */
export async function getPosts() {
  const { docs } = await (await cms()).find({ collection: "posts", where: { _status: { equals: "published" } }, sort: "-publishedAt", limit: 200, depth: 1 });
  return docs.map(shapePost);
}

/** One post. In preview (draft mode) editors see the latest draft. */
export async function getPost(slug: string) {
  const draft = (await draftMode()).isEnabled;
  const { docs } = await (await cms()).find({
    collection: "posts",
    where: draft ? { slug: { equals: slug } } : { and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }] },
    draft,
    limit: 1,
    depth: 1,
  });
  return docs[0] ? shapePost(docs[0]) : null;
}

export async function getJobs() {
  const { docs } = await (await cms()).find({ collection: "jobs", where: { open: { equals: true } }, limit: 100 });
  return docs.map((j) => ({ slug: String(j.id), title: j.title, team: j.team ?? "", location: j.location ?? "", type: j.type ?? "full-time", summary: j.summary ?? "", open: j.open ?? true }));
}

export async function getTestimonials() {
  const { docs } = await (await cms()).find({ collection: "testimonials", limit: 100 });
  return docs.map((t) => ({ slug: String(t.id), name: t.name, role: t.role ?? "", quote: t.quote }));
}

export async function getClients() {
  const { docs } = await (await cms()).find({ collection: "clients", limit: 100, depth: 1 });
  return docs.map((c) => ({ slug: String(c.id), name: c.name, logo: url(c.logo), url: c.url ?? null }));
}

const socialLabels = { linkedin: "LinkedIn", instagram: "Instagram", x: "X", youtube: "YouTube", facebook: "Facebook" } as const;

/** Site-wide settings. The launch date is stored as an instant and shown in India time. */
export async function getSettings() {
  const s = await (await cms()).findGlobal({ slug: "settings" });
  const launchDate = s.launchDate ?? "2027-01-26T09:00:00+05:30";
  const social = Object.entries(s.social ?? {})
    .filter(([k, href]) => k in socialLabels && href)
    .map(([k, href]) => ({ label: socialLabels[k as keyof typeof socialLabels], href: href as string }));
  return { launchDate, social };
}

/** FAQ lists, as [question, answer] pairs. */
export async function getFaqs(kind: "clinic" | "patient" = "clinic"): Promise<[string, string][]> {
  const f = await (await cms()).findGlobal({ slug: "faq" });
  return (f[kind] ?? []).map((i) => [i.question, i.answer]);
}

/** Up to three other posts, those sharing a tag first. */
export async function getRelatedPosts(slug: string, tags: readonly string[]) {
  const others = (await getPosts()).filter((p) => p.slug !== slug);
  const score = (p: (typeof others)[number]) => p.tags.filter((t) => tags.includes(t)).length;
  return [...others].sort((a, b) => score(b) - score(a)).slice(0, 3);
}

/** Search settings an editor set for a fixed page (CMS > SEO > Page SEO). */
export const getPageSeo = cache(async (path: string) => {
  const { docs } = await (await cms()).find({ collection: "pages", where: { path: { equals: path } }, limit: 1, depth: 1 });
  const m = docs[0]?.meta;
  return { title: m?.title || null, description: m?.description || null, image: url(m?.image as Media | number | null) };
});
