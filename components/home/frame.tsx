export const Frame = ({ title, tab, children }: { title: string; tab: string; children: React.ReactNode }) => (
  <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_1px_2px_rgba(15,23,42,.04),0_24px_48px_-24px_rgba(15,23,42,.25)]">
    <div className="flex items-center justify-between border-b border-[#EEF2F6] bg-[#F8FAFC] px-4 py-2.5 text-xs">
      <span className="font-semibold text-[#0B1120]">{title}</span>
      <span className="nv-mono rounded-md bg-white px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#64748B] ring-1 ring-[#E2E8F0]">{tab}</span>
    </div>
    <div className="p-4 text-sm text-[#0B1120]">{children}</div>
  </div>
);
export const Row = ({ a, b, c, on }: { a: string; b: string; c?: string; on?: boolean }) => (
  <div className={`flex items-center justify-between rounded-lg px-3 py-2.5 ${on ? "bg-[#F0FDFA] ring-1 ring-[#99F6E4]" : "border-b border-[#F1F5F9]"}`}>
    <span className="font-medium">{a}</span>
    <span className="text-[#64748B]">{b}</span>
    {c && <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${on ? "bg-[#0F766E] text-white" : "bg-[#F1F5F9] text-[#475569]"}`}>{c}</span>}
  </div>
);

