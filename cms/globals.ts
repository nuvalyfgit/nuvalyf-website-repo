import type { GlobalConfig } from "payload";
import { revalidatePath } from "next/cache";

/** Site-wide content appears on many pages, so refresh them all. */
const hooks = {
  afterChange: [
    ({ doc }: { doc: unknown }) => {
      try {
        revalidatePath("/", "layout");
      } catch {
        /* not running inside Next.js */
      }
      return doc;
    },
  ],
};

const read = () => true;
const update = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);

export const Settings: GlobalConfig = {
  slug: "settings",
  hooks,
  label: "Site settings",
  admin: { group: "Website content" },
  access: { read, update },
  fields: [
    { name: "launchDate", type: "date", label: "DocConnect launch date and time (India time)", admin: { date: { pickerAppearance: "dayAndTime" } } },
    {
      name: "social",
      type: "group",
      label: "Company social links",
      admin: { description: "Leave empty to hide an icon." },
      fields: ["linkedin", "instagram", "x", "youtube", "facebook"].map((name) => ({ name, type: "text" as const })),
    },
  ],
};

const qa = (name: string, label: string) => ({
  name,
  label,
  type: "array" as const,
  labels: { singular: "Question", plural: "Questions" },
  fields: [
    { name: "question", type: "text" as const, required: true, minLength: 5 },
    { name: "answer", type: "textarea" as const, required: true, minLength: 10 },
  ],
});

export const Faq: GlobalConfig = {
  slug: "faq",
  hooks,
  label: "FAQ",
  admin: { group: "Website content", description: "Questions shown on the site. Google can show them in search results." },
  access: { read, update },
  fields: [qa("clinic", "For clinics and doctors"), qa("patient", "For patients")],
};

export const Stats: GlobalConfig = {
  slug: "stats",
  hooks,
  label: "Company statistics",
  admin: { group: "Website content", description: "Only real, verifiable numbers." },
  access: { read, update },
  fields: [
    { name: "clinics", type: "number", defaultValue: 50, label: "Clinics onboarded" },
    { name: "countries", type: "number", defaultValue: 2, label: "Countries live" },
    { name: "teamSize", type: "number", label: "Team strength (leave empty to hide)" },
    { name: "patientsServed", type: "number", label: "Patients served (homepage counter)", admin: { description: "A real, checked figure from the EMR. Leave empty to hide the counter." } },
    { name: "patientsServedPeriod", type: "text", label: "Counter period", defaultValue: "this month", admin: { description: "Shown after the number, e.g. this month, or since 2024." } },
    { name: "extra", type: "array", fields: [{ name: "value", type: "text", required: true }, { name: "label", type: "text", required: true }] },
  ],
};

export const Milestones: GlobalConfig = {
  slug: "milestones",
  hooks,
  admin: { group: "Website content" },
  access: { read, update },
  fields: [
    {
      name: "items",
      type: "array",
      fields: [
        { name: "when", type: "text" },
        { name: "title", type: "text", required: true },
        { name: "text", type: "textarea" },
      ],
    },
  ],
};
