# NUVA LYF Website

A complete responsive marketing website for NUVA LYF, built with React, Next-compatible Vinext, TypeScript and Tailwind CSS.

Visual direction reference: https://www.design.com/share/ea2dbf71-3467-4b8d-beab-7b9a0f27b0f0. The project uses an original editable mark and original coded UI visuals.

## Run locally in VS Code

1. Install Node.js 22.13 or newer.
2. Open this folder in VS Code.
3. Open the terminal and run `npm install` (or `pnpm install`).
4. Run `npm run dev`.
5. Open the local URL shown in the terminal.

## Production build

Run `npm run build`. The project is ready for a developer to connect the demo form to a backend, CRM or email service and deploy through a Node/Cloudflare-compatible host.

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
