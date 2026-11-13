"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, Building2, CheckCircle2, Loader2, UserRound } from "lucide-react";
import { docconnect } from "@/data/site-content";

const pad = (n: number) => String(n).padStart(2, "0");

/** Countdown to docconnect.launchDate. Renders nothing until mounted to avoid a server/client mismatch. */
export function Countdown() {
  const target = new Date(docconnect.launchDate).getTime();
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const left = Math.max(0, (target - (now ?? target)) / 1000);
  const parts: [string, string][] = [
    [String(Math.floor(left / 86400)), "days"],
    [pad(Math.floor((left % 86400) / 3600)), "hours"],
    [pad(Math.floor((left % 3600) / 60)), "min"],
    [pad(Math.floor(left % 60)), "sec"],
  ];

  return (
    <div className="flex gap-2.5" aria-label="Time until launch" suppressHydrationWarning>
      {parts.map(([v, l]) => (
        <div key={l} className="min-w-[68px] rounded-2xl border border-white/12 bg-white/[0.05] px-3 py-2.5 text-center backdrop-blur">
          <p className="font-display text-3xl font-bold tabular-nums text-white">{now === null ? "--" : v}</p>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50">{l}</p>
        </div>
      ))}
    </div>
  );
}

/** "Wait at home, not here": drag patients ahead, see time saved. */
export function WaitSlider() {
  const [ahead, setAhead] = useState(6);
  const perPatient = 12;
  const saved = ahead * perPatient;
  const turn = new Date(2026, 0, 1, 17, 30 + saved);
  const leave = new Date(turn.getTime() - 20 * 60000);
  const fmt = (d: Date) => d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }).toLowerCase();

  return (
    <div className="rounded-[28px] border border-[#dce7e5] bg-white p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <label htmlFor="ahead" className="text-sm font-bold text-[#263449]">Patients ahead of you</label>
        <span className="font-display text-3xl font-bold text-[#0b1535] tabular-nums">{ahead}</span>
      </div>
      <input id="ahead" type="range" min={1} max={15} step={1} value={ahead} onChange={(e) => setAhead(+e.target.value)} className="mt-4 w-full accent-[#0b6b63]" />
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          ["Old way: waiting room", `${saved} min`, "text-[#c54545]"],
          ["DocConnect: leave home at", fmt(leave), "text-[#0b1535]"],
          ["Time you get back", `${saved - 5} min`, "text-[#0b6b63]"],
        ].map(([l, v, c]) => (
          <div key={l} className="rounded-2xl bg-[#f6faf9] p-4">
            <p className="text-xs font-semibold text-[#647383]">{l}</p>
            <p className={`mt-1 font-display text-2xl font-bold tabular-nums ${c}`}>{v}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-[#84909b]">Example based on about {perPatient} minutes per consultation and a 20-minute journey.</p>
    </div>
  );
}

type State = "idle" | "sending" | "done";

function WaitlistCard({ type }: { type: "patient" | "clinic" }) {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  const clinic = type === "clinic";

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (String(data.contact ?? "").trim().length < 5) return setError("Enter a phone number or email.");
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, type }) });
      const out = (await res.json()) as { ok: boolean; message?: string };
      if (!out.ok) throw new Error(out.message);
      setState("done");
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "Couldn't save your spot. Try again.");
      setState("idle");
    }
  }

  const input = `h-11 w-full rounded-xl border px-4 text-sm outline-none transition focus:ring-4 ${clinic ? "border-white/15 bg-white/[0.06] text-white placeholder:text-white/40 focus:ring-[#39dbc0]/20" : "border-[#d8e5e2] bg-[#fbfdfd] text-[#0b1535] placeholder:text-[#9aa5ae] focus:ring-[#0b6b63]/10"}`;

  return (
    <div className={`card-lift flex flex-col rounded-[28px] p-7 sm:p-8 ${clinic ? "bg-[linear-gradient(160deg,#0b1535_0%,#084b45_100%)] text-white" : "border border-[#dce7e5] bg-white text-[#0b1535]"}`}>
      <div className="flex items-center gap-3">
        <span className={`grid h-11 w-11 place-items-center rounded-xl ${clinic ? "bg-[#39dbc0] text-[#07231f]" : "bg-[#e1f6f1] text-[#0b6b63]"}`}>
          {clinic ? <Building2 className="h-5 w-5" /> : <UserRound className="h-5 w-5" />}
        </span>
        <div>
          <p className={`text-xs font-bold uppercase tracking-[0.14em] ${clinic ? "text-[#9be8da]" : "text-[#087a70]"}`}>{clinic ? "Limited spots" : "For patients"}</p>
          <h3 className="text-xl font-bold">{clinic ? "Become a founding clinic" : "Get notified at launch"}</h3>
        </div>
      </div>

      {clinic ? (
        <ul className="mt-5 space-y-2 text-sm text-white/80">
          {docconnect.foundingPerks.map((p) => <li key={p} className="flex gap-2.5"><CheckCircle2 className="h-4 w-4 shrink-0 text-[#39dbc0]" />{p}</li>)}
        </ul>
      ) : (
        <p className="mt-5 text-sm leading-6 text-[#647383]">Be first to book when DocConnect opens in your city. One message at launch, no spam.</p>
      )}

      {state === "done" ? (
        <div className={`mt-6 flex flex-1 items-center gap-3 rounded-2xl p-4 text-sm font-semibold ${clinic ? "bg-white/10" : "bg-[#e1f6f1] text-[#085041]"}`} role="status">
          <CheckCircle2 className="h-5 w-5 shrink-0" />{clinic ? "Spot reserved. Our team will call you within 2 working days." : "You're on the list. We'll message you at launch."}
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="mt-6 grid flex-1 content-end gap-3">
          <div aria-hidden="true" className="absolute h-px w-px overflow-hidden [clip-path:inset(50%)]"><input name="website" tabIndex={-1} autoComplete="off" /></div>
          <div className="grid gap-3 sm:grid-cols-2">
            <input name="name" placeholder={clinic ? "Your name" : "Name"} className={input} aria-label="Name" />
            <input name={clinic ? "clinic" : "city"} placeholder={clinic ? "Clinic name" : "City"} className={input} aria-label={clinic ? "Clinic name" : "City"} />
          </div>
          <input name="contact" placeholder="Phone or email" className={input} aria-label="Phone or email" aria-invalid={!!error} onChange={() => error && setError("")} />
          {error && <p className={`text-xs font-semibold ${clinic ? "text-[#ffb4b4]" : "text-[#c54545]"}`}>{error}</p>}
          <button type="submit" disabled={state === "sending"} className={`mt-1 flex h-12 items-center justify-center gap-2 rounded-full font-bold transition disabled:opacity-70 ${clinic ? "bg-[#39dbc0] text-[#07231f] hover:bg-[#5ce7d0]" : "bg-[#0b6b63] text-white hover:bg-[#07574f]"}`}>
            {state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <>{clinic ? "Reserve my spot" : "Notify me"} <ArrowRight className="h-4 w-4" /></>}
          </button>
        </form>
      )}
    </div>
  );
}

export function WaitlistCards() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <WaitlistCard type="patient" />
      <WaitlistCard type="clinic" />
    </div>
  );
}
