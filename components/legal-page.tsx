import { PageShell } from "@/components/page-shell";
import { contact } from "@/data/site-content";

export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: [string, string][] }) {
  return (
    <PageShell>
      <section className="bg-white py-20 sm:py-28">
        <div className="site-container max-w-3xl">
          <p className="t-eyebrow text-[#047857]">Legal</p>
          <h1 className="t-h2 mt-4 font-display text-[#0F172A]">{title}</h1>
          <p className="mt-3 text-sm text-[#64748B]">Last updated {updated}</p>
          <div className="mt-12 space-y-10">
            {sections.map(([h, body]) => (
              <div key={h}>
                <h2 className="text-lg font-bold text-[#0F172A]">{h}</h2>
                <p className="mt-3 text-[15px] leading-7 text-[#475569]">{body}</p>
              </div>
            ))}
            <div>
              <h2 className="text-lg font-bold text-[#0F172A]">Contact</h2>
              <p className="mt-3 text-[15px] leading-7 text-[#475569]">
                Questions about this page: <a className="font-semibold text-[#059669] underline" href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
