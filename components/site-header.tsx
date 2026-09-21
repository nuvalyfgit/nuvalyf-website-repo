"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { navigation } from "@/data/site-content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#dfe8e6]/80 bg-white/90 backdrop-blur-xl">
      <div className="site-container flex h-[76px] items-center justify-between">
        <BrandLogo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-semibold text-[#526173] transition hover:text-[#087a70]">{item.label}</a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button asChild size="lg" className="rounded-full bg-[#0b6b63] px-6 text-white shadow-none hover:bg-[#07574f]">
            <a href="#contact">Book a Demo</a>
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav className="border-t border-[#dfe8e6] bg-white px-5 pb-6 pt-3 lg:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-7xl flex-col">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="border-b border-[#eef3f2] py-3.5 text-base font-semibold text-[#263449]" onClick={() => setOpen(false)}>{item.label}</a>
            ))}
            <Button asChild className="mt-5 h-11 rounded-full bg-[#0b6b63] text-white hover:bg-[#07574f]">
              <a href="#contact" onClick={() => setOpen(false)}>Book a Demo</a>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
