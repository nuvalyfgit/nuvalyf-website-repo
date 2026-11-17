import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
}) {
  return (
    <div className={cn("reveal max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p
        className={cn(
          "t-eyebrow mb-5 flex items-center gap-2.5",
          align === "center" && "justify-center",
          inverse ? "text-[#14B8A6]" : "text-[#047857]",
        )}
      >
        <span
          className={cn(
            "h-px w-6",
            inverse ? "bg-[#14B8A6]/50" : "bg-[#047857]/40",
          )}
          aria-hidden="true"
        />
        {eyebrow}
      </p>

      <h2 className={cn("t-h2 font-display", inverse ? "text-white" : "text-[#0F172A]")}>{title}</h2>

      {description && (
        <p className={cn("t-lead mt-6", inverse ? "text-white/55" : "text-[#475569]")}>{description}</p>
      )}
    </div>
  );
}
