import {
  demoRequestSchema,
  type DemoRequestFieldErrors,
  type DemoRequestResponse,
} from "@/lib/demo-request";
import { appendToSheet } from "@/lib/google-sheet";
import { sendNotificationEmail } from "@/lib/notify-email";

// Resend's SDK and the Apps Script call both need the Node.js runtime.
export const runtime = "nodejs";

function json(body: DemoRequestResponse, status: number): Response {
  return Response.json(body, { status });
}

export async function POST(request: Request): Promise<Response> {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, message: "Invalid request body." }, 400);
  }

  const parsed = demoRequestSchema.safeParse(payload);
  if (!parsed.success) {
    return json(
      {
        ok: false,
        message: "Please check the highlighted fields and try again.",
        fieldErrors: parsed.error.flatten().fieldErrors as DemoRequestFieldErrors,
      },
      400,
    );
  }

  const submission = parsed.data;

  // A bot filled the hidden field. Return success so it does not retry, but
  // deliver nothing.
  if (submission.website) {
    return json({ ok: true }, 200);
  }

  const sheetConfigured = Boolean(process.env.SHEETS_WEBHOOK_URL);
  const emailConfigured = Boolean(
    process.env.RESEND_API_KEY && process.env.NOTIFY_EMAIL_TO,
  );

  if (!sheetConfigured && !emailConfigured) {
    console.error(
      "[demo-request] No delivery channel configured. Set SHEETS_WEBHOOK_URL and/or RESEND_API_KEY + NOTIFY_EMAIL_TO.",
    );
    return json(
      {
        ok: false,
        message:
          "The demo form is not configured yet. Please contact us directly in the meantime.",
      },
      503,
    );
  }

  const submittedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Run both channels regardless of each other's outcome so one broken
  // integration never costs a lead.
  const [sheetResult, emailResult] = await Promise.allSettled([
    sheetConfigured ? appendToSheet(submission, submittedAt) : Promise.resolve(),
    emailConfigured
      ? sendNotificationEmail(submission, submittedAt)
      : Promise.resolve(),
  ]);

  if (sheetResult.status === "rejected") {
    console.error("[demo-request] Sheet append failed:", sheetResult.reason);
  }
  if (emailResult.status === "rejected") {
    console.error("[demo-request] Notification email failed:", emailResult.reason);
  }

  const captured =
    (sheetConfigured && sheetResult.status === "fulfilled") ||
    (emailConfigured && emailResult.status === "fulfilled");

  if (!captured) {
    return json(
      {
        ok: false,
        message:
          "We could not submit your request right now. Please try again or contact us directly.",
      },
      502,
    );
  }

  return json({ ok: true }, 200);
}
