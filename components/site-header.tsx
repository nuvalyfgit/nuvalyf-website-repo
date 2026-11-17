"use client";

import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { emrSignInUrl, navigation } from "@/data/site-content";

const linkCls = "text-sm font-medium text-white/65 transition-colors hover:text-white";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#0B1120]/85 backdrop-blur-xl">
      <div className="site-container flex h-[76px] items-center justify-between">
        <BrandLogo inverse />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navigation.map((item) =>
            "items" in item ? (
              <div key={item.label} className="group relative">
                <button type="button" className={`${linkCls} flex items-center gap-1 py-6`} aria-haspopup="true">
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180 group-focus-within:rotate-180" />
                </button>
                <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 translate-y-1 opacity-0 transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="rounded-2xl border border-[#E2E8F0] bg-white p-2 shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
                    {item.items.map((l) => (
                      <a key={l.href} href={l.href} className="block rounded-xl px-4 py-3 transition hover:bg-[#F1F5F9]">
                        <span className="block text-sm font-semibold text-[#0F172A]">{l.label}</span>
                        {l.description && <span className="mt-0.5 block text-xs text-[#64748B]">{l.description}</span>}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a key={item.href} href={item.href} className={`${linkCls} py-6`}>
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a href="/ar" lang="ar" className={linkCls}>عربي</a>
          <a href={emrSignInUrl} className={linkCls}>Sign in</a>
          <Button asChild size="lg" className="rounded-full bg-[#14B8A6] px-6 font-bold text-[#042F2E] shadow-none transition hover:bg-[#2DD4BF]">
            <a href="/book-a-demo">Book a Demo</a>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 hover:text-white lg:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {open && (
        <nav className="max-h-[calc(100dvh-76px)] overflow-y-auto border-t border-white/8 bg-[#0B1120] px-5 pb-6 pt-2 lg:hidden" aria-label="Mobile navigation">
          <div className="site-container flex flex-col">
            {navigation.map((item) =>
              "items" in item ? (
                <div key={item.label} className="border-b border-white/6">
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
                <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-white/6 py-3.5 text-base font-semibold text-white/85">
                  {item.label}
                </a>
              ),
            )}
            <a href="/ar" lang="ar" className="border-b border-white/6 py-3.5 text-base font-semibold text-white/85">عربي</a>
            <a href={emrSignInUrl} className="border-b border-white/6 py-3.5 text-base font-semibold text-white/85">Sign in</a>
            <Button asChild className="mt-5 h-11 rounded-full bg-[#14B8A6] font-bold text-[#042F2E] hover:bg-[#2DD4BF]">
              <a href="/book-a-demo" onClick={() => setOpen(false)}>Book a Demo</a>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
