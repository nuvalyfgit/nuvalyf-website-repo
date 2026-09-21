import type { DemoRequest } from "@/lib/demo-request";

/**
 * Appends a demo request as a row in Google Sheets.
 *
 * Rather than talking to the Sheets API directly (which needs a Google Cloud
 * project and a service-account private key), we POST to a Google Apps Script
 * Web App bound to the target spreadsheet. See `docs/google-apps-script.gs`
 * for the script to deploy and README.md for the setup steps.
 */
export async function appendToSheet(
  submission: DemoRequest,
  submittedAt: string,
): Promise<void> {
  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) {
    throw new Error("SHEETS_WEBHOOK_URL is not set.");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Apps Script responds 302 to its script.googleusercontent.com host; the
    // default redirect follow is what actually delivers the JSON result.
    redirect: "follow",
    body: JSON.stringify({
      secret: process.env.SHEETS_WEBHOOK_SECRET ?? "",
      submittedAt,
      fullName: submission.fullName,
      email: submission.email,
      mobile: submission.mobile,
      clinic: submission.clinic,
      city: submission.city,
      state: submission.state,
      specialty: submission.specialty,
      doctors: submission.doctors,
      message: submission.message,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  const body = await response.text();

  if (!response.ok) {
    throw new Error(
      `Apps Script responded ${response.status}: ${body.slice(0, 300)}`,
    );
  }

  // Apps Script returns HTTP 200 even when the script itself throws, so the
  // response body is the only reliable success signal.
  let result: { ok?: boolean; error?: string };
  try {
    result = JSON.parse(body) as { ok?: boolean; error?: string };
  } catch {
    throw new Error(
      `Apps Script returned a non-JSON response (check that the Web App is deployed with access "Anyone"): ${body.slice(0, 300)}`,
    );
  }

  if (!result.ok) {
    throw new Error(`Apps Script rejected the row: ${result.error ?? "unknown error"}`);
  }
}
