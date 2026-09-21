export const navigation = [
  { label: "Platform", href: "#platform" },
  { label: "Features", href: "#features" },
  { label: "Solutions", href: "#solutions" },
  { label: "Security", href: "#security" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
];

export const features = [
  { icon: "users", title: "Patient Management", description: "Registration, duplicate checks, medical history and one clear patient record." },
  { icon: "calendar", title: "Appointments", description: "Manage bookings, walk-ins, follow-ups and appointment status from one view." },
  { icon: "queue", title: "Live Queue", description: "Keep reception and doctors aligned with a clear, reorderable patient queue." },
  { icon: "clinical", title: "Clinical EMR", description: "Capture vitals, diagnoses, notes, allergies and structured consultation history." },
  { icon: "prescription", title: "Digital Prescriptions", description: "Create professional prescriptions with dosage guidance, preview and PDF export." },
  { icon: "documents", title: "Documents & Reports", description: "Store patient reports, scans, attachments and prescriptions with controlled access." },
  { icon: "billing", title: "Clinic Billing", description: "Create invoices, record payments and connect collections to patient visits." },
  { icon: "message", title: "Patient Communication", description: "Support reminders, follow-ups and official WhatsApp communication workflows." },
  { icon: "analytics", title: "Reports Dashboard", description: "Understand patient visits, appointments, collections and clinic activity." },
  { icon: "database", title: "Data Control", description: "Import clinic data and export patient records with original documents included." },
];

export const journey = [
  "Registration",
  "Appointment / Walk-in",
  "Live Queue",
  "Consultation",
  "Prescription",
  "Billing",
  "Communication",
  "Follow-up",
];

export const platformTabs = [
  {
    value: "patient",
    label: "Patient",
    eyebrow: "Patient management",
    title: "Every patient record. One clear view.",
    description: "Give authorised clinic teams a complete, organised patient view without searching across disconnected files.",
    bullets: ["Registration and duplicate checking", "Search by mobile number or name", "Medical history, allergies and conditions", "Previous consultations and uploaded records"],
    visual: "patient",
  },
  {
    value: "front-desk",
    label: "Front Desk",
    eyebrow: "Appointments & live queue",
    title: "Keep your clinic moving.",
    description: "Help reception teams move from arrival to consultation with less confusion and clearer status tracking.",
    bullets: ["Scheduled appointments and walk-ins", "Live queue and status management", "Queue reordering", "Follow-up scheduling"],
    visual: "queue",
  },
  {
    value: "clinical",
    label: "Clinical EMR",
    eyebrow: "Designed around the doctor",
    title: "Clinical context, ready when it matters.",
    description: "Bring allergies, vitals, notes, diagnoses, templates and prior visits into a fast consultation workflow.",
    bullets: ["Patient summary with prominent allergies", "Vitals and consultation notes", "Diagnoses and structured templates", "Finalised records with traceable amendments"],
    visual: "clinical",
  },
  {
    value: "prescription",
    label: "Prescriptions",
    eyebrow: "Digital prescribing",
    title: "Prescribing made simple.",
    description: "Create consistent prescriptions with clear dosage instructions and a professional printable PDF.",
    bullets: ["Medicine search and free-text fallback", "Allergy and duplicate medicine warnings", "Preview before finalising", "Doctor details, registration and signature block"],
    visual: "prescription",
  },
  {
    value: "documents",
    label: "Documents",
    eyebrow: "Documents & reports",
    title: "Clinical documents where you need them.",
    description: "Keep reports, scans, attachments and prescription PDFs connected to the correct patient record.",
    bullets: ["Private patient documents", "Controlled staff access", "Secure share-link workflows", "Original file export"],
    visual: "documents",
  },
  {
    value: "communication",
    label: "Communication",
    eyebrow: "Connected patient communication",
    title: "Stay connected beyond the consultation.",
    description: "Bring reminders and patient replies into the clinic workflow using official business communication channels.",
    bullets: ["Appointment and follow-up reminders", "Prescription sharing", "Shared clinic inbox and patient replies", "Consent and opt-out management"],
    visual: "communication",
  },
  {
    value: "operations",
    label: "Operations",
    eyebrow: "Billing, reporting & data",
    title: "See the clinic clearly.",
    description: "Connect everyday billing, operational reporting and data portability without pretending to be a full accounting system.",
    bullets: ["Invoices and payment records", "Visits, appointments and collections", "CSV / Excel import with validation", "Owner-authorised clinic export"],
    visual: "operations",
  },
];

export const securityFeatures = [
  { title: "Role-Based Access", description: "Different permissions for doctors, receptionists, nurses, administrators and authorised users." },
  { title: "Clinic Data Separation", description: "Clinic information is logically separated to prevent inappropriate access between organisations." },
  { title: "Audit Trail", description: "Important system activities can be recorded for accountability and traceability." },
  { title: "Clinical Record Integrity", description: "Finalised information is protected from silent overwrites; corrections remain traceable." },
  { title: "Secure Documents", description: "Patient documents and reports are protected through controlled access and private storage." },
  { title: "Secure Authentication", description: "Strong authentication, controlled sessions and appropriate permissions protect access." },
  { title: "Data Protection", description: "Encryption and secure transport are considered across the platform architecture." },
  { title: "Backup & Recovery", description: "Documented backup and restore processes support operational resilience." },
];

export const personas = [
  { title: "For Doctors", description: "Fast access to patient context, clinical notes, history, allergies and prescriptions." },
  { title: "For Clinic Owners", description: "Better visibility across staff, operations, billing, reports and clinic data." },
  { title: "For Front Desk Teams", description: "Clear registration, appointment, queue, billing and communication workflows." },
  { title: "For Multi-Doctor Clinics", description: "Centralised patient management with role-based staff access and coordination." },
  { title: "For Growing Clinic Groups", description: "Structured operations, controlled information and scalable clinic technology." },
];

export const specialties = [
  "General Medicine", "Pediatrics", "Gynecology", "Dermatology", "Orthopedics", "ENT",
  "Diabetology", "Cardiology", "Dental", "Ophthalmology", "Physiotherapy", "Specialty Clinics",
];

export const differentiators = [
  { title: "Connected Clinic Workflow", description: "Bring clinical and operational activities together." },
  { title: "Doctor-Friendly Experience", description: "Reduce unnecessary complexity in everyday care." },
  { title: "Security by Design", description: "Build controlled access, separation and traceability into the foundation." },
  { title: "Connected Communication", description: "Support clinic-patient communication alongside clinical work." },
  { title: "Clinic Data Control", description: "Keep clinic information accessible and exportable." },
];
