import "server-only";
import { createReader } from "@keystatic/core/reader";
import config from "@/keystatic.config";

/** Reads website content edited through the CMS (/keystatic). */
export const reader = createReader(process.cwd(), config);

export const departmentLabels: Record<string, string> = {
  leadership: "Founders & Leadership",
  technology: "R&D and Technology",
  business: "Business Development",
  marketing: "Marketing and Creative",
  interns: "Interns & Contributors",
};

export async function getTeam() {
  const all = await reader.collections.team.all();
  return all
    .map(({ slug, entry }) => ({ slug, ...entry }))
    .sort((a, b) => (a.order ?? 10) - (b.order ?? 10));
}

export async function getStats() {
  return (await reader.singletons.stats.read()) ?? { clinics: 50, countries: 2, teamSize: null, extra: [] };
}

export async function getMilestones() {
  return (await reader.singletons.milestones.read())?.items ?? [];
}

export async function getPosts() {
  const all = await reader.collections.posts.all();
  return all
    .filter(({ entry }) => !entry.draft)
    .map(({ slug, entry }) => ({ slug, ...entry }))
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export async function getJobs() {
  const all = await reader.collections.jobs.all();
  return all.filter(({ entry }) => entry.open).map(({ slug, entry }) => ({ slug, ...entry }));
}

export async function getTestimonials() {
  return (await reader.collections.testimonials.all()).map(({ slug, entry }) => ({ slug, ...entry }));
}

export async function getClients() {
  return (await reader.collections.clients.all()).map(({ slug, entry }) => ({ slug, ...entry }));
}

const socialLabels = { linkedin: "LinkedIn", instagram: "Instagram", x: "X", youtube: "YouTube", facebook: "Facebook" } as const;

/** Site-wide settings edited in the CMS. The launch date is stored as India time. */
export async function getSettings() {
  const s = await reader.singletons.settings.read();
  const raw = s?.launchDate || "2027-01-26T09:00";
  const launchDate = /[zZ]|[+-]\d\d:\d\d$/.test(raw) ? raw : `${raw.length === 16 ? `${raw}:00` : raw}+05:30`;
  const social = Object.entries(s?.social ?? {})
    .filter(([, href]) => href)
    .map(([k, href]) => ({ label: socialLabels[k as keyof typeof socialLabels] ?? k, href: href as string }));
  return { launchDate, social };
}

/** FAQ lists edited in the CMS, as [question, answer] pairs. */
export async function getFaqs(kind: "clinic" | "patient" = "clinic"): Promise<[string, string][]> {
  const f = await reader.singletons.faq.read();
  return (f?.[kind] ?? []).map((i) => [i.question, i.answer]);
}

/** Up to three other posts, those sharing a tag first. */
export async function getRelatedPosts(slug: string, tags: readonly string[]) {
  const others = (await getPosts()).filter((p) => p.slug !== slug);
  const score = (p: (typeof others)[number]) => p.tags.filter((t) => tags.includes(t)).length;
  return [...others].sort((a, b) => score(b) - score(a)).slice(0, 3);
}

export const categoryLabels: Record<string, string> = {
  guides: "Guides",
  product: "Product updates",
  operations: "Clinic operations",
  news: "News",
};

export const formatDate = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "";
