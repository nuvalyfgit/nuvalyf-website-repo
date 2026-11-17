import { CountUp } from "@/components/reach-section";
import { getStats } from "@/lib/cms";

/** Verified company statistics, edited in the CMS (Company statistics). */
export async function StatsBand({ dark = false }: { dark?: boolean }) {
  const s = await getStats();
  const items: { node: React.ReactNode; label: string }[] = [
    { node: <CountUp value={s.clinics ?? 50} suffix="+" />, label: "Clinics onboarded" },
    { node: <CountUp value={s.countries ?? 2} duration={1200} />, label: "Countries live" },
    ...(s.teamSize ? [{ node: <CountUp value={s.teamSize} />, label: "Team members" }] : []),
    ...(s.extra ?? []).filter((e) => e.value && e.label).map((e) => ({ node: e.value, label: e.label })),
  ];
  return (
    <div className={`grid gap-px overflow-hidden rounded-[24px] ${dark ? "bg-white/10" : "border border-[#E2E8F0] bg-[#E2E8F0]"} sm:grid-cols-2 ${items.length > 2 ? "lg:grid-cols-4" : ""}`}>
      {items.map((i) => (
        <div key={i.label} className={`${dark ? "bg-[#0B1120]" : "bg-white"} p-8`}>
          <p className={`font-display text-5xl font-semibold ${dark ? "text-[#14B8A6]" : "text-[#059669]"}`}>{i.node}</p>
          <p className={`mt-2 text-sm font-medium ${dark ? "text-white/55" : "text-[#64748B]"}`}>{i.label}</p>
        </div>
      ))}
    </div>
  );
}
