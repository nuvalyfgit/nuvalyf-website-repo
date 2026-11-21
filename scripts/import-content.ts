/**
 * One-time import of the old file-based content (content/*.yaml, content/posts/*.mdoc,
 * images in public/) into the Payload CMS. Safe to re-run: existing entries are skipped.
 *
 *   npx payload run scripts/import-content.ts
 */
import fs from "fs";
import path from "path";
import YAML from "js-yaml";
import { getPayload } from "payload";
import { convertMarkdownToLexical, editorConfigFactory } from "@payloadcms/richtext-lexical";
import config from "../payload.config";

const root = process.cwd();
const read = (p: string): any => (fs.existsSync(path.join(root, p)) ? YAML.load(fs.readFileSync(path.join(root, p), "utf-8")) : null);
const files = (dir: string, ext: string) =>
  fs.existsSync(path.join(root, dir)) ? fs.readdirSync(path.join(root, dir)).filter((f) => f.endsWith(ext)) : [];

const payload = await getPayload({ config });
const editorConfig = await editorConfigFactory.default({ config: payload.config });

async function upload(publicPath: string | null | undefined, alt: string) {
  if (!publicPath) return undefined;
  const filePath = path.join(root, "public", publicPath.replace(/^\//, ""));
  if (!fs.existsSync(filePath)) return undefined;
  const found = await payload.find({ collection: "media", where: { filename: { equals: path.basename(filePath) } }, limit: 1 });
  if (found.docs[0]) return found.docs[0].id;
  return (await payload.create({ collection: "media", data: { alt }, filePath })).id;
}

async function exists(collection: "team" | "jobs" | "posts" | "testimonials" | "clients" | "pages", field: string, value: string) {
  return (await payload.find({ collection, where: { [field]: { equals: value } }, limit: 1, draft: true })).totalDocs > 0;
}

// ---- first admin for local development (password from .env.local, never printed)
if ((await payload.count({ collection: "users" })).totalDocs === 0 && process.env.CMS_DEV_ADMIN_PASSWORD) {
  await payload.create({ collection: "users", data: { email: "admin@nuvalyf.local", password: process.env.CMS_DEV_ADMIN_PASSWORD, name: "Local admin", role: "admin" } });
  console.log("Created local admin admin@nuvalyf.local (password in .env.local)");
}

// ---- globals
const settings = read("content/settings.yaml");
if (settings) {
  const raw = String(settings.launchDate ?? "2027-01-26T09:00");
  await payload.updateGlobal({
    slug: "settings",
    data: { launchDate: new Date(/[zZ]|[+-]\d\d:\d\d$/.test(raw) ? raw : `${raw.slice(0, 16)}:00+05:30`).toISOString(), social: settings.social ?? {} },
  });
}
const faq = read("content/faq.yaml");
if (faq) await payload.updateGlobal({ slug: "faq", data: { clinic: faq.clinic ?? [], patient: faq.patient ?? [] } });
const stats = read("content/stats.yaml");
if (stats) await payload.updateGlobal({ slug: "stats", data: { clinics: stats.clinics, countries: stats.countries, teamSize: stats.teamSize ?? null, extra: stats.extra ?? [] } });
const milestones = read("content/milestones.yaml");
if (milestones) await payload.updateGlobal({ slug: "milestones", data: { items: (milestones.items ?? []).map((i: Record<string, string>) => ({ when: i.when || "", title: i.title, text: i.text })) } });

// ---- team
for (const f of files("content/team", ".yaml")) {
  const t = read(`content/team/${f}`);
  if (await exists("team", "name", t.name)) continue;
  await payload.create({
    collection: "team",
    data: { name: t.name, role: t.role, department: t.department, focus: t.focus, bio: t.bio, linkedin: t.linkedin || undefined, order: t.order ?? 10, photo: await upload(t.photo, t.name) },
  });
}

// ---- jobs, testimonials, clients
for (const f of files("content/jobs", ".yaml")) {
  const j = read(`content/jobs/${f}`);
  if (!(await exists("jobs", "title", j.title))) await payload.create({ collection: "jobs", data: { title: j.title, team: j.team, location: j.location, type: j.type, summary: j.summary, open: j.open ?? true } });
}
for (const f of files("content/testimonials", ".yaml")) {
  const t = read(`content/testimonials/${f}`);
  if (!(await exists("testimonials", "name", t.name))) await payload.create({ collection: "testimonials", data: { name: t.name, role: t.role, quote: t.quote } });
}
for (const f of files("content/clients", ".yaml")) {
  const c = read(`content/clients/${f}`);
  if (!(await exists("clients", "name", c.name))) await payload.create({ collection: "clients", data: { name: c.name, url: c.url, logo: await upload(c.logo, c.name) } });
}

// ---- blog posts (Markdoc front matter + body)
for (const f of files("content/posts", ".mdoc")) {
  const slug = f.replace(/\.mdoc$/, "");
  if (await exists("posts", "slug", slug)) continue;
  const text = fs.readFileSync(path.join(root, "content/posts", f), "utf-8");
  const [, front, body] = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/) ?? [null, "", text];
  const m = (YAML.load(front) ?? {}) as Record<string, any>;
  const markdown = body.replace(/\\\n/g, "\n").replace(/\n{3,}/g, "\n\n");
  await payload.create({
    collection: "posts",
    draft: Boolean(m.draft),
    data: {
      title: m.title,
      slug,
      summary: m.summary,
      publishedAt: new Date(m.date ?? Date.now()).toISOString(),
      author: m.author ?? "NuvaLyf team",
      category: m.category ?? "guides",
      tags: m.tags ?? [],
      cover: await upload(m.cover, m.coverAlt || m.title),
      content: convertMarkdownToLexical({ editorConfig, markdown }),
      meta: { title: m.seo?.title || undefined, description: m.seo?.description || undefined },
      _status: m.draft ? "draft" : "published",
    },
  });
}

// ---- one SEO entry per fixed page, empty so the built-in defaults apply until edited
const PAGES: [string, string][] = [
  ["/", "Home"], ["/pricing", "Pricing"], ["/products", "Products & features"], ["/solutions", "Solutions"],
  ["/for-doctors", "For doctors"], ["/for-hospitals", "For hospitals & clinics"], ["/docconnect", "DocConnect"],
  ["/find-a-doctor", "For patients"], ["/about", "About us"], ["/team", "Our team"], ["/careers", "Careers"],
  ["/resources", "Resources / blog"], ["/contact", "Contact"], ["/book-a-demo", "Book a demo"],
];
for (const [p, label] of PAGES) if (!(await exists("pages", "path", p))) await payload.create({ collection: "pages", data: { label, path: p } });

console.log("Import finished:", (await payload.count({ collection: "posts" })).totalDocs, "posts,", (await payload.count({ collection: "team" })).totalDocs, "team members");
process.exit(0);


