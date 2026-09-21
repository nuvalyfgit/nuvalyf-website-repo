import { BarChart3, CalendarDays, ClipboardList, CreditCard, Database, FileText, HeartPulse, ListOrdered, MessageSquareText, UsersRound } from "lucide-react";
import { features } from "@/data/site-content";
import { SectionHeading } from "@/components/section-heading";

const icons = {
  users: UsersRound,
  calendar: CalendarDays,
  queue: ListOrdered,
  clinical: HeartPulse,
  prescription: ClipboardList,
  documents: FileText,
  billing: CreditCard,
  message: MessageSquareText,
  analytics: BarChart3,
  database: Database,
};

export function FeaturesSection() {
  return (
    <section id="features" className="section-space bg-white">
      <div className="site-container">
        <SectionHeading eyebrow="One connected platform" title="Everything your clinic needs. Connected." description="NUVA LYF connects clinical and administrative workflows so doctors and clinic teams can manage everyday operations from one calm, organised platform." align="center" />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {features.map((feature, index) => {
            const Icon = icons[feature.icon as keyof typeof icons];
            return (
              <article key={feature.title} className={`group rounded-[22px] border border-[#dfe8e6] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#8fd5c9] hover:shadow-[0_20px_50px_rgba(13,75,69,0.08)] ${index === 0 || index === 8 ? "bg-[#f1faf8]" : "bg-white"}`}>
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#e4f6f2] text-[#0b6b63] transition group-hover:bg-[#0b6b63] group-hover:text-white"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-6 text-[1.05rem] font-bold text-[#0b1535]">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#647383]">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
