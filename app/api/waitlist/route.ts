import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({
  type: z.enum(["patient", "clinic"]),
  name: z.string().trim().max(120).optional().default(""),
  contact: z.string().trim().min(5, "Enter a phone number or email.").max(200),
  city: z.string().trim().max(80).optional().default(""),
  clinic: z.string().trim().max(160).optional().default(""),
  website: z.string().trim().max(200).optional().default(""), // spam trap
});

const esc = (v: string) => v.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/** DocConnect early-access sign-ups. Delivered by email through Resend, like demo requests. */
export async function POST(request: Request): Promise<Response> {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ ok: false, message: parsed.error.issues[0]?.message ?? "Check your details." }, { status: 400 });
  }
  const s = parsed.data;
  if (s.website) return Response.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL_TO;
  if (!apiKey || !to) {
    console.error("[waitlist] RESEND_API_KEY / NOTIFY_EMAIL_TO not set.");
    return Response.json({ ok: false, message: "Sign-ups aren't open yet. Please message us on WhatsApp." }, { status: 503 });
  }

  const label = s.type === "clinic" ? "Founding clinic" : "Patient";
  const rows: [string, string][] = [["Type", label], ["Name", s.name], ["Phone / email", s.contact], ["City", s.city], ["Clinic", s.clinic]];
  const at = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });

  const { error } = await new Resend(apiKey).emails.send({
    from: process.env.NOTIFY_EMAIL_FROM ?? "NuvaLyf <onboarding@resend.dev>",
    to: to.split(",").map((a) => a.trim()).filter(Boolean),
    subject: `DocConnect early access — ${label}: ${s.name || s.contact}`,
    html: `<h2 style="font-family:system-ui">DocConnect early access</h2><p style="font-family:system-ui;color:#647383">${esc(at)}</p><table style="font-family:system-ui;border-collapse:collapse">${rows
      .filter(([, v]) => v)
      .map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;color:#647383">${k}</td><td style="padding:6px 0">${esc(v)}</td></tr>`)
      .join("")}</table>`,
    text: [`DocConnect early access`, at, "", ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`)].join("\n"),
  });

  if (error) {
    console.error("[waitlist] Resend error:", error);
    return Response.json({ ok: false, message: "Couldn't save your spot. Please try again." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
