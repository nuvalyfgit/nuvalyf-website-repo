import Image from "next/image";
import { Target, Telescope, Workflow } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import affanPortrait from "@/public/Affan.jpeg";
import wasiqPortrait from "@/public/mohammed-wasiq.png";

const founders = [
  {
    name: "Syed Affan Zaid",
    linkedin: "https://www.linkedin.com/in/syed-affan-816062265/",
    photo: affanPortrait,
    role: "Founder & CEO",
    highlight: "Business, Sales & Growth",
    bio: "Syed Affan Zaid leads NUVA LYF’s business strategy, sales, business development, partnerships and growth. With a B.Tech background, he focuses on understanding the needs of doctors, clinics and healthcare organisations and translating them into business opportunities and product direction across India.",
  },
  {
    name: "Wasiq Mohideen",
    photo: wasiqPortrait,
    role: "Co-Founder & CTO",
    highlight: "Product, Technology & Development",
    bio: "Wasiq Mohideen leads the complete product and technology development of NUVA LYF. With a B.Tech background, he is responsible for product architecture, software development, technical implementation and the platform’s continuous evolution.",
  },
];

export function AboutTeamSection() {
  return (
    <>
      <section id="about" className="grain relative overflow-hidden bg-[#070d24] py-24 sm:py-32">
        <div className="site-container grid gap-14 lg:grid-cols-[.9fr_1.1fr]">
          <SectionHeading eyebrow="About NUVA LYF" title="Building better digital foundations for healthcare." description="Healthcare professionals should spend more time caring for patients and less time managing disconnected systems. NUVA LYF is building a simple, secure digital foundation for clinics across India." inverse />
          <div className="reveal-stagger grid gap-4 sm:grid-cols-3">
            {[
              [Target,"Our mission","Make modern clinic technology simple, secure and accessible across India."],
              [Telescope,"Our vision","Help create a more connected and efficient healthcare ecosystem."],
              [Workflow,"Our approach","Build around real clinic workflows instead of forcing complex software."],
            ].map(([Icon,title,description])=>{const IconComponent=Icon as typeof Target;return <article key={title as string} className="card-lift rounded-[22px] border border-white/10 bg-white/[0.045] p-5"><IconComponent className="h-6 w-6 text-[#39dbc0]"/><h3 className="mt-8 font-bold text-white">{title as string}</h3><p className="mt-3 text-sm leading-6 text-white/55">{description as string}</p></article>})}
          </div>
        </div>
      </section>
      <section id="team" className="bg-[#f9fcfb] py-24 sm:py-32">
        <div className="site-container">
          <SectionHeading eyebrow="Founder-led" title="Meet the people building NUVA LYF." description="Business vision and technology execution working together to build a better digital experience for healthcare providers." align="center" />
          <div className="reveal-stagger mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2">
            {founders.map((founder)=><article key={founder.name} className="card-lift overflow-hidden rounded-[26px] border border-[#e1ebe9] bg-white">
              {/* Both portraits are tall studio shots, so the square frame is
                  anchored to the top to keep faces from being cropped. */}
              <div className="relative aspect-square bg-[linear-gradient(135deg,#eef8f6_0%,#f7f8fc_100%)]">
                <Image
                  src={founder.photo}
                  alt={`${founder.name}, ${founder.role} of NUVA LYF`}
                  fill
                  sizes="(min-width: 768px) 500px, 100vw"
                  placeholder="blur"
                  className="object-cover object-top"
                />
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0b8b7f]">{founder.highlight}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-[#0b1535]">{founder.name}</h3>
                <p className="mt-1 text-sm font-semibold text-[#5f6d7a]">{founder.role}</p>
                <p className="mt-5 text-sm leading-7 text-[#647383]">{founder.bio}</p>
                {/* Rendered only when a real profile exists - a dead chip is
                    worse than no chip. */}
                {founder.linkedin && (
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex h-10 items-center gap-2 rounded-full border border-[#d6e3e0] px-4 text-xs font-bold text-[#0b6b63] transition hover:border-[#0b6b63] hover:bg-[#0b6b63] hover:text-white"
                    aria-label={`${founder.name} on LinkedIn (opens in a new tab)`}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.71h.05a4.17 4.17 0 0 1 3.75-2.06c4 0 4.75 2.64 4.75 6.07V21h-4v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21h-4V9Z" />
                    </svg>
                    LinkedIn
                  </a>
                )}
              </div>
            </article>)}
          </div>
        </div>
      </section>
    </>
  );
}
