"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { emrSignInUrl, navigation } from "@/data/site-content";
import { PrefsToggle } from "@/components/prefs";

/**
 * Floating header. At the top it sits flat (transparent over the homepage hero);
 * once you scroll it becomes a glass capsule. A highlight pill slides under the hovered link.
 */
export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const hover = (e: React.MouseEvent<HTMLElement>) => {
    const nav = navRef.current?.getBoundingClientRect();
    const r = e.currentTarget.getBoundingClientRect();
    if (nav) setPill({ left: r.left - nav.left, width: r.width });
  };

  const floating = scrolled || open;
  return (
    <header className={`${overlay ? "fixed" : "sticky"} inset-x-0 top-0 z-50 px-3 transition-all duration-500 ${floating ? "pt-3" : "pt-0"} ${!overlay && !floating ? "bg-[#0B1120]" : ""}`}>
      <div
        className={`mx-auto flex items-center justify-between transition-all duration-500 ${
          floating
            ? "h-[64px] max-w-6xl rounded-full border border-white/12 bg-[#0B1120]/70 px-3 pl-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6),0_0_0_1px_rgba(94,234,212,0.06),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl"
            : "site-container h-[76px] border-b border-white/[0.06]"
        }`}
      >
        <BrandLogo inverse />

        <nav ref={navRef} onMouseLeave={() => setPill(null)} className="relative hidden items-center lg:flex" aria-label="Primary navigation">
          <span
            aria-hidden="true"
            className="absolute top-1/2 h-9 -translate-y-1/2 rounded-full bg-white/[0.08] ring-1 ring-white/10 transition-all duration-300 ease-out"
            style={{ left: pill?.left ?? 0, width: pill?.width ?? 0, opacity: pill ? 1 : 0 }}
          />
          {navigation.map((item) =>
            "items" in item ? (
              <div key={item.label} className="group relative" onMouseEnter={hover}>
                <button type="button" className="relative flex items-center gap-1 px-4 py-5 text-[14px] font-medium text-white/70 transition-colors group-hover:text-white" aria-haspopup="true">
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 opacity-60 transition duration-300 group-hover:rotate-180 group-focus-within:rotate-180" />
                </button>
                <div className="invisible absolute left-1/2 top-full w-[340px] -translate-x-1/2 translate-y-2 opacity-0 transition duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="rounded-3xl border border-white/10 bg-[#0B1120]/95 p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
                    {item.items.map((l) => (
                      <a key={l.href} href={l.href} className="group/item flex items-start gap-3 rounded-2xl px-4 py-3 transition hover:bg-white/[0.06]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#14B8A6] opacity-40 transition group-hover/item:opacity-100 group-hover/item:shadow-[0_0_10px_#5eead4]" />
                        <span>
                          <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                            {l.label}
                            <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-[#5EEAD4] opacity-0 transition group-hover/item:translate-x-0 group-hover/item:opacity-100" />
                          </span>
                          {l.description && <span className="mt-0.5 block text-xs leading-5 text-white/50">{l.description}</span>}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a key={item.href} href={item.href} onMouseEnter={hover} className="relative px-4 py-5 text-[14px] font-medium text-white/70 transition-colors hover:text-white">
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-1 lg:flex">
          <PrefsToggle />
          <a href="/ar" lang="ar" className="rounded-full px-3 py-2 text-sm text-white/55 transition hover:bg-white/[0.06] hover:text-white">عربي</a>
          <a href={emrSignInUrl} className="rounded-full px-4 py-2 text-sm font-medium text-white/75 transition hover:bg-white/[0.06] hover:text-white">Sign in</a>
          <a
            href="/book-a-demo"
            className="group relative ml-1 inline-flex h-11 items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#14B8A6] to-[#10B981] px-5 text-sm font-bold text-[#042F2E] shadow-[0_8px_30px_-6px_rgba(20,184,166,0.7)] transition hover:shadow-[0_10px_40px_-4px_rgba(20,184,166,0.9)]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition duration-700 group-hover:translate-x-full" />
            <span className="relative">Book a Demo</span>
            <span className="relative grid h-6 w-6 place-items-center rounded-full bg-[#042F2E]/15 transition group-hover:translate-x-0.5">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full text-white transition hover:bg-white/10 lg:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="mx-auto mt-2 max-h-[calc(100dvh-90px)] max-w-6xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0B1120]/95 px-5 pb-6 pt-2 shadow-2xl backdrop-blur-2xl lg:hidden" aria-label="Mobile navigation">
          {navigation.map((item) =>
            "items" in item ? (
              <div key={item.label} className="border-b border-white/[0.06]">
                <button
                  type="button"
                  aria-expanded={section === item.label}
                  onClick={() => setSection((s) => (s === item.label ? null : item.label))}
                  className="flex w-full items-center justify-between py-3.5 text-base font-semibold text-white/85"
                >
                  {item.label}
                  <ChevronDown className={`h-4 w-4 transition ${section === item.label ? "rotate-180" : ""}`} />
                </button>
                {section === item.label && (
                  <div className="pb-3 pl-3">
                    {item.items.map((l) => (
                      <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2.5 text-[15px] text-white/65 hover:text-white">
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="block border-b border-white/[0.06] py-3.5 text-base font-semibold text-white/85">
                {item.label}
              </a>
            ),
          )}
          <div className="flex items-center justify-between border-b border-white/[0.06] py-2.5 text-base font-semibold text-white/85">Display <PrefsToggle /></div>
          <a href="/ar" lang="ar" className="block border-b border-white/[0.06] py-3.5 text-base font-semibold text-white/85">عربي</a>
          <a href={emrSignInUrl} className="block border-b border-white/[0.06] py-3.5 text-base font-semibold text-white/85">Sign in</a>
          <a href="/book-a-demo" onClick={() => setOpen(false)} className="mt-5 flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#14B8A6] to-[#10B981] font-bold text-[#042F2E]">
            Book a Demo <ArrowRight className="h-4 w-4" />
          </a>
        </nav>
      )}
    </header>
  );
}
