import { z } from "zod";

/** Contact and hospital/clinic enquiry forms share one schema. */
export const enquirySchema = z
  .object({
    kind: z.enum(["contact", "hospital"]),
    fullName: z.string().trim().min(2, "Please enter your full name.").max(120),
    email: z.string().trim().min(1, "Please enter your email.").max(200).email("Please enter a valid email address."),
    phone: z.string().trim().max(20).regex(/^$|^[+\d][\d\s()-]{6,}$/, "Please enter a valid phone number.").optional().default(""),
    organisation: z.string().trim().max(160).optional().default(""),
    role: z.string().trim().max(80).optional().default(""),
    size: z.string().trim().max(40).optional().default(""),
    city: z.string().trim().max(80).optional().default(""),
    topic: z.string().trim().max(60).optional().default(""),
    message: z.string().trim().min(10, "Please tell us a little more (at least 10 characters).").max(3000),
    website: z.string().trim().max(200).optional().default(""),
  })
  .superRefine((v, ctx) => {
    if (v.kind === "hospital" && v.organisation.length < 2)
      ctx.addIssue({ code: "custom", path: ["organisation"], message: "Please enter your hospital or clinic name." });
    if (v.kind === "hospital" && v.phone.length < 7)
      ctx.addIssue({ code: "custom", path: ["phone"], message: "Please enter a phone number we can call." });
  });

export type Enquiry = z.infer<typeof enquirySchema>;
export type EnquiryFieldErrors = Partial<Record<keyof Enquiry, string[]>>;
export type EnquiryResponse = { ok: true } | { ok: false; message: string; fieldErrors?: EnquiryFieldErrors };
