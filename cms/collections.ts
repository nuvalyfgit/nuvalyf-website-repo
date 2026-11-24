import type { Access, CollectionAfterChangeHook, CollectionConfig, FieldHook } from "payload";
import { revalidatePath } from "next/cache";

/** Refresh the live pages as soon as an editor saves. Outside a Next.js request (scripts) this is skipped. */
export const refresh = (...paths: string[]) => {
  for (const p of paths) {
    try {
      revalidatePath(p, p.includes("[") ? "page" : undefined);
    } catch {
      /* not running inside Next.js */
    }
  }
};
const afterSave = (...paths: string[]): CollectionAfterChangeHook => ({ doc }) => {
  refresh(...paths, ...(doc?.slug ? [`/blogs/${doc.slug}`] : []), ...(doc?.path ? [doc.path] : []));
  return doc;
};

/** Logged-in staff can edit; the public can read published content. */
const staff: Access = ({ req }) => Boolean(req.user);
const anyone: Access = () => true;
const publishedOrStaff: Access = ({ req }) => (req.user ? true : { _status: { equals: "published" } });

const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
const autoSlug =
  (from: string): FieldHook =>
  ({ value, data }) =>
    value ? slugify(String(value)) : data?.[from] ? slugify(String(data[from])) : value;

const slugField = (from: string) => ({
  name: "slug",
  type: "text" as const,
  required: true,
  unique: true,
  index: true,
  admin: { position: "sidebar" as const, description: "Web address. Filled from the title if left empty. Use lowercase words with hyphens." },
  hooks: { beforeValidate: [autoSlug(from)] },
});

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: { useAsTitle: "email", group: "Settings", description: "People who can sign in to this CMS." },
  fields: [
    { name: "name", type: "text" },
    {
      name: "role",
      type: "select",
      defaultValue: "editor",
      options: [
        { label: "Admin (everything)", value: "admin" },
        { label: "Editor (content only)", value: "editor" },
      ],
      access: { update: ({ req }) => req.user?.role === "admin" },
    },
  ],
  access: {
    read: staff,
    create: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
    update: ({ req, id }) => req.user?.role === "admin" || req.user?.id === id,
  },
};

export const Media: CollectionConfig = {
  slug: "media",
  admin: { group: "Content", description: "Images used on the website. Always describe the image for screen readers and Google." },
  access: { read: anyone, create: staff, update: staff, delete: staff },
  upload: {
    staticDir: "media",
    mimeTypes: ["image/png", "image/jpeg", "image/webp", "image/avif", "image/svg+xml"],
    imageSizes: [
      { name: "thumb", width: 480 },
      { name: "card", width: 960 },
      { name: "wide", width: 1600 },
    ],
    focalPoint: true,
  },
  fields: [{ name: "alt", type: "text", required: true, label: "Image description (alt text)" }],
};

export const Posts: CollectionConfig = {
  slug: "posts",
  hooks: { afterChange: [afterSave("/blogs", "/", "/sitemap.xml")] },
  labels: { singular: "Blog post", plural: "Blog posts" },
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "category", "publishedAt", "_status"],
    description: "Articles on /blogs. Save as a draft, preview, then Publish. Use the SEO tab before publishing.",
    preview: (doc) => `/blogs/${doc?.slug ?? ""}`,
  },
  versions: { drafts: { schedulePublish: true }, maxPerDoc: 30 },
  access: { read: publishedOrStaff, create: staff, update: staff, delete: staff },
  defaultSort: "-publishedAt",
  fields: [
    { name: "title", type: "text", required: true, maxLength: 120 },
    { name: "summary", type: "textarea", required: true, minLength: 50, maxLength: 300, admin: { description: "One or two sentences. Shown on the blog list and used as the search description if the SEO tab is empty." } },
    { name: "cover", type: "upload", relationTo: "media", admin: { description: "Wide image, at least 1600 px." } },
    { name: "content", type: "richText", required: true },
    slugField("title"),
    { name: "publishedAt", type: "date", required: true, defaultValue: () => new Date().toISOString(), admin: { position: "sidebar", date: { pickerAppearance: "dayOnly" } } },
    { name: "author", type: "text", defaultValue: "NuvaLyf team", admin: { position: "sidebar" } },
    {
      name: "category",
      type: "select",
      defaultValue: "guides",
      admin: { position: "sidebar" },
      options: [
        { label: "Guides", value: "guides" },
        { label: "Product updates", value: "product" },
        { label: "Clinic operations", value: "operations" },
        { label: "News", value: "news" },
      ],
    },
    { name: "tags", type: "text", hasMany: true, admin: { position: "sidebar", description: "Used to suggest related posts." } },
  ],
};

/** Search settings for the fixed website pages (home, pricing, about...). */
export const Pages: CollectionConfig = {
  slug: "pages",
  hooks: { afterChange: [afterSave()] },
  labels: { singular: "Page SEO", plural: "Page SEO" },
  admin: { useAsTitle: "label", group: "SEO", defaultColumns: ["label", "path"], description: "Google title, description and share image for each website page. Leave a field empty to use the built-in default." },
  versions: { drafts: false },
  access: { read: anyone, create: staff, update: staff, delete: staff },
  fields: [
    { name: "label", type: "text", required: true },
    { name: "path", type: "text", required: true, unique: true, admin: { description: "The page address, e.g. / or /products" } },
  ],
};

export const Team: CollectionConfig = {
  slug: "team",
  hooks: { afterChange: [afterSave("/about", "/")] },
  labels: { singular: "Team member", plural: "Team members" },
  admin: { useAsTitle: "name", group: "Company", defaultColumns: ["name", "role", "department", "order"] },
  access: { read: anyone, create: staff, update: staff, delete: staff },
  defaultSort: "order",
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", required: true, label: "Designation" },
    {
      name: "department",
      type: "select",
      required: true,
      defaultValue: "leadership",
      options: [
        { label: "Founders & Leadership", value: "leadership" },
        { label: "R&D and Technology", value: "technology" },
        { label: "Business Development", value: "business" },
        { label: "Marketing and Creative", value: "marketing" },
        { label: "Interns & Contributors", value: "interns" },
      ],
    },
    { name: "focus", type: "text", label: "Focus area (short)" },
    { name: "bio", type: "textarea" },
    { name: "photo", type: "upload", relationTo: "media", admin: { description: "Square photo, at least 600 px." } },
    { name: "linkedin", type: "text", admin: { description: "Full profile link: https://www.linkedin.com/in/..." }, validate: (v: unknown) => !v || /^https:\/\/(www\.)?linkedin\.com\/in\/\S+$/.test(String(v)) || "Use a full LinkedIn profile link" },
    { name: "order", type: "number", defaultValue: 10, admin: { position: "sidebar", description: "Lower shows first" } },
  ],
};

export const Jobs: CollectionConfig = {
  slug: "jobs",
  hooks: { afterChange: [afterSave("/careers")] },
  labels: { singular: "Open role", plural: "Open roles" },
  admin: { useAsTitle: "title", group: "Company", defaultColumns: ["title", "team", "type", "open"] },
  access: { read: anyone, create: staff, update: staff, delete: staff },
  fields: [
    { name: "title", type: "text", required: true, label: "Role title" },
    { name: "team", type: "text" },
    { name: "location", type: "text" },
    {
      name: "type",
      type: "select",
      defaultValue: "full-time",
      options: [
        { label: "Full-time", value: "full-time" },
        { label: "Internship", value: "internship" },
        { label: "Contract", value: "contract" },
      ],
    },
    { name: "summary", type: "textarea" },
    { name: "open", type: "checkbox", defaultValue: true, label: "Accepting applications" },
  ],
};

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  hooks: { afterChange: [afterSave("/")] },
  admin: { useAsTitle: "name", group: "Trust (with permission only)", description: "Only add quotes you have written permission to publish." },
  access: { read: anyone, create: staff, update: staff, delete: staff },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", label: "Role and clinic" },
    { name: "quote", type: "textarea", required: true },
  ],
};

export const Clients: CollectionConfig = {
  slug: "clients",
  hooks: { afterChange: [afterSave("/")] },
  labels: { singular: "Client logo", plural: "Client logos" },
  admin: { useAsTitle: "name", group: "Trust (with permission only)", description: "Only add logos you have permission to show." },
  access: { read: anyone, create: staff, update: staff, delete: staff },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "logo", type: "upload", relationTo: "media" },
    { name: "url", type: "text", label: "Website" },
  ],
};
