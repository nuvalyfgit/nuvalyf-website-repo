"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const KEY = "nuvalyf-consent";

/** Google Analytics loads only after the visitor accepts. Nothing is shown when GA isn't configured. */
export function AnalyticsConsent() {
  const [choice, setChoice] = useState<"accepted" | "declined" | null | "unknown">("unknown");

  useEffect(() => {
    try {
      setChoice((localStorage.getItem(KEY) as "accepted" | "declined" | null) ?? null);
    } catch {
      setChoice(null);
    }
  }, []);

  if (!GA_ID) return null;

  const decide = (c: "accepted" | "declined") => {
    try {
      localStorage.setItem(KEY, c);
    } catch {}
    setChoice(c);
  };

  return (
    <>
      {choice === "accepted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {choice === null && (
        <div role="dialog" aria-label="Cookie consent" className="fixed inset-x-3 bottom-20 z-[70] mx-auto max-w-xl rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.2)] lg:bottom-5">
          <p className="text-sm leading-6 text-[#475569]">
            We use analytics cookies to understand how the site is used. No advertising cookies. See our <a href="/privacy" className="font-semibold text-[#059669] underline">Privacy Policy</a>.
          </p>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={() => decide("accepted")} className="rounded-full bg-[#059669] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#047857]">Accept</button>
            <button type="button" onClick={() => decide("declined")} className="rounded-full border border-[#E2E8F0] px-5 py-2.5 text-sm font-semibold text-[#0F172A] hover:bg-[#F8FAFC]">Decline</button>
          </div>
        </div>
      )}
    </>
  );
}
