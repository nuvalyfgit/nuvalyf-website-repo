import Image from "next/image";

type Member = { name: string; role: string; focus?: string; bio?: string; photo?: string | null; linkedin?: string | null };

/** Profile card used on the Team and About pages. Falls back to initials when there is no photo. */
export function TeamCard({ m, compact = false }: { m: Member; compact?: boolean }) {
  const initials = m.name.split(" ").map((p) => p[0]).slice(0, 2).join("");
  return (
    <article className="card-lift overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-white">
      <div className={`relative ${compact ? "aspect-[4/3]" : "aspect-square"} bg-[linear-gradient(135deg,#ECFDF5_0%,#F1F5F9_100%)]`}>
        {m.photo ? (
          <Image src={m.photo} alt={`${m.name}, ${m.role}`} fill sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="object-cover object-top" />
        ) : (
          <span className="absolute inset-0 grid place-items-center font-display text-5xl font-semibold text-[#059669]/60">{initials}</span>
        )}
      </div>
      <div className="p-6 sm:p-7">
        {m.focus && <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#059669]">{m.focus}</p>}
        <h3 className="mt-2 font-display text-xl font-semibold text-[#0F172A]">{m.name}</h3>
        <p className="mt-0.5 text-sm font-semibold text-[#64748B]">{m.role}</p>
        {!compact && m.bio && <p className="mt-4 text-sm leading-7 text-[#64748B]">{m.bio}</p>}
        {m.linkedin && (
          <a href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on LinkedIn (opens in a new tab)`} className="mt-5 inline-flex h-9 items-center gap-2 rounded-full border border-[#E2E8F0] px-4 text-xs font-bold text-[#059669] transition hover:border-[#059669] hover:bg-[#059669] hover:text-white">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.71h.05a4.17 4.17 0 0 1 3.75-2.06c4 0 4.75 2.64 4.75 6.07V21h-4v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21h-4V9Z" /></svg>
            LinkedIn
          </a>
        )}
      </div>
    </article>
  );
}
