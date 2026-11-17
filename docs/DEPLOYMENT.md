# NuvaLyf website: deployment & content guide

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Content editor (CMS): open `http://localhost:3000/keystatic`. Edits are saved as files in `content/` and `public/team/`, then committed with git.

## Environment variables

| Variable | Needed for | Example |
|---|---|---|
| `RESEND_API_KEY` | Demo, contact, hospital enquiry and waitlist emails | `re_...` |
| `NOTIFY_EMAIL_TO` | Where form emails go (comma-separated) | `business@nuvalyf.com` |
| `NOTIFY_EMAIL_FROM` | Sender (domain must be verified in Resend) | `NuvaLyf Website <noreply@nuvalyf.com>` |
| `SHEETS_WEBHOOK_URL` / `SHEETS_WEBHOOK_SECRET` | Optional: copy demo requests to Google Sheets | see `docs/google-apps-script.gs` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 (shows the cookie banner when set) | `G-XXXXXXX` |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Optional Search Console meta tag (the HTML-file method is already in `public/`) | token |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO` | Edit content on the live site via GitHub | `nuvalyfgit/nuvalyf-website-repo` |

Without the email variables the forms validate input but return a friendly "not configured" message.

## Deploy (Vercel recommended)

1. Import the GitHub repo in Vercel, framework **Next.js**, Node 20.19+.
2. Add the environment variables above.
3. Add the domains `nuvalyf.com` and `www.nuvalyf.com`, then update DNS at the registrar as Vercel shows (A record `76.76.21.21` for the apex, CNAME `cname.vercel-dns.com` for www).
4. In Google Search Console, submit `https://nuvalyf.com/sitemap.xml`.

## Editing content on the live site

Local mode only works on your computer. To let the team edit from the live site:

1. Set `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO` and follow Keystatic's prompt at `/keystatic` to create the GitHub app (adds `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`).
2. Every save becomes a commit; Vercel redeploys automatically.

## What lives where

| Content | Where to edit |
|---|---|
| Team members, photos, LinkedIn | CMS → Team members |
| Blog posts (cover image, images in the text, tags, SEO title and description) | CMS → Blog posts |
| FAQ for clinics and for patients | CMS → FAQ |
| DocConnect launch date, company social links | CMS → Site settings |
| Job openings | CMS → Open roles |
| Clinics count, countries, team size, other stats | CMS → Company statistics |
| Milestones | CMS → Milestones |
| Testimonials, client logos (with permission only) | CMS → Testimonials / Clients |
| Contact numbers, navigation | `data/site-content.ts` |
| Product modules | `data/modules.ts` |
| Specialty pages, demo video URL | `data/more-content.ts` |
| Arabic page (incl. its FAQ) | `app/ar/page.tsx` |
