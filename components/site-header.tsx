"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { emrSignInUrl, navigation } from "@/data/site-content";

/**
 * Floating header. At the top it sits flat (transparent over the homepage hero);
 * once you scroll it becomes a glass capsule. A highlight pill slides under the hovered link.
 */
export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 24);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
    };
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
    <header className={`${overlay ? "fixed" : "sticky"} inset-x-0 top-0 z-50 transition-all duration-500  bg-white/85 backdrop-blur-xl ${floating ? "shadow-[0_1px_0_#E2E8F0]" : ""}`}>
      <div
        className={`mx-auto flex items-center justify-between transition-all duration-500 ${
          floating
            ? "site-container h-[64px]"
            : "site-container h-[72px]"
        }`}
      >
        <BrandLogo />

        <nav ref={navRef} onMouseLeave={() => setPill(null)} className="relative hidden items-center lg:flex" aria-label="Primary navigation">
          <span
            aria-hidden="true"
            className="absolute top-1/2 h-9 -translate-y-1/2 rounded-full bg-[#F1F5F9] transition-all duration-300 ease-out"
            style={{ left: pill?.left ?? 0, width: pill?.width ?? 0, opacity: pill ? 1 : 0 }}
          />
          {navigation.map((item) =>
            "items" in item ? (
              <div key={item.label} className="group relative" onMouseEnter={hover}>
                <button type="button" className="relative flex items-center gap-1 whitespace-nowrap px-3 py-5 text-[14px] xl:px-4 font-medium text-[#334155] transition-colors group-hover:text-[#0B1120]" aria-haspopup="true">
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 opacity-60 transition duration-300 group-hover:rotate-180 group-focus-within:rotate-180" />
                </button>
                <div className="invisible absolute left-1/2 top-full w-[340px] -translate-x-1/2 translate-y-2 opacity-0 transition duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="rounded-3xl border border-[#E2E8F0] bg-white p-2 shadow-[0_24px_48px_-20px_rgba(15,23,42,.25)]">
                    {item.items.map((l) => (
                      <a key={l.href} href={l.href} className="group/item flex items-start gap-3 rounded-2xl px-4 py-3 transition hover:bg-[#F8FAFC]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#14B8A6] opacity-40 transition group-hover/item:opacity-100 group-hover/item:shadow-[0_0_10px_#5eead4]" />
                        <span>
                          <span className="flex items-center gap-1.5 text-sm font-semibold text-[#0B1120]">
                            {l.label}
                            <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-[#0F766E] opacity-0 transition group-hover/item:translate-x-0 group-hover/item:opacity-100" />
                          </span>
                          {l.description && <span className="mt-0.5 block text-xs leading-5 text-[#64748B]">{l.description}</span>}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a key={item.href} href={item.href} onMouseEnter={hover} className="relative whitespace-nowrap px-3 py-5 text-[14px] xl:px-4 font-medium text-[#334155] transition-colors hover:text-[#0B1120]">
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-1 lg:flex">
          <a href="/ar" lang="ar" className="rounded-full px-3 py-2 text-sm text-[#64748B] transition hover:bg-[#F1F5F9] hover:text-[#0B1120]">عربي</a>
          <a href={emrSignInUrl} className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-[#334155] transition hover:bg-[#F1F5F9] hover:text-[#0B1120]">Sign in</a>
          <a
            href="/book-a-demo"
            className="group relative ml-1 inline-flex h-11 items-center gap-2 overflow-hidden rounded-full bg-[#0F766E] px-5 text-sm font-semibold text-white transition hover:bg-[#115E59]"
          >
            
            <span className="relative whitespace-nowrap">Book a Demo</span>
            <span className="relative grid h-6 w-6 place-items-center rounded-full bg-white/15 transition group-hover:translate-x-0.5">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full text-[#0B1120] transition hover:bg-[#F1F5F9] lg:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#0F766E]" style={{ transform: `scaleX(${progress})` }} />
      {open && (
        <nav className="mx-auto mt-2 max-h-[calc(100dvh-90px)] max-w-6xl overflow-y-auto rounded-3xl border border-[#E2E8F0] bg-white px-5 pb-6 pt-2 shadow-2xl lg:hidden" aria-label="Mobile navigation">
          {navigation.map((item) =>
            "items" in item ? (
              <div key={item.label} className="border-b border-[#F1F5F9]">
                <button
                  type="button"
                  aria-expanded={section === item.label}
                  onClick={() => setSection((s) => (s === item.label ? null : item.label))}
                  className="flex w-full items-center justify-between py-3.5 text-base font-semibold text-[#0B1120]"
                >
                  {item.label}
                  <ChevronDown className={`h-4 w-4 transition ${section === item.label ? "rotate-180" : ""}`} />
                </button>
                {section === item.label && (
                  <div className="pb-3 pl-3">
                    {item.items.map((l) => (
                      <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2.5 text-[15px] text-[#475569] hover:text-[#0B1120]">
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="block border-b border-[#F1F5F9] py-3.5 text-base font-semibold text-[#0B1120]">
                {item.label}
              </a>
            ),
          )}
          <a href="/ar" lang="ar" className="block border-b border-[#F1F5F9] py-3.5 text-base font-semibold text-[#0B1120]">عربي</a>
          <a href={emrSignInUrl} className="block border-b border-[#F1F5F9] py-3.5 text-base font-semibold text-[#0B1120]">Sign in</a>
          <a href="/book-a-demo" onClick={() => setOpen(false)} className="mt-5 flex h-12 items-center justify-center gap-2 rounded-full bg-[#0F766E] font-semibold text-white">
            Book a Demo <ArrowRight className="h-4 w-4" />
          </a>
        </nav>
      )}
    </header>
  );
}
