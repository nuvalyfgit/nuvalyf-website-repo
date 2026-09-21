import { Fingerprint, FolderLock, History, KeyRound, LockKeyhole, RefreshCw, ServerCog, ShieldCheck } from "lucide-react";
import { securityFeatures } from "@/data/site-content";
import { SectionHeading } from "@/components/section-heading";

const icons = [KeyRound, ServerCog, History, RefreshCw, FolderLock, Fingerprint, ShieldCheck, LockKeyhole];

export function SecuritySection() {
  return (
    <section id="security" className="section-space bg-white">
      <div className="site-container">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_.7fr]">
          <SectionHeading eyebrow="Trust is foundational" title="Security built into every workflow." description="Patient information deserves careful handling. NUVA LYF’s architecture is designed around controlled access, clinic-level separation, traceability and resilient operations." />
          <div className="rounded-2xl border border-[#cfe4df] bg-[#f2faf8] p-5 text-sm leading-6 text-[#47615d]"><strong className="block text-[#0b1535]">Clear, responsible claims</strong>NUVA LYF does not claim certifications or regulatory approvals that have not been independently obtained and verified.</div>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {securityFeatures.map((item, index) => {
            const Icon = icons[index];
            return <article key={item.title} className="rounded-[22px] border border-[#dfe8e6] bg-white p-6"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#0b1535] text-[#39dbc0]"><Icon className="h-5 w-5"/></span><h3 className="mt-5 text-base font-bold text-[#0b1535]">{item.title}</h3><p className="mt-2 text-sm leading-6 text-[#647383]">{item.description}</p></article>;
          })}
        </div>
      </div>
    </section>
  );
}
