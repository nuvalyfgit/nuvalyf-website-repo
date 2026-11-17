# Requirements checklist

✅ done · ⚠️ done, needs your input · ⏳ not done yet

## 1. Overall
- ✅ Premium multi-page site, consistent type, colour and components
- ✅ Subtle reveal and hover animations; reduced-motion respected
- ✅ No stock photos or template look

## 2. Pages & navigation
- ✅ Home `/` · About `/about` · Our Team `/team` · Solutions `/solutions` · Products & Features `/products`
- ✅ For Doctors `/for-doctors` · For Hospitals & Clinics `/for-hospitals` · DocConnect `/docconnect`
- ✅ Resources / Blog `/resources` · Careers `/careers` · Contact `/contact` · Book a Demo `/book-a-demo`
- ✅ Grouped dropdown menu (Products, Solutions, Company) + mobile accordion menu
- ✅ Kept: For patients, 12 specialty pages, Arabic page, Privacy, Terms

- ✅ Pricing `/pricing`: T5 rates shown as "from" prices (Starter ₹599, Growth ₹1,399, Pro ₹2,999 / month), yearly toggle (−10%), plan comparison, extra seats, add-ons, DocConnect visit charges, support times, hospital ranges, pricing FAQ. Prices live in `data/pricing.ts`

## 3. Homepage
- ✅ Hero + CTA, intro, value proposition, products, features, how it works, who we serve
- ✅ Statistics (from CMS), team intro, FAQ, Book a Demo, contact details
- ⚠️ Client logos & testimonials: section appears automatically once approved entries are added in the CMS

## 4. About Us
- ✅ Introduction, story, mission, vision, approach, values & objectives, problems we solve, connected-care approach, milestones, achievements
- ⚠️ "Our story" text and milestone dates are drafts: please confirm or give real dates

## 5. Our Team
- ✅ Department sections: Leadership, R&D & Technology, Business Development, Marketing & Creative, Interns
- ✅ Profile cards with photo, name, designation, LinkedIn; managed in the CMS
- ⚠️ Only the two founders exist so far. Need: names, roles, photos and LinkedIn for the rest of the team
- ⚠️ Wasiq Mohideen's LinkedIn URL is missing (also missing on the current site)

## 6. Statistics
- ✅ Kept from the live site: 50+ clinics, 2 countries (India, UAE); animated counters
- ✅ Nothing invented; team size and extra stats stay hidden until entered
- ⚠️ Confirm numbers and add team strength if you want it shown

## 7. Products (14 modules)
- ✅ EMR, Patient, Doctor, Appointment, Queue, Receptionist Panel, Doctor Panel, Pharmacy Inventory, Digital Prescriptions, Patient History, Follow-ups, Hospital Communication, Reports & Analytics, Role-Based Access
- ✅ Interactive product tour (tabbed workflow demo)
- ⚠️ Confirm Pharmacy Inventory and Doctor Panel features match the product exactly
- ⏳ Real dashboard screenshots (send them and they replace the illustrated mock-ups)

## 8. DocConnect
- ✅ Dedicated page, discovery, specialty search, booking, live queue, availability, iPhone mock-up, countdown, waitlist
- ✅ Upcoming features marked "Soon"
- ⚠️ Launch date is still a placeholder (26 Jan 2027)

## 9. For Doctors · 10. For Hospitals & Clinics
- ✅ All listed points covered, each page with its own CTA
- ✅ Dedicated hospital/clinic enquiry form

## 11. Dynamic functionality
- ✅ Working navigation, counters, enquiry, contact, demo (date/time picker) and waitlist forms
- ✅ WhatsApp button + mobile Call / WhatsApp / Demo bar; email links
- ✅ CMS (`/keystatic`) for blog, team, careers, stats, milestones, testimonials, clients
- ✅ Video section ready (shows "coming soon" until a URL is set)
- ⚠️ Social links: add company LinkedIn / Instagram / X / YouTube URLs in `data/site-content.ts`
- ⚠️ Form emails need `RESEND_API_KEY` and `NOTIFY_EMAIL_TO` on the server

## 12. Design
- ✅ Primary #0F172A, secondary #059669, accent #14B8A6, white / light-grey backgrounds
- ✅ Consistent buttons, cards, spacing and hover states; smooth scrolling

## 13. Technical
- ✅ Responsive (desktop, tablet, mobile), clean component structure, TypeScript passes
- ✅ Title + description on every page, XML sitemap, robots.txt, clean URLs, Organization structured data, link preview image
- ✅ SEO extras: keyword in homepage H1, demo call to action in the homepage description, canonical tag on every page, English/Arabic language tags, FAQ, breadcrumb and EMR software structured data
- ✅ Optimised images (next/image), accessible labels, keyboard-usable menus
- ✅ Form validation (client + server), honeypot spam trap, rate limiting, friendly error states
- ⚠️ Google Analytics: set `NEXT_PUBLIC_GA_ID` (cookie consent banner included)
- ✅ Search Console verification file already present; submit the sitemap after launch
- ⏳ Production build, Lighthouse and cross-browser runs (Chrome, Safari, Edge, Firefox) before launch

## 14. Contact & leads
- ✅ business@nuvalyf.com, India + UAE numbers, WhatsApp, contact form, hospital form, Book a Demo CTA on every page

## 15. Deliverables
- ✅ Source code, deployment & content guide (`docs/DEPLOYMENT.md`)
- ⏳ Deploy to nuvalyf.com (needs hosting / DNS access)
- ⏳ CMS editing on the live site (GitHub mode, see guide)
