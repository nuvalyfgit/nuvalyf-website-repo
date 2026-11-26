import { z } from "zod";

/**
 * Shared shape of a demo request. Used by the client form for pre-submit
 * validation and by the API route as the authoritative server-side check.
 */
export const demoRequestSchema = z.object({
  product: z.string().trim().max(60).optional().default(""),
  fullName: z.string().trim().min(2, "Please enter your full name.").max(120),
  // Optional: the brief asks for name, mobile, clinic and city only.
  email: z
    .string()
    .trim()
    .max(200)
    .refine((v) => v === "" || z.string().email().safeParse(v).success, "Please enter a valid email address.")
    .optional()
    .default(""),
  mobile: z
    .string()
    .trim()
    .min(7, "Please enter a valid mobile number.")
    .max(20)
    .regex(/^[+\d][\d\s()-]*$/, "Please enter a valid mobile number."),
  clinic: z.string().trim().min(2, "Please enter your clinic name.").max(160),
  city: z.string().trim().min(2, "Please enter your city.").max(80),
  state: z.string().trim().max(80).optional().default(""),
  specialty: z.string().trim().max(80).optional().default(""),
  doctors: z.string().trim().max(40).optional().default(""),
  preferredSlot: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
  // Spam trap. Real users never see this field, so any value means a bot.
  // Deliberately permissive: the API route checks it *after* validation so a
  // bot receives a normal success response instead of a hint to retry.
  website: z.string().trim().max(200).optional().default(""),
});

export type DemoRequest = z.infer<typeof demoRequestSchema>;

/** Field-level errors keyed by form field name, as returned by the API. */
export type DemoRequestFieldErrors = Partial<Record<keyof DemoRequest, string[]>>;

export type DemoRequestResponse =
  | { ok: true }
  | { ok: false; message: string; fieldErrors?: DemoRequestFieldErrors };
