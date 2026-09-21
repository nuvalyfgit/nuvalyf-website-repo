import { cn } from "@/lib/utils";

export function BrandLogo({ inverse = false, compact = false }: { inverse?: boolean; compact?: boolean }) {
  return (
    <a href="#home" className="inline-flex items-center gap-3" aria-label="NUVA LYF home">
      <svg className="h-10 w-10 shrink-0" viewBox="0 0 64 64" role="img" aria-label="NUVA LYF mark">
        <defs>
          <linearGradient id="nuva-brand-gradient" x1="10" y1="8" x2="56" y2="56">
            <stop stopColor="#39dbc0" />
            <stop offset="1" stopColor="#7d86ff" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="19" fill={inverse ? "#ffffff" : "#0b1535"} />
        <path d="M17 43V21l30 22V21" fill="none" stroke="url(#nuva-brand-gradient)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="48" cy="15" r="3" fill="#39dbc0" />
      </svg>
      {!compact && (
        <span className={cn("text-[1.05rem] font-extrabold tracking-[0.16em]", inverse ? "text-white" : "text-[#0b1535]")}>NUVA LYF</span>
      )}
    </a>
  );
}
