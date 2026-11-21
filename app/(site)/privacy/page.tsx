import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

// DRAFT: to be reviewed by NuvaLyf's legal advisor before going live.
export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="November 2026"
      sections={[
        ["Who we are", "NuvaLyf provides clinic management (NuvaLyf EMR) and online patient booking (DocConnect) software to healthcare providers in India, the UAE and other regions."],
        ["Information we collect", "From this website: the details you enter in the demo form (name, email, phone, clinic, city, specialty and message). Inside our products: information that clinics and patients enter to provide care, such as appointments, clinical records and prescriptions."],
        ["How we use it", "Website information is used only to respond to your enquiry and arrange a demonstration. Clinical information is processed on behalf of the clinic, which remains responsible for its patients' records."],
        ["Sharing", "We do not sell personal information. We share it only with service providers that help us run the platform (for example hosting and email delivery), under contract, or when the law requires it."],
        ["Security and retention", "Data is protected with role-based access, clinic data separation, encryption in transit, audit trails and backups. We keep information only as long as needed for the purpose it was collected or as required by law."],
        ["Your rights", "You can ask to access, correct or delete your personal information. Patients should contact their clinic first for clinical records; we will support the clinic in responding."],
      ]}
    />
  );
}
