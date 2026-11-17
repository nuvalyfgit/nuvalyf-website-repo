"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { Building2, Globe2, Sparkles } from "lucide-react";
import { reach } from "@/data/site-content";
import { SectionHeading } from "@/components/section-heading";
import { TiltStage } from "@/components/tilt-stage";

/*
 * Map geometry lives in a 600x400 viewBox. It is an abstract network, not a
 * geographic map: the UAE sits west of India, and the faint "ghost" nodes are
 * the regions still to come. HTML labels use the same coordinates as
 * percentages, so they stay pinned to their nodes at every size.
 */
const NODE_POSITIONS: Record<string, { x: number; y: number; label: "left" | "right" }> = {
  AE: { x: 215, y: 210, label: "left" },
  IN: { x: 375, y: 238, label: "right" },
};
const LIVE_ARC = "M215 210 Q295 112 375 238";
const GHOSTS = [
  { x: 108, y: 146, path: "M215 210 Q150 146 108 146" },
  { x: 300, y: 88, path: "M375 238 Q318 140 300 88" },
  { x: 498, y: 132, path: "M375 238 Q452 146 498 132" },
  { x: 508, y: 306, path: "M375 238 Q462 300 508 306" },
];

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window);

/**
 * Arms the entrance choreography once JS is running, then fires it the first
 * time the element is on screen. Writes data attributes straight to the DOM
 * (like TiltStage) so nothing re-renders. Without JS, or with reduced motion,
 * the attributes never appear and the CSS shows the finished state.
 */
function useEntrance<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || reducedMotion()) return;
    node.dataset.armed = "";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.dataset.inview = "";
        observer.disconnect();
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/** Counts from 0 to `value` once visible. The server HTML already holds the final number. */
export function CountUp({ value, suffix = "", duration = 1800 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || reducedMotion()) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          node.textContent = `${Math.round(eased * value)}${suffix}`;
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      node.textContent = `${value}${suffix}`;
    };
  }, [value, suffix, duration]);

  return (
    <span aria-label={`${value}${suffix}`}>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {value}
        {suffix}
      </span>
    </span>
  );
}

function LiveDot({ className = "bg-[#14B8A6]" }: { className?: string }) {
  return (
    <span className="relative flex h-2 w-2">
      <span className={`reach-ping absolute inline-flex h-full w-full rounded-full opacity-70 ${className}`} />
      <span className={`relative inline-flex h-2 w-2 rounded-full ${className}`} />
    </span>
  );
}

function NetworkMap({ clientCount }: { clientCount: number }) {
  const ref = useEntrance<HTMLDivElement>();
  const clients = `${clientCount}${reach.clients.suffix}`;
  const liveRegions = reach.regions.filter((region) => NODE_POSITIONS[region.code]);

  return (
    <div ref={ref} className="stage w-full">
      <TiltStage className="relative mx-auto w-full max-w-[680px]">
        <div className="pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(20,184,166,0.2),transparent_70%)] blur-2xl" />

        <div className="plane relative rounded-[30px] border border-white/12 bg-white/[0.05] p-2 shadow-[0_40px_120px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <div className="relative overflow-hidden rounded-[24px] bg-[#0F172A]">
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-3 sm:px-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#99F6E4]">NuvaLyf network</p>
              <span className="flex items-center gap-2 text-[11px] font-bold text-white/70">
                <LiveDot /> Live in {reach.regions.length} countries
              </span>
            </div>

            <div className="relative aspect-[3/2]">
              {/* Dot-matrix field, masked into a soft globe shape */}
              <div
                className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(62%_62%_at_52%_55%,#000_35%,transparent_75%)]"
                style={{ backgroundImage: "radial-gradient(rgba(155,232,218,.28) 1px, transparent 1.2px)", backgroundSize: "14px 14px" }}
              />
              <div className="reach-sweep pointer-events-none absolute inset-0" aria-hidden="true" />

              <svg viewBox="0 0 600 400" className="absolute inset-0 h-full w-full" role="img" aria-label={`NuvaLyf is live in ${reach.regions.map((r) => r.fullName).join(" and ")}, and expanding to new regions`}>
                <defs>
                  <linearGradient id="reach-arc-gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#14B8A6" />
                    <stop offset="1" stopColor="#6EE7B7" />
                  </linearGradient>
                  <radialGradient id="reach-node-glow">
                    <stop offset="0" stopColor="#14B8A6" stopOpacity=".55" />
                    <stop offset="1" stopColor="#14B8A6" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Slow orbits */}
                <ellipse cx="300" cy="215" rx="255" ry="150" pathLength={1} fill="none" stroke="rgba(255,255,255,.09)" strokeWidth="1.5" className="reach-orbit" />
                <ellipse cx="300" cy="215" rx="180" ry="104" pathLength={1} fill="none" stroke="rgba(155,232,218,.12)" strokeWidth="1.5" className="reach-orbit reach-orbit--reverse" />

                {/* Regions still to come: flowing dashed links */}
                {GHOSTS.map((ghost, index) => (
                  <g key={ghost.path} className="reach-fade" style={delay(900 + index * 140)}>
                    <path d={ghost.path} pathLength={1} fill="none" stroke="#14B8A6" strokeOpacity=".55" strokeWidth="1.5" strokeLinecap="round" className="reach-flow" />
                    <circle r="2.5" fill="#A7F3D0" className="reach-dot">
                      <animateMotion dur={`${3.4 + index * 0.5}s`} repeatCount="indefinite" path={ghost.path} />
                    </circle>
                  </g>
                ))}
                {GHOSTS.map((ghost, index) => (
                  <g key={`${ghost.x}-${ghost.y}`} className="reach-node" style={delay(1100 + index * 140)}>
                    <circle cx={ghost.x} cy={ghost.y} r="6" fill="none" stroke="#14B8A6" strokeOpacity=".7" className="reach-ring" style={{ animationDelay: `${index * 0.6}s` }} />
                    <circle cx={ghost.x} cy={ghost.y} r="4.5" fill="#0F172A" stroke="#14B8A6" strokeWidth="1.5" />
                  </g>
                ))}

                {/* The live corridor */}
                <path d={LIVE_ARC} pathLength={1} fill="none" stroke="url(#reach-arc-gradient)" strokeWidth="9" strokeOpacity=".16" strokeLinecap="round" className="reach-arc" style={delay(300)} />
                <path d={LIVE_ARC} pathLength={1} fill="none" stroke="url(#reach-arc-gradient)" strokeWidth="2.5" strokeLinecap="round" className="reach-arc" style={delay(300)} />
                <circle r="4" fill="#ffffff" className="reach-dot">
                  <animateMotion dur="2.8s" repeatCount="indefinite" path={LIVE_ARC} />
                </circle>
                <circle r="3" fill="#2DD4BF" className="reach-dot">
                  <animateMotion dur="2.8s" begin="1.4s" repeatCount="indefinite" path={LIVE_ARC} keyPoints="1;0" keyTimes="0;1" calcMode="linear" />
                </circle>

                {liveRegions.map((region, index) => {
                  const { x, y } = NODE_POSITIONS[region.code];
                  return (
                    <g key={region.code} className="reach-node" style={delay(index * 260)}>
                      <circle cx={x} cy={y} r="34" fill="url(#reach-node-glow)" />
                      <circle cx={x} cy={y} r="9" fill="none" stroke="#14B8A6" strokeWidth="1.5" className="reach-ring" />
                      <circle cx={x} cy={y} r="9" fill="none" stroke="#14B8A6" strokeWidth="1.5" className="reach-ring" style={{ animationDelay: "1.4s" }} />
                      <circle cx={x} cy={y} r="8" fill="#14B8A6" />
                      <circle cx={x} cy={y} r="3" fill="#0B1120" />
                    </g>
                  );
                })}
              </svg>

              {/* Labels, pinned to node coordinates */}
              {liveRegions.map((region, index) => {
                const { x, y, label } = NODE_POSITIONS[region.code];
                return (
                  <div
                    key={region.code}
                    className={`pointer-events-none absolute ${label === "left" ? "-translate-x-[calc(100%+14px)] translate-y-[12px]" : "translate-x-[14px] translate-y-[12px]"}`}
                    style={{ left: `${(x / 600) * 100}%`, top: `${(y / 400) * 100}%` }}
                  >
                    <div className="reach-label rounded-xl border border-white/12 bg-[#0B1120]/85 px-2.5 py-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur sm:px-3 sm:py-2" style={delay(500 + index * 260)}>
                      <strong className="block text-[11px] font-bold text-white sm:text-sm"><span className="sm:hidden">{region.name}</span><span className="hidden sm:inline">{region.fullName}</span></strong>
                      <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-[#14B8A6] sm:text-[10px]">
                        <LiveDot /> Live
                      </span>
                    </div>
                  </div>
                );
              })}
              <div className="pointer-events-none absolute -translate-x-1/2 translate-y-[14px]" style={{ left: `${(GHOSTS[2].x / 600) * 100}%`, top: `${(GHOSTS[2].y / 400) * 100}%` }}>
                <div className="reach-label whitespace-nowrap rounded-full border border-[#14B8A6]/40 bg-[#0B1120]/85 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#A7F3D0] backdrop-blur sm:text-[10px]" style={delay(1500)}>
                  + New regions
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/8 px-4 py-3 text-[11px] font-semibold text-white/55 sm:px-5">
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#14B8A6]" />Live region</span>
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full border border-[#14B8A6]" />Expanding</span>
              <span className="ml-auto hidden text-white/40 sm:inline">Data stays connected across every clinic</span>
            </div>
          </div>
        </div>

        {/* Floating chips, clear of the panel in Z */}
        <div className="depth-3 absolute bottom-20 -left-6 hidden items-center gap-3 rounded-2xl border border-white/15 bg-white/95 px-4 py-3 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur sm:flex">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#e4f7f3] text-[#047857]"><Building2 className="h-4 w-4" /></span>
          <span>
            <strong className="block text-xs text-[#0F172A]">{clients} clinics onboarded</strong>
            <span className="text-[10px] text-[#64748B]">and counting</span>
          </span>
        </div>
        <div className="depth-2 absolute -right-4 -top-5 hidden items-center gap-2 rounded-full border border-white/15 bg-[#0F172A]/95 px-3.5 py-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur md:flex">
          <LiveDot />
          <span className="text-[11px] font-bold text-white">{reach.regions.map((r) => r.name).join(" · ")} {reach.more.label}</span>
        </div>
      </TiltStage>
    </div>
  );
}

export function ReachSection({ clientCount = reach.clients.value }: { clientCount?: number } = {}) {
  const ticker = [
    `${clientCount}${reach.clients.suffix} clinics onboarded`,
    ...reach.regions.map((region) => region.fullName),
    reach.more.description,
    "One patient. One connected record.",
  ];

  return (
    <section id="reach" className="grain relative overflow-hidden bg-[#0B1120] pt-24 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_80%_30%,rgba(20,184,166,0.14),transparent_62%),radial-gradient(45%_40%_at_10%_80%,rgba(5,150,105,0.14),transparent_60%)]" />

      <div className="site-container relative grid items-center gap-16 lg:grid-cols-[.92fr_1.08fr] lg:gap-14">
        <div>
          <SectionHeading
            eyebrow="Our reach"
            title="Trusted by clinics across borders."
            description={`Healthcare teams in ${reach.regions.map((r) => r.inSentence).join(" and ")} run their everyday clinic operations on NuvaLyf — and we’re expanding into new regions.`}
            inverse
          />

          <div className="reveal-stagger mt-10 grid grid-cols-2 gap-4">
            <div className="reach-card card-lift relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
              <Building2 className="h-5 w-5 text-[#14B8A6]" />
              <p className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">
                <CountUp value={clientCount} suffix={reach.clients.suffix} />
              </p>
              <p className="mt-1 text-sm font-medium text-white/55">{reach.clients.label}</p>
            </div>
            <div className="reach-card card-lift relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
              <Globe2 className="h-5 w-5 text-[#6EE7B7]" />
              <p className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">
                <CountUp value={reach.regions.length} duration={1200} />
              </p>
              <p className="mt-1 text-sm font-medium text-white/55">Countries live</p>
            </div>
          </div>

          <ul className="reveal-stagger mt-4 grid gap-2.5">
            {reach.regions.map((region) => (
              <li key={region.code} className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 transition hover:border-[#14B8A6]/40 hover:bg-white/[0.06]">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0F172A] text-xs font-black tracking-wider text-[#14B8A6]">{region.code}</span>
                <span className="flex-1 text-sm font-bold text-white">{region.fullName}</span>
                <span className="flex items-center gap-2 rounded-full bg-[#14B8A6]/12 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#14B8A6]"><LiveDot /> Live</span>
              </li>
            ))}
            <li className="flex items-center gap-4 rounded-2xl border border-dashed border-[#14B8A6]/30 bg-white/[0.02] px-4 py-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0F172A] text-[#6EE7B7]"><Sparkles className="h-4 w-4" /></span>
              <span className="flex-1 text-sm font-bold text-white/80">{reach.more.description}</span>
              <span className="flex items-center gap-2 rounded-full bg-[#14B8A6]/14 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#A7F3D0]"><LiveDot className="bg-[#6EE7B7]" /> Soon</span>
            </li>
          </ul>
        </div>

        <NetworkMap clientCount={clientCount} />
      </div>

      {/* Ticker */}
      <div className="marquee relative mt-24 overflow-hidden border-t border-white/8 py-5 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] sm:mt-28">
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className="flex shrink-0 items-center">
              {ticker.map((item) => (
                <li key={item} className="flex items-center gap-8 pr-8 text-sm font-bold uppercase tracking-[0.2em] text-white/45 sm:text-base">
                  {item}
                  <span className="h-1.5 w-1.5 rotate-45 bg-[#14B8A6]" aria-hidden="true" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
