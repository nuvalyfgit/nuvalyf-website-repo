import { createElement } from "react";
import { collection, config, fields, singleton } from "@keystatic/core";

const faqList = (label: string) =>
  fields.array(
    fields.object({
      question: fields.text({ label: "Question", validation: { length: { min: 5 } } }),
      answer: fields.text({ label: "Answer", multiline: true, validation: { length: { min: 10 } } }),
    }),
    { label, itemLabel: (p) => p.fields.question.value || "Question" },
  );

/**
 * Content editor for the website. Open /keystatic while running locally.
 * For editing on the live site, set NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO (see docs/DEPLOYMENT.md).
 */
const githubRepo = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO as `${string}/${string}` | undefined;

export default config({
  storage: githubRepo ? { kind: "github", repo: githubRepo } : { kind: "local" },
  ui: {
    brand: {
      name: "NuvaLyf website",
      mark: () => createElement("img", { src: "/icon.png", alt: "", width: 24, height: 24, style: { borderRadius: 6 } }),
    },
    navigation: {
      "Website content": ["settings", "faq", "stats", "milestones"],
      Blog: ["posts"],
      Company: ["team", "jobs"],
      "Trust (with permission only)": ["testimonials", "clients"],
    },
  },
  singletons: {
    settings: singleton({
      label: "Site settings",
      path: "content/settings",
      schema: {
        launchDate: fields.datetime({
          label: "DocConnect launch date and time",
          description: "India time. Drives the countdown on the DocConnect page.",
        }),
        social: fields.object(
          {
            linkedin: fields.url({ label: "LinkedIn page" }),
            instagram: fields.url({ label: "Instagram" }),
            x: fields.url({ label: "X (Twitter)" }),
            youtube: fields.url({ label: "YouTube" }),
            facebook: fields.url({ label: "Facebook" }),
          },
          { label: "Company social links", description: "Leave empty to hide. Shown in the footer and on the Contact page." },
        ),
      },
    }),
    faq: singleton({
      label: "FAQ",
      path: "content/faq",
      schema: {
        clinic: faqList("Questions clinics ask (homepage, Resources, specialty pages)"),
        patient: faqList("Questions patients ask (Find a doctor page)"),
      },
    }),
    stats: singleton({
      label: "Company statistics",
      path: "content/stats",
      schema: {
        clinics: fields.integer({ label: "Clinics onboarded", defaultValue: 50 }),
        countries: fields.integer({ label: "Countries live", defaultValue: 2 }),
        teamSize: fields.integer({ label: "Team strength (leave empty to hide)" }),
        extra: fields.array(
          fields.object({
            value: fields.text({ label: "Value, e.g. 10,000+" }),
            label: fields.text({ label: "Label" }),
          }),
          { label: "Other verified statistics", itemLabel: (p) => p.fields.label.value || "Statistic" },
        ),
      },
    }),
    milestones: singleton({
      label: "Milestones",
      path: "content/milestones",
      schema: {
        items: fields.array(
          fields.object({
            when: fields.text({ label: "When (e.g. 2025, or leave empty)" }),
            title: fields.text({ label: "Title" }),
            text: fields.text({ label: "Details", multiline: true }),
          }),
          { label: "Milestones", itemLabel: (p) => p.fields.title.value || "Milestone" },
        ),
      },
    }),
  },
  collections: {
    team: collection({
      label: "Team members",
      slugField: "name",
      columns: ["role", "department"],
      path: "content/team/*",
      format: { data: "yaml" },
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        role: fields.text({ label: "Designation" }),
        department: fields.select({
          label: "Department",
          defaultValue: "leadership",
          options: [
            { label: "Founders & Leadership", value: "leadership" },
            { label: "R&D and Technology", value: "technology" },
            { label: "Business Development", value: "business" },
            { label: "Marketing and Creative", value: "marketing" },
            { label: "Interns & Contributors", value: "interns" },
          ],
        }),
        focus: fields.text({ label: "Focus area (short)" }),
        bio: fields.text({ label: "Bio", multiline: true }),
        photo: fields.image({
          label: "Photo",
          description: "Square headshot, at least 600 x 600 px. Without a photo the card shows initials.",
          directory: "public/team",
          publicPath: "/team/",
        }),
        linkedin: fields.text({
          label: "LinkedIn URL",
          description: "Full profile link, e.g. https://www.linkedin.com/in/name",
          validation: {
            pattern: { regex: /^$|^https:\/\/(www\.)?linkedin\.com\/in\/\S+$/, message: "Use a full LinkedIn profile link (https://www.linkedin.com/in/...)" },
          },
        }),
        order: fields.integer({ label: "Order (lower shows first)", defaultValue: 10 }),
      },
    }),
    posts: collection({
      label: "Blog posts",
      slugField: "title",
      columns: ["date", "category", "draft"],
      path: "content/posts/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: { label: "Title", description: "The headline on the page. Aim for 50-65 characters and include the main keyword." },
          slug: { label: "Web address", description: "Becomes nuvalyf.com/resources/<this>. Don't change it after publishing." },
        }),
        summary: fields.text({
          label: "Summary",
          description: "1-2 sentences shown on the Resources list and, unless you fill in SEO below, in Google results.",
          multiline: true,
          validation: { length: { min: 50, max: 300 } },
        }),
        cover: fields.image({
          label: "Cover image",
          description: "Shown on the Resources list, at the top of the post and when shared. Landscape, about 1200 x 630 px.",
          directory: "public/blog",
          publicPath: "/blog/",
        }),
        coverAlt: fields.text({ label: "Cover image description", description: "Describe the image for screen readers and Google." }),
        date: fields.date({ label: "Published on" }),
        author: fields.text({ label: "Author", defaultValue: "NuvaLyf team" }),
        category: fields.select({
          label: "Category",
          defaultValue: "guides",
          options: [
            { label: "Guides", value: "guides" },
            { label: "Product updates", value: "product" },
            { label: "Clinic operations", value: "operations" },
            { label: "News", value: "news" },
          ],
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          description: "A few topics, e.g. EMR, queue, dental. Posts sharing a tag are linked as related reading.",
          itemLabel: (p) => p.value || "Tag",
        }),
        seo: fields.object(
          {
            title: fields.text({
              label: "Search title",
              description: "Optional. The blue link in Google. Up to 60 characters. Empty = the post title.",
              validation: { length: { max: 60 } },
            }),
            description: fields.text({
              label: "Search description",
              description: "Optional. The grey text under the link in Google. 120-160 characters, end with a reason to click.",
              multiline: true,
              validation: { length: { max: 160 } },
            }),
          },
          { label: "SEO (Google search)" },
        ),
        draft: fields.checkbox({ label: "Draft (hidden from the site)", description: "Keep this ticked until the post is approved.", defaultValue: false }),
        content: fields.markdoc({
          label: "Content",
          options: { image: { directory: "public/blog/images", publicPath: "/blog/images/" } },
        }),
      },
    }),
    jobs: collection({
      label: "Open roles",
      slugField: "title",
      columns: ["team", "type", "open"],
      path: "content/jobs/*",
      format: { data: "yaml" },
      schema: {
        title: fields.slug({ name: { label: "Role title" } }),
        team: fields.text({ label: "Team" }),
        location: fields.text({ label: "Location" }),
        type: fields.select({
          label: "Type",
          defaultValue: "full-time",
          options: [
            { label: "Full-time", value: "full-time" },
            { label: "Internship", value: "internship" },
            { label: "Contract", value: "contract" },
          ],
        }),
        summary: fields.text({ label: "Summary", multiline: true }),
        open: fields.checkbox({ label: "Accepting applications", defaultValue: true }),
      },
    }),
    testimonials: collection({
      label: "Testimonials (only with permission)",
      slugField: "name",
      path: "content/testimonials/*",
      format: { data: "yaml" },
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        role: fields.text({ label: "Role and clinic" }),
        quote: fields.text({ label: "Quote", multiline: true }),
      },
    }),
    clients: collection({
      label: "Clients & partners (only with permission)",
      slugField: "name",
      path: "content/clients/*",
      format: { data: "yaml" },
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        logo: fields.image({ label: "Logo", directory: "public/clients", publicPath: "/clients/" }),
        url: fields.url({ label: "Website" }),
      },
    }),
  },
});
