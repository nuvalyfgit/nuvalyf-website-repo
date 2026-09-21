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

/**
 * Bento spans over a 6-column desktop grid. A uniform 5-across grid gave all
 * ten capabilities identical weight; this gives the patient record - the thing
 * everything else hangs off - the anchor cell, and lets the rest breathe.
 *
 *   row 1  [ 0 (2x2) ][ 1 (2) ][ 2 (2) ]
 *   row 2  [ 0 cont. ][ 3 (2) ][ 4 (2) ]
 *   row 3  [ 5 (2) ][ 6 (2) ][ 7 (2) ]
 *   row 4  [ 8 (3) ][ 9 (3) ]
 */
const spans = [
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative bg-[#f9fcfb] py-24 sm:py-32">
      <div className="site-container">
        <SectionHeading
          eyebrow="One connected platform"
          title="Everything your clinic needs. Connected."
          description="NUVA LYF connects clinical and administrative workflows so doctors and clinic teams can manage everyday operations from one calm, organised platform."
          align="center"
        />

        <div className="reveal-stagger mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-6">
          {features.map((feature, index) => {
            const Icon = icons[feature.icon as keyof typeof icons];
            const anchor = index === 0;

            return (
              <article
                key={feature.title}
                className={`card-lift group relative flex flex-col overflow-hidden rounded-[26px] border border-[#e1ebe9] p-6 ${spans[index]} ${
                  anchor
                    ? "bg-[linear-gradient(160deg,#0b1535_0%,#0f2b3a_58%,#084b45_100%)] sm:p-8"
                    : "bg-white"
                }`}
              >
                {anchor && (
                  <>
                    <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#39dbc0]/18 blur-3xl" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#39dbc0]/50 to-transparent" />
                  </>
                )}

                <div
                  className={`grid place-items-center rounded-2xl transition duration-300 ${
                    anchor
                      ? "h-14 w-14 bg-white/10 text-[#39dbc0]"
                      : "h-11 w-11 bg-[#e4f6f2] text-[#0b6b63] group-hover:bg-[#0b6b63] group-hover:text-white"
                  }`}
                >
                  <Icon className={anchor ? "h-6 w-6" : "h-5 w-5"} />
                </div>

                <h3
                  className={`font-display font-semibold tracking-[-0.02em] ${
                    anchor ? "mt-8 text-[1.75rem] leading-tight text-white" : "mt-6 text-[1.05rem] text-[#0b1535]"
                  }`}
                >
                  {feature.title}
                </h3>

                <p className={`mt-3 leading-7 ${anchor ? "text-[15px] text-white/75" : "text-sm text-[#647383]"}`}>
                  {feature.description}
                </p>

                {anchor && (
                  <span className="mt-auto pt-8 text-xs font-bold uppercase tracking-[0.18em] text-[#39dbc0]">
                    The record everything connects to
                  </span>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
