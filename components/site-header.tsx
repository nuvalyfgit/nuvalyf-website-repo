"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { navigation } from "@/data/site-content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#070d24]/80 backdrop-blur-xl">
      <div className="site-container flex h-[76px] items-center justify-between">
        <BrandLogo inverse />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-2 text-sm font-medium text-white/60 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#39dbc0] after:transition-all after:duration-300 hover:text-white hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild size="lg" className="rounded-full bg-[#39dbc0] px-6 font-bold text-[#07231f] shadow-none transition hover:bg-[#5ce7d0]">
            <a href="#contact">Book a Demo</a>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 hover:text-white lg:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {open && (
        <nav className="border-t border-white/8 bg-[#070d24] px-5 pb-6 pt-3 lg:hidden" aria-label="Mobile navigation">
          <div className="site-container flex flex-col">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-b border-white/6 py-3.5 text-base font-semibold text-white/80 transition hover:text-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button asChild className="mt-5 h-11 rounded-full bg-[#39dbc0] font-bold text-[#07231f] hover:bg-[#5ce7d0]">
              <a href="#contact" onClick={() => setOpen(false)}>Book a Demo</a>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
