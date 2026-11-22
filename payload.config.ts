import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { s3Storage } from "@payloadcms/storage-s3";
import sharp from "sharp";
import { Clients, Jobs, Media, Pages, Posts, Team, Testimonials, Users } from "./cms/collections";
import { Faq, Milestones, Settings, Stats } from "./cms/globals";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://nuvalyf.com";
const dbUri = process.env.DATABASE_URI || "";

/**
 * NuvaLyf website CMS. Admin panel at /admin.
 * Database: Postgres when DATABASE_URI is a postgres URL (production), otherwise a local SQLite file.
 * Images: Supabase Storage (S3 API) when S3_ACCESS_KEY_ID is set (production), otherwise the local media/ folder.
 */
export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || undefined,
  secret: process.env.PAYLOAD_SECRET || "",
  admin: {
    user: Users.slug,
    meta: { titleSuffix: " | NuvaLyf CMS" },
  },
  collections: [Posts, Pages, Team, Jobs, Testimonials, Clients, Media, Users],
  globals: [Settings, Faq, Stats, Milestones],
  editor: lexicalEditor(),
  db: dbUri.startsWith("postgres")
    ? postgresAdapter({ pool: { connectionString: dbUri, max: 3 } })
    : sqliteAdapter({ client: { url: dbUri || "file:./nuvalyf-cms.db" } }),
  sharp,
  graphQL: { disable: true },
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  plugins: [
    seoPlugin({
      collections: ["posts", "pages"],
      uploadsCollection: "media",
      tabbedUI: true,
      generateTitle: ({ doc }) => (doc?.title ? `${doc.title} | NuvaLyf` : "NuvaLyf"),
      generateDescription: ({ doc }) => doc?.summary ?? "",
      generateURL: ({ doc, collectionSlug }) =>
        collectionSlug === "posts" ? `${SITE}/resources/${doc?.slug ?? ""}` : `${SITE}${doc?.path ?? "/"}`,
    }),
    s3Storage({
      enabled: Boolean(process.env.S3_ACCESS_KEY_ID),
      collections: { media: true },
      bucket: process.env.S3_BUCKET || "media",
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION,
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
          sessionToken: process.env.S3_SESSION_TOKEN || undefined,
        },
      },
    }),
  ],
});
