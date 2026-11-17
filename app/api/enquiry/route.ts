import { Resend } from "resend";
import { enquirySchema, type EnquiryFieldErrors, type EnquiryResponse } from "@/lib/enquiry";
import { rateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

const json = (body: EnquiryResponse, status: number) => Response.json(body, { status });
const esc = (v: string) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const labels: [string, string][] = [
  ["fullName", "Name"], ["email", "Email"], ["phone", "Phone"], ["organisation", "Organisation"],
  ["role", "Role"], ["size", "Size"], ["city", "City"], ["topic", "Topic"], ["message", "Message"],
];

export async function POST(request: Request) {
  if (rateLimited(request, "enquiry")) return json({ ok: false, message: "Too many requests. Please try again in a few minutes." }, 429);

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, message: "Invalid request body." }, 400);
  }

  const parsed = enquirySchema.safeParse(payload);
  if (!parsed.success) {
    return json({ ok: false, message: "Please check the highlighted fields and try again.", fieldErrors: parsed.error.flatten().fieldErrors as EnquiryFieldErrors }, 400);
  }
  const e = parsed.data;
  if (e.website) return json({ ok: true }, 200); // honeypot: pretend success

  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL_TO;
  if (!key || !to) {
    console.error("[enquiry] RESEND_API_KEY / NOTIFY_EMAIL_TO not set.");
    return json({ ok: false, message: "The form is not configured yet. Please email business@nuvalyf.com directly." }, 503);
  }

  const subject = e.kind === "hospital" ? `Hospital/clinic enquiry: ${e.organisation}` : `Website enquiry${e.topic ? ` (${e.topic})` : ""}: ${e.fullName}`;
  const rows = labels
    .map(([k, l]) => [l, String(e[k as keyof typeof e] ?? "").trim()])
    .filter(([, v]) => v)
    .map(([l, v]) => `<tr><td style="padding:6px 12px;color:#64748B">${l}</td><td style="padding:6px 12px;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join("");

  try {
    const { error } = await new Resend(key).emails.send({
      from: process.env.NOTIFY_EMAIL_FROM || "NuvaLyf Website <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      replyTo: e.email,
      subject,
      html: `<h2 style="font-family:sans-serif;color:#0F172A">${esc(subject)}</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
    });
    if (error) throw error;
  } catch (err) {
    console.error("[enquiry] email failed:", err);
    return json({ ok: false, message: "We could not send your message right now. Please email business@nuvalyf.com." }, 502);
  }
  return json({ ok: true }, 200);
}
