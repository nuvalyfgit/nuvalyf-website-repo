# NUVA LYF Code Map

## Design and scope references

- Visual reference: https://www.design.com/share/ea2dbf71-3467-4b8d-beab-7b9a0f27b0f0
- Product scope: `EMR_Final_Cost_Effective_Open_Source_Architecture_v1.1.pdf`
- Product plan: `Clinic_EMR_Solution_and_6_Week_Plan.pdf`

The website uses the reference artwork's dark navy, teal, aqua and violet direction. The included NUVA mark and all product interface visuals are original, editable code rather than copied Design.com artwork.

## Application files

- `app/layout.tsx` - SEO metadata, favicon and root page shell.
- `app/page.tsx` - Main website composition and section order.
- `app/globals.css` - Brand colours, type, spacing, accessibility and animation rules.
- `data/site-content.ts` - Editable navigation, features, product tabs, security, persona, specialty and differentiator content.

## Custom React components

- `components/brand-logo.tsx` - Original responsive NUVA LYF logo component.
- `components/site-header.tsx` - Sticky desktop navigation, mobile menu and demo CTA.
- `components/hero.tsx` - Hero copy, CTAs and coded clinic dashboard visual.
- `components/section-heading.tsx` - Shared section heading component.
- `components/features-section.tsx` - Ten clinic platform feature cards.
- `components/journey-section.tsx` - Eight-step outpatient patient journey.
- `components/platform-section.tsx` - Interactive tabs and seven editable product UI mockups.
- `components/security-section.tsx` - Security and trust controls.
- `components/solutions-section.tsx` - Personas, specialties and NUVA differentiators.
- `components/about-team-section.tsx` - Company mission, vision, approach and founder profiles.
- `components/final-cta.tsx` - Final demo call-to-action banner.
- `components/demo-form.tsx` - Responsive validated demo form with local success state.
- `components/site-footer.tsx` - Footer navigation, legal placeholders and brand statement.

## Shared UI components

The `components/ui/` folder contains reusable accessible React primitives supplied by the project starter. This website directly uses:

- `button.tsx`
- `input.tsx`
- `textarea.tsx`
- `native-select.tsx`
- `tabs.tsx`

The remaining UI primitives may be removed later by the developer if they are not needed for future pages.

## Assets

- `public/favicon.svg` - Original editable NUVA LYF favicon.
- Founder photographs are intentionally left as labelled placeholders.
- Product screenshots are coded UI mockups, so they remain sharp and easy to edit.

## Developer handoff checklist

1. Replace founder portrait placeholders with approved photographs.
2. Replace contact placeholders with verified NUVA LYF details.
3. Connect the demo form to the production API, CRM or email workflow.
4. Add approved Privacy Policy and Terms of Use pages or URLs.
5. Review all public security and regulatory claims before launch.
6. Replace coded product mockups with real screenshots when the application UI is final.
