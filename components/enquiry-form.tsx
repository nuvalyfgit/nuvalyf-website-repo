"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { enquirySchema, type EnquiryFieldErrors, type EnquiryResponse } from "@/lib/enquiry";

type Field = { name: string; label: string; type?: string; placeholder?: string; options?: string[]; required?: boolean };

const fieldsFor: Record<"contact" | "hospital", Field[]> = {
  contact: [
    { name: "fullName", label: "Full name", placeholder: "Your name", required: true },
    { name: "email", label: "Email", type: "email", placeholder: "you@example.com", required: true },
    { name: "phone", label: "Phone (optional)", type: "tel", placeholder: "+91" },
    { name: "topic", label: "Topic", options: ["General question", "Sales", "Support for existing customers", "Partnerships", "Media", "Careers"] },
  ],
  hospital: [
    { name: "fullName", label: "Full name", placeholder: "Your name", required: true },
    { name: "role", label: "Your role", options: ["Owner / Director", "Doctor", "Administrator", "IT / Operations", "Other"] },
    { name: "email", label: "Work email", type: "email", placeholder: "you@hospital.com", required: true },
    { name: "phone", label: "Phone", type: "tel", placeholder: "+91", required: true },
    { name: "organisation", label: "Hospital / clinic name", placeholder: "Organisation", required: true },
    { name: "city", label: "City", placeholder: "City" },
    { name: "size", label: "Number of doctors", options: ["1–5", "6–20", "21–50", "50+"] },
  ],
};

export function EnquiryForm({ kind }: { kind: "contact" | "hospital" }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [errors, setErrors] = useState<EnquiryFieldErrors>({});
  const [formError, setFormError] = useState("");

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const data = { ...Object.fromEntries(new FormData(ev.currentTarget)), kind };
    const check = enquirySchema.safeParse(data);
    if (!check.success) {
      setErrors(check.error.flatten().fieldErrors as EnquiryFieldErrors);
      setFormError("Please check the highlighted fields.");
      return;
    }
    setErrors({});
    setFormError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const body = (await res.json()) as EnquiryResponse;
      if (body.ok) return setStatus("done");
      setErrors(body.fieldErrors ?? {});
      setFormError(body.message);
    } catch {
      setFormError("Network error. Please try again or email business@nuvalyf.com.");
    }
    setStatus("idle");
  }

  if (status === "done") {
    return (
      <div role="status" className="grid place-items-center rounded-[24px] border border-[#E2E8F0] bg-white p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-[#059669]" />
        <h3 className="mt-4 text-xl font-bold text-[#0F172A]">Thank you, we&apos;ve got it.</h3>
        <p className="mt-2 max-w-sm text-sm text-[#64748B]">Our team will reply within one working day.</p>
      </div>
    );
  }

  const err = (n: string) => errors[n as keyof EnquiryFieldErrors]?.[0];

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[24px] border border-[#E2E8F0] bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {fieldsFor[kind].map((f) => (
          <label key={f.name} className="block">
            <span className="text-sm font-semibold text-[#0F172A]">{f.label}{f.required && <span className="text-[#c54545]"> *</span>}</span>
            {f.options ? (
              <NativeSelect name={f.name} defaultValue="" className="mt-2 w-full">
                <NativeSelectOption value="">Select</NativeSelectOption>
                {f.options.map((o) => <NativeSelectOption key={o} value={o}>{o}</NativeSelectOption>)}
              </NativeSelect>
            ) : (
              <Input name={f.name} type={f.type ?? "text"} placeholder={f.placeholder} aria-invalid={!!err(f.name)} className="mt-2 h-11" />
            )}
            {err(f.name) && <span className="mt-1.5 block text-xs font-medium text-[#c54545]">{err(f.name)}</span>}
          </label>
        ))}
        <label className="block sm:col-span-2">
          <span className="text-sm font-semibold text-[#0F172A]">{kind === "hospital" ? "What would you like to improve?" : "Message"} <span className="text-[#c54545]">*</span></span>
          <Textarea name="message" rows={5} aria-invalid={!!err("message")} placeholder={kind === "hospital" ? "Departments, current software, timelines…" : "How can we help?"} className="mt-2" />
          {err("message") && <span className="mt-1.5 block text-xs font-medium text-[#c54545]">{err("message")}</span>}
        </label>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      </div>
      {formError && <p role="alert" className="mt-5 text-sm font-medium text-[#c54545]">{formError}</p>}
      <Button type="submit" disabled={status === "sending"} size="lg" className="mt-6 h-12 w-full rounded-full bg-[#059669] font-bold text-white hover:bg-[#047857] sm:w-auto sm:px-8">
        {status === "sending" ? <><Loader2 className="animate-spin" /> Sending…</> : <>Send {kind === "hospital" ? "enquiry" : "message"} <ArrowRight /></>}
      </Button>
      <p className="mt-4 text-xs text-[#64748B]">We use your details only to reply to you. See our <a href="/privacy" className="underline">Privacy Policy</a>.</p>
    </form>
  );
}
