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

## Demo form setup (spreadsheet + email)

The demo form posts to `app/api/demo-request/route.ts`, which does two things with
every submission: appends a row to a Google Sheet and emails the details to your
inbox. Both are independent — if one is down the other still captures the lead,
and the visitor only sees an error if **both** fail.

Fill in the values in `.env` (git-ignored, already in the project root).

### 1. Google Sheet

1. Create a Google Sheet to hold the leads.
2. In that sheet choose **Extensions → Apps Script**.
3. Delete the placeholder code and paste the contents of `docs/google-apps-script.gs`.
4. Choose **Project Settings → Script Properties → Add script property**. Name it
   `WEBHOOK_SECRET` and set any long random string as the value.
5. Choose **Deploy → New deployment → Web app**, then set:
   - *Execute as*: **Me**
   - *Who has access*: **Anyone**  ← required, otherwise the site gets an HTML login page instead of JSON
6. Click **Deploy**, authorise the script, and copy the `/exec` Web App URL.
7. Set `SHEETS_WEBHOOK_URL` to that URL and `SHEETS_WEBHOOK_SECRET` to the same
   secret from step 4.

The `Demo Requests` tab, its bold header row and the frozen header are created
automatically on the first submission. To sanity-check the script before wiring
up the site, run the `testAppend` function once from the Apps Script editor.

> After editing the script later, you must **Deploy → Manage deployments → Edit →
> Version: New version**. Saving alone does not update the live Web App.

### 2. Email notification

1. Create an account at [resend.com](https://resend.com) and generate an API key.
2. Set `RESEND_API_KEY` to that key and `NOTIFY_EMAIL_TO` to the address that
   should receive demo requests (comma-separate for several recipients).
3. `NOTIFY_EMAIL_FROM` is optional. Left unset, mail is sent from Resend's shared
   `onboarding@resend.dev` sender, which works immediately with no DNS changes.
   Once you verify your own domain in Resend, set it to something like
   `NUVA LYF <demo@nuvalyf.com>` for better deliverability.

Notification emails set `Reply-To` to the enquirer's address, so replying from
your inbox goes straight to them.

### 3. Vercel

Add the same variables under **Project Settings → Environment Variables** for the
Production, Preview and Development environments, then redeploy. Delivery failures
are logged to the Vercel runtime logs with the reason, prefixed `[demo-request]`.

## Important placeholders

- Replace both founder portrait placeholders in `components/about-team-section.tsx`.
- Add the verified business email, phone, WhatsApp and office address in `components/demo-form.tsx`.
- Add real Privacy Policy and Terms of Use links in `components/site-footer.tsx`.

## Product claim boundaries

The website intentionally does not claim inpatient management, pharmacy inventory, full accounting/GST filing, insurance claims, native mobile apps, video consultation, ABDM certification or unverified security certifications.
