# NUVA LYF Website

A complete responsive marketing website for NUVA LYF, built with Next.js (App Router), React, TypeScript and Tailwind CSS.

Visual direction reference: https://www.design.com/share/ea2dbf71-3467-4b8d-beab-7b9a0f27b0f0. The project uses an original editable mark and original coded UI visuals.

## Run locally in VS Code

1. Install Node.js 20.9 or newer (Node 22 LTS recommended).
2. Open this folder in VS Code.
3. Open the terminal and run `npm install`.
4. Run `npm run dev`.
5. Open http://localhost:3000.

## Production build

Run `npm run build`, then `npm run start` to serve the production build locally on http://localhost:3000.

## Deploy to Vercel

This is a standard Next.js App Router project, so Vercel needs no extra configuration:

1. Push the repository to GitHub/GitLab/Bitbucket.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Vercel auto-detects the Next.js framework preset — leave Build Command (`next build`), Output Directory and Install Command at their defaults.
4. There are no required environment variables. Click **Deploy**.

Alternatively, deploy from this folder with the Vercel CLI: `npx vercel` for a preview and `npx vercel --prod` for production.

## Editable structure

- `app/page.tsx` composes the full website.
- `app/globals.css` contains the brand tokens and global styles.
- `components/` contains every reusable website section.
- `components/ui/` contains shared interface primitives.
- `data/site-content.ts` contains navigation, feature, product, security, persona and specialty content.
- `public/favicon.svg` contains the editable brand favicon.

## Important placeholders

- Replace both founder portrait placeholders in `components/about-team-section.tsx`.
- Add the verified business email, phone, WhatsApp and office address in `components/demo-form.tsx`.
- Add real Privacy Policy and Terms of Use links in `components/site-footer.tsx`.
- Connect `handleSubmit` in `components/demo-form.tsx` to the production API or CRM.

## Product claim boundaries

The website intentionally does not claim inpatient management, pharmacy inventory, full accounting/GST filing, insurance claims, native mobile apps, video consultation, ABDM certification or unverified security certifications.
