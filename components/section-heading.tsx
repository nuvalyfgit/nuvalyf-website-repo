import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, description, align = "left", inverse = false }: { eyebrow: string; title: string; description?: string; align?: "left" | "center"; inverse?: boolean }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p className={cn("mb-4 text-sm font-bold uppercase tracking-[0.2em]", inverse ? "text-[#39dbc0]" : "text-[#087a70]")}>{eyebrow}</p>
      <h2 className={cn("font-display text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl", inverse ? "text-white" : "text-[#0b1535]")}>{title}</h2>
      {description && <p className={cn("mt-5 text-base leading-8 sm:text-lg", inverse ? "text-white/65" : "text-[#526173]")}>{description}</p>}
    </div>
  );
}
