"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { SectionHeading } from "@/components/section-heading";

const fields = [
  { name: "fullName", label: "Full Name", type: "text", placeholder: "Your name" },
  { name: "email", label: "Work Email", type: "email", placeholder: "you@clinic.com" },
  { name: "mobile", label: "Mobile Number", type: "tel", placeholder: "+91" },
  { name: "clinic", label: "Clinic / Organisation", type: "text", placeholder: "Clinic name" },
  { name: "city", label: "City", type: "text", placeholder: "Your city" },
  { name: "state", label: "State", type: "text", placeholder: "Your state" },
];

export function DemoForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="section-space bg-[#f2f8f7]">
      <div className="site-container grid gap-10 lg:grid-cols-[.72fr_1fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow="Book a demonstration" title="Let’s modernise your clinic." description="See how NUVA LYF can simplify clinical workflows, everyday operations and patient communication for your team." />
          <div className="mt-10 space-y-4">
            {[
              [MapPin, "Serving healthcare providers across India"],
              [Mail, "Business email — add your address"],
              [Phone, "Phone number — add your number"],
              [MessageCircle, "WhatsApp — add your business number"],
            ].map(([Icon,text])=>{const IconComponent=Icon as typeof MapPin;return <div key={text as string} className="flex items-center gap-3 text-sm font-semibold text-[#526173]"><span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-[#0b6b63]"><IconComponent className="h-4 w-4"/></span>{text as string}</div>})}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="rounded-[28px] border border-[#d8e6e3] bg-white p-5 shadow-[0_24px_70px_rgba(15,68,62,0.08)] sm:p-8">
          {submitted ? (
            <div className="grid min-h-[470px] place-items-center text-center" role="status">
              <div><span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#e1f6f1] text-[#0b8b7f]"><CheckCircle2 className="h-8 w-8"/></span><h3 className="mt-6 text-2xl font-bold text-[#0b1535]">Demo request captured</h3><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#647383]">This frontend is working. Your developer can connect the form to your email, CRM or backend endpoint.</p><Button type="button" variant="outline" className="mt-6 rounded-full" onClick={()=>setSubmitted(false)}>Submit another request</Button></div>
            </div>
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                {fields.map((field)=><label key={field.name} className="grid gap-2 text-sm font-bold text-[#263449]">{field.label}<Input name={field.name} type={field.type} placeholder={field.placeholder} required className="h-11 rounded-xl border-[#d8e5e2] bg-[#fbfdfd] px-4 shadow-none"/></label>)}
                <label className="grid gap-2 text-sm font-bold text-[#263449]">Medical Specialty<NativeSelect name="specialty" required className="h-11 w-full rounded-xl border-[#d8e5e2] bg-[#fbfdfd] px-4 shadow-none"><NativeSelectOption value="">Select specialty</NativeSelectOption><NativeSelectOption>General Medicine</NativeSelectOption><NativeSelectOption>Dental</NativeSelectOption><NativeSelectOption>Dermatology</NativeSelectOption><NativeSelectOption>Gynecology</NativeSelectOption><NativeSelectOption>Pediatrics</NativeSelectOption><NativeSelectOption>Other</NativeSelectOption></NativeSelect></label>
                <label className="grid gap-2 text-sm font-bold text-[#263449]">Number of Doctors<NativeSelect name="doctors" required className="h-11 w-full rounded-xl border-[#d8e5e2] bg-[#fbfdfd] px-4 shadow-none"><NativeSelectOption value="">Select range</NativeSelectOption><NativeSelectOption>1</NativeSelectOption><NativeSelectOption>2–5</NativeSelectOption><NativeSelectOption>6–10</NativeSelectOption><NativeSelectOption>11+</NativeSelectOption></NativeSelect></label>
              </div>
              <label className="mt-5 grid gap-2 text-sm font-bold text-[#263449]">Message<Textarea name="message" placeholder="Tell us briefly about your clinic and workflow" className="min-h-28 rounded-xl border-[#d8e5e2] bg-[#fbfdfd] p-4 shadow-none"/></label>
              <Button type="submit" size="lg" className="mt-6 h-12 w-full rounded-full bg-[#0b6b63] text-white hover:bg-[#07574f]">Request a Demo <ArrowRight/></Button>
              <p className="mt-4 text-center text-xs leading-5 text-[#84909b]">Demo form UI only. Connect your preferred CRM or backend endpoint before production.</p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
