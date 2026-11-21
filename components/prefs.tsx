"use client";

import { useEffect, useState } from "react";
import { Moon, Pause, Play, Sun } from "lucide-react";

type Prefs = { theme: "light" | "dark"; motion: "full" | "reduce" };
const KEY = "nv-prefs";

/** Runs before paint (inlined in the layout) so the saved theme does not flash. */
export const prefsScript = `try{var p=JSON.parse(localStorage.getItem("${KEY}")||"{}");var d=document.documentElement;d.dataset.theme=p.theme||"light";d.dataset.motion=p.motion||(matchMedia("(prefers-reduced-motion: reduce)").matches?"reduce":"full")}catch(e){}`;

/** Dark mode and reduce-motion switches. */
export function PrefsToggle({ className = "" }: { className?: string }) {
  const [p, setP] = useState<Prefs | null>(null);
  useEffect(() => {
    const d = document.documentElement.dataset;
    setP({ theme: d.theme === "dark" ? "dark" : "light", motion: d.motion === "reduce" ? "reduce" : "full" });
  }, []);
  const update = (next: Prefs) => {
    setP(next);
    document.documentElement.dataset.theme = next.theme;
    document.documentElement.dataset.motion = next.motion;
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  };
  if (!p) return null;
  const btn = "grid h-9 w-9 place-items-center rounded-full text-white/60 transition hover:bg-white/[0.08] hover:text-white";
  return (
    <span className={`flex items-center ${className}`}>
      <button type="button" className={btn} onClick={() => update({ ...p, theme: p.theme === "dark" ? "light" : "dark" })} aria-label={p.theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} title="Light / dark">
        {p.theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
      <button type="button" className={btn} onClick={() => update({ ...p, motion: p.motion === "reduce" ? "full" : "reduce" })} aria-label={p.motion === "reduce" ? "Turn animations on" : "Reduce motion"} title="Animations on / off">
        {p.motion === "reduce" ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
      </button>
    </span>
  );
}
