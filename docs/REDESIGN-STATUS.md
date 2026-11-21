# Redesign + CMS status (branch feat/redesign-cms)

## Done
- Payload CMS at /admin: blog (drafts, scheduling, SEO tab), Page SEO, team, jobs, testimonials, clients, settings, FAQ, stats, milestones. Keystatic removed. Content imported with `npx payload run scripts/import-content.ts`.
- Pages read the CMS through lib/cms.ts; edits refresh pages instantly; per-page SEO via lib/seo.ts.
- New homepage: cinematic hero, scroll story, try-it demo, bento, before/after, globe + numbers, wait-time calculator (also /tools/clinic-wait-time-calculator), DocConnect band, trust strip.
- Floating glass header, Inter + Instrument Serif fonts, specialty accents, page transitions, dark mode and reduce-motion toggles, CMS-driven live counter (hidden until a real figure is entered).

## Next
1. Vercel env: DATABASE_URI (Neon Postgres), BLOB_READ_WRITE_TOKEN (Vercel Blob), PAYLOAD_SECRET, NEXT_PUBLIC_SERVER_URL. Run the import once against production, then create the first admin at /admin.
2. Roll the new design to inner pages; polish dark mode on older pages.
3. Lead review, then merge to Stage.

Local: `npx next dev -p 3100`. Local CMS login admin@nuvalyf.local (password in .env.local).
