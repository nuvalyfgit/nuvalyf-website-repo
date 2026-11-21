/** Per-specialty accent colour and a sample record card for the specialty page hero (illustrative data). */
export const specialtyStyle: Record<string, { accent: string; title: string; rows: [string, string][] }> = {
  "general-medicine": { accent: "#14B8A6", title: "OPD · Token 18", rows: [["Fever, 3 days", "Temp 100.4°F"], ["BP", "122/80"], ["Follow-up", "In 5 days"]] },
  pediatrics: { accent: "#F59E0B", title: "Aarav, 4 yrs", rows: [["Weight", "16.8 kg"], ["Next vaccine", "MMR booster"], ["Dose note", "Weight-based syrup"]] },
  gynecology: { accent: "#EC4899", title: "Antenatal visit · Week 24", rows: [["Scan", "Report attached"], ["BP", "118/76"], ["Next review", "In 4 weeks"]] },
  dermatology: { accent: "#A855F7", title: "Acne plan · Session 3 of 6", rows: [["Photos", "Before and after"], ["Topical", "Repeat Rx"], ["Next session", "In 2 weeks"]] },
  orthopedics: { accent: "#3B82F6", title: "Knee review", rows: [["X-ray", "Attached"], ["Physio", "6 sessions"], ["Recovery check", "In 3 weeks"]] },
  ent: { accent: "#06B6D4", title: "ENT · Token 9", rows: [["Audiogram", "Attached"], ["Finding", "Template used"], ["Review", "In 1 week"]] },
  diabetology: { accent: "#22C55E", title: "HbA1c trend", rows: [["Last 3 tests", "8.1 → 7.4 → 6.9"], ["Fasting sugar", "112 mg/dL"], ["Review", "Every 3 months"]] },
  cardiology: { accent: "#EF4444", title: "Cardiac review", rows: [["Allergy", "Aspirin"], ["Echo", "Report attached"], ["Medicine check", "No duplicates"]] },
  dental: { accent: "#0EA5E9", title: "Root canal · Sitting 2 of 3", rows: [["Tooth", "36"], ["Billing", "Per procedure"], ["Next sitting", "Thu 4:30 PM"]] },
  ophthalmology: { accent: "#6366F1", title: "Eye test", rows: [["Refraction", "R -1.25 · L -1.00"], ["IOP", "Normal"], ["Post-op review", "Booked"]] },
  physiotherapy: { accent: "#F97316", title: "Rehab package", rows: [["Sessions", "4 of 10 done"], ["Progress", "Notes per session"], ["Next session", "Tomorrow 9 AM"]] },
  "specialty-clinics": { accent: "#10B981", title: "Multi-doctor clinic", rows: [["Doctors on duty", "4 live queues"], ["Access", "Role-based"], ["Export", "Any time"]] },
};
