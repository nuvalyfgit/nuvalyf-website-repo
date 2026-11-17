"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";

const TIMES = [10, 11, 12, 15, 16, 17];
const DAYS_AHEAD = 8;

/**
 * Calendly-style preferred-time picker. Shows the next working days (Mon–Sat)
 * and hourly slots in the visitor's own time zone. The choice is sent with the
 * form as `preferredSlot`; the team confirms the exact time by email.
 */
export function SlotPicker() {
  const [now, setNow] = useState<Date | null>(null);
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);

  const days = useMemo(() => {
    if (!now) return [];
    const out: Date[] = [];
    const d = new Date(now);
    d.setHours(0, 0, 0, 0);
    while (out.length < DAYS_AHEAD) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() !== 0) out.push(new Date(d));
    }
    return out;
  }, [now]);

  const tz = now ? Intl.DateTimeFormat().resolvedOptions().timeZone : "";
  const value = slot
    ? `${slot.toLocaleString("en-GB", { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })} (${tz})`
    : "";

  return (
    <fieldset className="mt-5">
      <legend className="mb-2.5 flex items-center gap-2 text-sm font-bold text-[#334155]">
        <CalendarDays className="h-4 w-4 text-[#059669]" /> Pick a time for your demo <span className="font-medium text-[#94A3B8]">(optional)</span>
      </legend>
      <input type="hidden" name="preferredSlot" value={value} />
      {!now ? (
        <div className="h-[118px] rounded-xl bg-[#F8FAFC]" />
      ) : (
        <>
          <div className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {days.map((d, i) => (
              <button
                key={d.toISOString()}
                type="button"
                onClick={() => { setDay(i); setSlot(null); }}
                className={`grid w-[62px] shrink-0 place-items-center rounded-xl border py-2 text-xs transition ${i === day ? "border-[#059669] bg-[#059669] text-white" : "border-[#E2E8F0] bg-[#F8FAFC] text-[#475569] hover:border-[#059669]"}`}
              >
                <span className="font-semibold">{d.toLocaleDateString("en-GB", { weekday: "short" })}</span>
                <span className="text-lg font-bold">{d.getDate()}</span>
              </button>
            ))}
          </div>
          <div className="mt-2.5 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {TIMES.map((h) => {
              const t = new Date(days[day]);
              t.setHours(h, 0, 0, 0);
              const active = slot?.getTime() === t.getTime();
              return (
                <button
                  key={h}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSlot(active ? null : t)}
                  className={`rounded-lg border py-2 text-xs font-semibold transition ${active ? "border-[#059669] bg-[#ECFDF5] text-[#059669]" : "border-[#E2E8F0] bg-white text-[#475569] hover:border-[#059669]"}`}
                >
                  {t.toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true })}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-[#94A3B8]">
            {slot ? <>Selected: <strong className="text-[#059669]">{value}</strong>. We&apos;ll confirm by email.</> : <>Times shown in your time zone ({tz}).</>}
          </p>
        </>
      )}
    </fieldset>
  );
}
