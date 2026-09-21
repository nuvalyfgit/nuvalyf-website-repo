/**
 * NUVA LYF — demo request collector.
 *
 * Paste this into the Apps Script editor of the Google Sheet that should
 * receive demo requests (Extensions -> Apps Script), then deploy it as a
 * Web App. Full setup steps are in README.md.
 *
 * Before deploying, set a shared secret:
 *   Project Settings -> Script Properties -> add `WEBHOOK_SECRET`
 * and use the same value for the site's SHEETS_WEBHOOK_SECRET env var.
 */

var SHEET_NAME = 'Demo Requests';

var HEADERS = [
  'Submitted At',
  'Full Name',
  'Work Email',
  'Mobile',
  'Clinic / Organisation',
  'City',
  'State',
  'Medical Specialty',
  'Number of Doctors',
  'Message',
];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, error: 'Empty request body.' });
    }

    var body = JSON.parse(e.postData.contents);

    var expectedSecret =
      PropertiesService.getScriptProperties().getProperty('WEBHOOK_SECRET') || '';
    if (expectedSecret && body.secret !== expectedSecret) {
      return jsonResponse({ ok: false, error: 'Unauthorized.' });
    }

    appendRow(body);
    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error && error.message ? error.message : error) });
  }
}

function appendRow(body) {
  // A lock stops two simultaneous submissions from writing the same row.
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sheet = getSheet();
    sheet.appendRow([
      body.submittedAt || new Date().toISOString(),
      body.fullName || '',
      body.email || '',
      body.mobile || '',
      body.clinic || '',
      body.city || '',
      body.state || '',
      body.specialty || '',
      body.doctors || '',
      body.message || '',
    ]);
  } finally {
    lock.releaseLock();
  }
}

function getSheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/**
 * Optional: run this once from the editor to confirm the sheet and headers
 * are created correctly before wiring up the website.
 */
function testAppend() {
  appendRow({
    submittedAt: new Date().toISOString(),
    fullName: 'Test Doctor',
    email: 'test@example.com',
    mobile: '+91 90000 00000',
    clinic: 'Test Clinic',
    city: 'Bengaluru',
    state: 'Karnataka',
    specialty: 'General Medicine',
    doctors: '2–5',
    message: 'This is a test row. Delete it once setup is verified.',
  });
}
