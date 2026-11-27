/**
 * Create an admin user, or reset an existing user's password and make them admin.
 * Works on whichever database DATABASE_URI points to (local SQLite or Supabase Postgres).
 * Values come from env vars so passwords never go in code or chat.
 *
 * PowerShell, against the live (Supabase) database:
 *   $env:NODE_ENV="production"            # stops Payload from changing the database schema
 *   $env:DATABASE_URI="postgres://..."    # same value as in Vercel
 *   $env:PAYLOAD_SECRET="anything-long"   # any value works for this script
 *   $env:ADMIN_EMAIL="you@nuvalyf.com"
 *   $env:ADMIN_PASSWORD="a-strong-password"
 *   npx payload run scripts/set-admin.ts
 */
import { getPayload } from "payload";
import config from "../payload.config";

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;

if (!email || !password || password.length < 8) {
  console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD (8+ characters) first.");
  process.exit(1);
}

const payload = await getPayload({ config });
const db = (process.env.DATABASE_URI || "").startsWith("postgres") ? "Postgres (live)" : "local SQLite";
const existing = await payload.find({ collection: "users", where: { email: { equals: email } }, limit: 1 });

if (existing.docs[0]) {
  await payload.update({
    collection: "users",
    id: existing.docs[0].id,
    data: { password, role: "admin", loginAttempts: 0, lockUntil: null } as never,
  });
  console.log(`Password reset for ${email} on ${db}. They are now an admin.`);
} else {
  await payload.create({ collection: "users", data: { email, password, role: "admin", name: email.split("@")[0] } });
  console.log(`Created admin ${email} on ${db}.`);
}

const all = await payload.find({ collection: "users", limit: 50, depth: 0 });
console.log(`Users in this database: ${all.docs.map((u) => u.email).join(", ")}`);
process.exit(0);
