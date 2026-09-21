import { z } from "zod";

/**
 * Shared shape of a demo request. Used by the client form for pre-submit
 * validation and by the API route as the authoritative server-side check.
 */
export const demoRequestSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(120),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your work email.")
    .max(200)
    .email("Please enter a valid email address."),
  mobile: z
    .string()
    .trim()
    .min(7, "Please enter a valid mobile number.")
    .max(20)
    .regex(/^[+\d][\d\s()-]*$/, "Please enter a valid mobile number."),
  clinic: z.string().trim().min(2, "Please enter your clinic name.").max(160),
  city: z.string().trim().min(2, "Please enter your city.").max(80),
  state: z.string().trim().min(2, "Please enter your state.").max(80),
  specialty: z.string().trim().min(1, "Please select a medical specialty.").max(80),
  doctors: z.string().trim().min(1, "Please select the number of doctors.").max(40),
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
