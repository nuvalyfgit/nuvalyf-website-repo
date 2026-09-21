import {
  CalendarCheck,
  ClipboardList,
  ListOrdered,
  MessageSquareText,
  Receipt,
  RefreshCw,
  Stethoscope,
  UserPlus,
} from "lucide-react";
import { journey } from "@/data/site-content";
import { SectionHeading } from "@/components/section-heading";

/** Decorative only - one mark per stage, in the order the journey is listed. */
const stageIcons = [
  UserPlus,
  CalendarCheck,
  ListOrdered,
  Stethoscope,
  ClipboardList,
  Receipt,
  MessageSquareText,
  RefreshCw,
];

/**
 * The thread.
 *
 * The product's claim is that the record stays connected from arrival to
 * follow-up, so the journey is drawn as one unbroken line rather than eight
 * separate cards. The line fills as you scroll, using a scroll-driven CSS
 * animation - no observers, no scroll listeners, no JavaScript at all.
 */
export function JourneySection() {
  return (
    <section className="relative overflow-hidden bg-[#070d24] py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(57,219,192,0.1),transparent_60%)]" />

      <div className="site-container relative">
        <SectionHeading
          eyebrow="Built around the patient journey"
          title="One smooth path from arrival to follow-up."
          description="NUVA LYF helps clinics manage the outpatient journey without relying on disconnected systems, paper notes or scattered tools."
          inverse
        />

        <ol className="relative mt-16 space-y-6 lg:mt-24 lg:space-y-2">
          {/* The rail the thread travels along. */}
          <div className="pointer-events-none absolute inset-y-0 left-5 w-px bg-white/8 lg:left-1/2 lg:-translate-x-1/2" aria-hidden="true" />
          <div className="thread thread-grow pointer-events-none absolute inset-y-0 left-5 w-px lg:left-1/2 lg:-translate-x-1/2" aria-hidden="true" />

          {journey.map((step, index) => {
            const Icon = stageIcons[index];
            const onLeft = index % 2 === 0;

            return (
              <li
                key={step}
                className="reveal relative grid grid-cols-[auto_1fr] items-center gap-5 lg:grid-cols-2 lg:gap-16"
              >
                {/* Station. In flow on mobile, pinned to the rail on desktop. */}
                <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#39dbc0]/30 bg-[#0d1733] text-[11px] font-bold text-[#39dbc0] shadow-[0_0_0_6px_rgba(7,13,36,1)] lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <article
                  className={`card-lift flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm sm:p-5 lg:w-full lg:max-w-[340px] ${
                    onLeft
                      ? "lg:col-start-1 lg:ml-auto lg:flex-row-reverse lg:text-right"
                      : "lg:col-start-2 lg:mr-auto"
                  }`}
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#39dbc0]/12 text-[#39dbc0]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-[15px] font-bold text-white">{step}</span>
                </article>
              </li>
            );
          })}
        </ol>

        <p className="reveal-fade mx-auto mt-16 max-w-md text-center text-sm leading-7 text-white/60">
          Every stage writes to the same record, so nothing has to be re-entered, re-asked or reconciled later.
        </p>
      </div>
    </section>
  );
}
