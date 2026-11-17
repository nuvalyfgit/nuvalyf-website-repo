import {
  Activity, BarChart3, BellRing, CalendarDays, ClipboardList, FileText, HeartPulse, ListOrdered,
  MessagesSquare, Pill, ShieldCheck, Stethoscope, UserCog, UsersRound,
} from "lucide-react";
import type { IconCard } from "@/components/page-parts";

/** The 14 product modules from the brief, grouped for the Products page. */
export const moduleGroups: { title: string; text: string; items: IconCard[] }[] = [
  {
    title: "Clinical",
    text: "Everything the doctor needs during the consultation.",
    items: [
      { Icon: HeartPulse, title: "Electronic Medical Records", text: "Vitals, diagnoses, notes, allergies and structured consultation history in one record.", points: ["Prominent allergies and conditions", "Templates for faster notes", "Finalised records with traceable amendments"] },
      { Icon: FileText, title: "Digital Prescriptions", text: "Professional prescriptions with clear dosage instructions and a printable PDF.", points: ["Medicine search with free-text fallback", "Allergy and duplicate warnings", "Preview before finalising"] },
      { Icon: ClipboardList, title: "Patient History & Records", text: "Previous visits, reports, scans and prescriptions connected to the right patient.", points: ["Clinical timeline", "Private document storage", "Original-file export"] },
      { Icon: Stethoscope, title: "Doctor Panel", text: "A focused workspace showing today's queue, the current patient and their context.", points: ["Next patient at a glance", "One-click history", "Prescribe and close the visit"] },
    ],
  },
  {
    title: "Front desk",
    text: "Smooth arrivals, fewer calls and a calm waiting room.",
    items: [
      { Icon: UsersRound, title: "Patient Management", text: "Registration with duplicate checks and search by mobile number or name.", points: ["Fast registration", "Duplicate detection", "Family members linked"] },
      { Icon: CalendarDays, title: "Appointment Management", text: "Bookings, walk-ins, follow-ups and appointment status from one view.", points: ["Scheduled and walk-in visits", "Status tracking", "Reschedule and cancel"] },
      { Icon: ListOrdered, title: "Queue Management", text: "A live, reorderable queue that keeps reception and doctors aligned.", points: ["Live status", "Reordering", "Ready for DocConnect live tracking"] },
      { Icon: UserCog, title: "Receptionist Panel", text: "One screen for registration, check-in, queue, billing and patient calls.", points: ["Check-in in seconds", "Billing at the desk", "Today's schedule"] },
      { Icon: BellRing, title: "Follow-up Management", text: "Schedule the next visit at billing and remind patients before it.", points: ["Follow-up dates on the record", "Reminders", "Missed follow-up lists"] },
    ],
  },
  {
    title: "Operations",
    text: "Visibility and control for clinic owners and administrators.",
    items: [
      { Icon: Activity, title: "Doctor Management", text: "Doctor profiles, schedules, consultation fees and availability.", points: ["Working hours and leave", "Fees per doctor", "Multi-doctor clinics"] },
      { Icon: Pill, title: "Pharmacy Inventory Management", text: "Track medicine stock, batches and expiry alongside prescriptions.", points: ["Stock levels", "Batch and expiry tracking", "Low-stock alerts"] },
      { Icon: MessagesSquare, title: "Hospital Communication", text: "Reminders, follow-ups and patient replies through official business channels.", points: ["Appointment reminders", "Prescription sharing", "Consent and opt-out"] },
      { Icon: BarChart3, title: "Reports & Analytics", text: "Visits, appointments, collections and clinic activity at a glance.", points: ["Daily and monthly views", "Collections", "CSV / Excel export"] },
      { Icon: ShieldCheck, title: "Role-Based Access Control", text: "Different permissions for doctors, receptionists, nurses and administrators.", points: ["Per-role permissions", "Clinic data separation", "Audit trail"] },
    ],
  },
];
