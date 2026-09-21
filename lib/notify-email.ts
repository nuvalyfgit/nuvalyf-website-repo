import { Resend } from "resend";

import type { DemoRequest } from "@/lib/demo-request";

const FIELD_LABELS: Array<[keyof DemoRequest, string]> = [
  ["fullName", "Full name"],
  ["email", "Work email"],
  ["mobile", "Mobile"],
  ["clinic", "Clinic / organisation"],
  ["city", "City"],
  ["state", "State"],
  ["specialty", "Medical specialty"],
  ["doctors", "Number of doctors"],
  ["message", "Message"],
];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(submission: DemoRequest, submittedAt: string): string {
  const rows = FIELD_LABELS.map(([key, label]) => {
    const value = String(submission[key] ?? "").trim() || "—";
    return `<tr>
      <td style="padding:10px 16px;border-bottom:1px solid #e4edeb;font:600 13px system-ui,sans-serif;color:#60717e;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 16px;border-bottom:1px solid #e4edeb;font:400 14px system-ui,sans-serif;color:#0b1535;">${escapeHtml(value).replace(/\n/g, "<br>")}</td>
    </tr>`;
  }).join("");

  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f2f8f7;">
  <table role="presentation" style="width:100%;max-width:640px;margin:0 auto;border-collapse:collapse;background:#ffffff;border:1px solid #dce7e5;border-radius:16px;overflow:hidden;">
    <tr><td style="padding:24px 16px;background:#0b6b63;">
      <p style="margin:0;font:700 18px system-ui,sans-serif;color:#ffffff;">New demo request</p>
      <p style="margin:6px 0 0;font:400 13px system-ui,sans-serif;color:#c7e8e3;">NUVA LYF website &middot; ${escapeHtml(submittedAt)}</p>
    </td></tr>
    <tr><td style="padding:8px 0;"><table role="presentation" style="width:100%;border-collapse:collapse;">${rows}</table></td></tr>
    <tr><td style="padding:16px;background:#f7fbfa;">
      <a href="mailto:${encodeURIComponent(submission.email)}" style="font:600 14px system-ui,sans-serif;color:#0b6b63;">Reply to ${escapeHtml(submission.fullName)}</a>
    </td></tr>
  </table>
</body></html>`;
}

function buildText(submission: DemoRequest, submittedAt: string): string {
  const lines = FIELD_LABELS.map(
    ([key, label]) => `${label}: ${String(submission[key] ?? "").trim() || "—"}`,
  );
  return [`New demo request — NUVA LYF website`, submittedAt, "", ...lines].join("\n");
}

/** Emails the demo request to the configured inbox via Resend. */
export async function sendNotificationEmail(
  submission: DemoRequest,
  submittedAt: string,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL_TO;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set.");
  if (!to) throw new Error("NOTIFY_EMAIL_TO is not set.");

  // Resend's shared sender works without a verified domain, which keeps the
  // form usable before DNS is configured.
  const from = process.env.NOTIFY_EMAIL_FROM ?? "NUVA LYF <onboarding@resend.dev>";

  const { error } = await new Resend(apiKey).emails.send({
    from,
    to: to.split(",").map((address) => address.trim()).filter(Boolean),
    replyTo: submission.email,
    subject: `New demo request — ${submission.fullName} (${submission.clinic})`,
    html: buildHtml(submission, submittedAt),
    text: buildText(submission, submittedAt),
  });

  if (error) {
    throw new Error(`Resend rejected the email: ${error.name}: ${error.message}`);
  }
}
