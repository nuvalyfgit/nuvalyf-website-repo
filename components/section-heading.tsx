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
          inverse ? "text-[#39dbc0]" : "text-[#087a70]",
        )}
      >
        <span
          className={cn(
            "h-px w-6",
            inverse ? "bg-[#39dbc0]/50" : "bg-[#087a70]/40",
          )}
          aria-hidden="true"
        />
        {eyebrow}
      </p>

      <h2 className={cn("t-h2 font-display", inverse ? "text-white" : "text-[#0b1535]")}>{title}</h2>

      {description && (
        <p className={cn("t-lead mt-6", inverse ? "text-white/55" : "text-[#526173]")}>{description}</p>
      )}
    </div>
  );
}
