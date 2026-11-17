"use client";

import { useEffect, useState } from "react";
import { PlayCircle, X } from "lucide-react";
import { demoVideoUrl } from "@/data/more-content";
import { docconnect } from "@/data/site-content";

/** "Watch the demo" button. Until demoVideoUrl is set, the dialog offers the live demo instead. */
export function VideoButton({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={`inline-flex items-center gap-2 text-sm font-semibold text-white/75 transition hover:text-white ${className}`}>
        <PlayCircle className="h-5 w-5 text-[#14B8A6]" /> Watch the 2-minute demo
      </button>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Product demo video" className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="relative w-full max-w-3xl overflow-hidden rounded-[24px] bg-[#0B1120] text-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20">
              <X className="h-5 w-5" />
            </button>
            {demoVideoUrl ? (
              <iframe src={`${demoVideoUrl}?autoplay=1`} title="NuvaLyf demo" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen className="aspect-video w-full" />
            ) : (
              <div className="grid aspect-video place-items-center p-8 text-center">
                <div>
                  <PlayCircle className="mx-auto h-14 w-14 text-[#14B8A6]" />
                  <h3 className="mt-5 text-2xl font-bold">Demo video coming soon</h3>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/60">Meanwhile, join the DocConnect early-access list or book a live walkthrough of the EMR with our team.</p>
                  <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                    <a href={docconnect.earlyAccessUrl} className="rounded-full bg-[#14B8A6] px-6 py-3 text-sm font-bold text-[#042F2E] hover:bg-[#2DD4BF]">Get DocConnect early access</a>
                    <a href="/book-a-demo" onClick={() => setOpen(false)} className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold hover:bg-white/10">Book a live demo</a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
