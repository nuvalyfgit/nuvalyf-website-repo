/* Custom home for the NuvaLyf CMS: branded hero with content health, key counts, recent posts,
   website numbers, content mix, recent activity, to-dos, quick edits and live-page shortcuts. */
import config from "@payload-config";
import { getPayload } from "payload";

const A = "/admin";
const TZ = "Asia/Kolkata";

const fmt = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: TZ }) : "";

function ago(d?: string | null) {
  if (!d) return "";
  const s = Math.max(0, (Date.now() - new Date(d).getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`;
  if (s < 86400 * 7) return `${Math.floor(s / 86400)} d ago`;
  return fmt(d);
}

function greeting() {
  const h = Number(new Date().toLocaleString("en-GB", { hour: "numeric", hour12: false, timeZone: TZ }));
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

const CATEGORIES: Record<string, string> = {
  guides: "Guides",
  product: "Product updates",
  operations: "Clinic operations",
  news: "News",
};

type Doc = { id: string | number; updatedAt?: string; [k: string]: unknown };

export async function Dashboard({ user }: { user?: { email?: string; name?: string } | null }) {
  const payload = await getPayload({ config });
  const latest = (collection: "posts" | "team" | "jobs" | "testimonials" | "media" | "pages") =>
    payload.find({ collection, sort: "-updatedAt", limit: 4, depth: 0, draft: true }).then((r) => r.docs as unknown as Doc[]);

  const [published, drafts, team, jobs, testimonials, media, allPosts, stats, faq, settings, milestones, lTeam, lJobs, lTest, lMedia, lPages] =
    await Promise.all([
      payload.count({ collection: "posts", where: { _status: { equals: "published" } } }),
      payload.count({ collection: "posts", where: { _status: { equals: "draft" } } }),
      payload.count({ collection: "team" }),
      payload.count({ collection: "jobs", where: { open: { equals: true } } }),
      payload.count({ collection: "testimonials" }),
      payload.count({ collection: "media" }),
      payload.find({ collection: "posts", sort: "-updatedAt", limit: 100, depth: 0, draft: true }),
      payload.findGlobal({ slug: "stats", depth: 0 }),
      payload.findGlobal({ slug: "faq", depth: 0 }),
      payload.findGlobal({ slug: "settings", depth: 0 }),
      payload.findGlobal({ slug: "milestones", depth: 0 }),
      latest("team"),
      latest("jobs"),
      latest("testimonials"),
      latest("media"),
      latest("pages"),
    ]);

  const posts = allPosts.docs as unknown as (Doc & { title?: string; _status?: string; category?: string; cover?: unknown; meta?: { description?: string } })[];
  const name = user?.name || user?.email?.split("@")[0] || "there";
  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: TZ });

  /* ---- Content health ---- */
  const noCover = posts.filter((p) => !p.cover).length;
  const noMeta = posts.filter((p) => !p.meta?.description).length;
  const checks = [
    { ok: published.totalDocs >= 10, text: `Publish ${Math.max(0, 10 - published.totalDocs)} more post${10 - published.totalDocs === 1 ? "" : "s"} to reach 10`, href: `${A}/collections/posts/create` },
    { ok: testimonials.totalDocs > 0, text: "Add your first doctor testimonial", href: `${A}/collections/testimonials/create` },
    { ok: Boolean(stats?.patientsServed), text: "Add a real patients-served figure", href: `${A}/globals/stats` },
    { ok: drafts.totalDocs === 0, text: `Review ${drafts.totalDocs} draft post${drafts.totalDocs === 1 ? "" : "s"}`, href: `${A}/collections/posts?where[_status][equals]=draft` },
    { ok: noCover === 0, text: `${noCover} post${noCover === 1 ? " needs" : "s need"} a cover image`, href: `${A}/collections/posts` },
    { ok: noMeta === 0, text: `${noMeta} post${noMeta === 1 ? " needs" : "s need"} an SEO description`, href: `${A}/collections/posts` },
  ];
  const passed = checks.filter((c) => c.ok).length;
  const score = Math.round((passed / checks.length) * 100);
  const todos = checks.filter((c) => !c.ok);
  const R = 34;
  const C = 2 * Math.PI * R;

  /* ---- Cards ---- */
  const cards = [
    { key: "posts", label: "Published posts", value: published.totalDocs, note: `${drafts.totalDocs} draft${drafts.totalDocs === 1 ? "" : "s"}`, href: `${A}/collections/posts` },
    { key: "jobs", label: "Open roles", value: jobs.totalDocs, note: "on the Careers page", href: `${A}/collections/jobs` },
    { key: "team", label: "Team members", value: team.totalDocs, note: "on About and Home", href: `${A}/collections/team` },
    { key: "testimonials", label: "Testimonials", value: testimonials.totalDocs, note: "with written permission", href: `${A}/collections/testimonials` },
  ];

  const numbers = [
    { label: "Clinics onboarded", value: stats?.clinics },
    { label: "Countries live", value: stats?.countries },
    { label: "Patients served", value: stats?.patientsServed, suffix: stats?.patientsServedPeriod },
  ];

  /* ---- Content mix ---- */
  const mix = Object.entries(CATEGORIES).map(([value, label]) => ({
    label,
    count: posts.filter((p) => (p.category || "guides") === value).length,
  }));
  const mixMax = Math.max(1, ...mix.map((m) => m.count));

  /* ---- Recent activity (all collections + globals) ---- */
  const t = (d: Doc, key: string) => (typeof d[key] === "string" ? (d[key] as string) : "");
  const activity = [
    ...posts.slice(0, 4).map((d) => ({ key: "posts", what: "Blog post", title: t(d, "title"), at: d.updatedAt, href: `${A}/collections/posts/${d.id}` })),
    ...lTeam.map((d) => ({ key: "team", what: "Team", title: t(d, "name"), at: d.updatedAt, href: `${A}/collections/team/${d.id}` })),
    ...lJobs.map((d) => ({ key: "jobs", what: "Role", title: t(d, "title"), at: d.updatedAt, href: `${A}/collections/jobs/${d.id}` })),
    ...lTest.map((d) => ({ key: "testimonials", what: "Testimonial", title: t(d, "name"), at: d.updatedAt, href: `${A}/collections/testimonials/${d.id}` })),
    ...lMedia.map((d) => ({ key: "media", what: "Image", title: t(d, "alt") || t(d, "filename"), at: d.updatedAt, href: `${A}/collections/media/${d.id}` })),
    ...lPages.map((d) => ({ key: "pages", what: "Page SEO", title: t(d, "label"), at: d.updatedAt, href: `${A}/collections/pages/${d.id}` })),
    { key: "stats", what: "Website numbers", title: "Company statistics", at: stats?.updatedAt, href: `${A}/globals/stats` },
    { key: "faq", what: "FAQ", title: "Homepage FAQ", at: faq?.updatedAt, href: `${A}/globals/faq` },
    { key: "settings", what: "Settings", title: "Site settings", at: settings?.updatedAt, href: `${A}/globals/settings` },
    { key: "milestones", what: "Milestones", title: "Milestones", at: milestones?.updatedAt, href: `${A}/globals/milestones` },
  ]
    .filter((x) => x.at)
    .sort((a, b) => new Date(b.at as string).getTime() - new Date(a.at as string).getTime())
    .slice(0, 6);

  const shortcuts = [
    { key: "faq", label: "Homepage FAQ", href: `${A}/globals/faq` },
    { key: "milestones", label: "Milestones", href: `${A}/globals/milestones` },
    { key: "settings", label: "Site settings", href: `${A}/globals/settings` },
    { key: "pages", label: "Page SEO", href: `${A}/collections/pages` },
    { key: "media", label: `Media library (${media.totalDocs})`, href: `${A}/collections/media` },
  ];

  const livePages = [
    ["Home", "/"],
    ["Products", "/products"],
    ["DocConnect", "/docconnect"],
    ["Blogs", "/blogs"],
    ["About", "/about"],
    ["Careers", "/careers"],
    ["Contact", "/contact"],
  ];

  return (
    <div className="nv-dash">
      {/* ---------- Hero ---------- */}
      <header className="nv-dash__hero">
        <div className="nv-dash__hero-main">
          <div className="nv-dash__brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nuva-lyf-logo-light.png" alt="NuvaLyf" />
            <span>Content studio</span>
          </div>
          <p className="nv-dash__eyebrow">{today}</p>
          <h1>
            {greeting()}, <span>{name}</span>
          </h1>
          <p className="nv-dash__lead">Here is what&apos;s live on nuvalyf.com and what needs your attention.</p>
          <div className="nv-dash__actions">
            <a className="nv-btn nv-btn--primary" href={`${A}/collections/posts/create`}>+ New blog post</a>
            <a className="nv-btn" href={`${A}/globals/stats`}>Update numbers</a>
            <a className="nv-btn" href="/" target="_blank" rel="noreferrer">View website ↗</a>
          </div>
        </div>

        <a className="nv-health" href="#nv-todo" aria-label={`Content health ${score} percent`}>
          <svg viewBox="0 0 80 80" className="nv-health__ring" aria-hidden>
            <circle cx="40" cy="40" r={R} className="nv-health__track" />
            <circle
              cx="40" cy="40" r={R} className="nv-health__bar"
              strokeDasharray={C} strokeDashoffset={C - (C * score) / 100}
            />
          </svg>
          <span className="nv-health__score">{score}<small>%</small></span>
          <span className="nv-health__label">Content health</span>
          <span className="nv-health__sub">{passed} of {checks.length} checks passed</span>
        </a>
      </header>

      {/* ---------- Count cards ---------- */}
      <section className="nv-dash__cards">
        {cards.map((c) => (
          <a key={c.label} href={c.href} className={`nv-card nv-ico-${c.key}`}>
            <span className="nv-card__icon" aria-hidden />
            <span className="nv-card__label">{c.label}</span>
            <strong className="nv-card__value">{c.value}</strong>
            <span className="nv-card__note">{c.note}</span>
          </a>
        ))}
      </section>

      {/* ---------- Posts + numbers ---------- */}
      <section className="nv-dash__grid">
        <div className="nv-panel">
          <div className="nv-panel__head">
            <h2>Recent blog posts</h2>
            <a href={`${A}/collections/posts`}>All posts →</a>
          </div>
          {posts.length ? (
            <ul className="nv-list">
              {posts.slice(0, 5).map((p) => (
                <li key={p.id}>
                  <a href={`${A}/collections/posts/${p.id}`}>
                    <span className="nv-list__title">{p.title || "Untitled"}</span>
                    <span className="nv-list__meta">
                      <span className="nv-list__cat">{CATEGORIES[p.category || "guides"]}</span>
                      <span className={`nv-pill nv-pill--${p._status === "published" ? "live" : "draft"}`}>
                        {p._status === "published" ? "Live" : "Draft"}
                      </span>
                      {fmt(p.updatedAt)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="nv-empty">No posts yet. <a href={`${A}/collections/posts/create`}>Write the first one →</a></p>
          )}
        </div>

        <div className="nv-panel">
          <div className="nv-panel__head">
            <h2>Website numbers</h2>
            <a href={`${A}/globals/stats`}>Edit →</a>
          </div>
          <dl className="nv-numbers">
            {numbers.map((n) => (
              <div key={n.label}>
                <dt>{n.label}</dt>
                <dd>{n.value != null ? <>{n.value.toLocaleString("en-IN")}{n.suffix ? <small> {n.suffix}</small> : null}</> : <em>Hidden</em>}</dd>
              </div>
            ))}
          </dl>
          <div className="nv-mix">
            <p className="nv-mix__title">Blog mix</p>
            {mix.map((m) => (
              <div key={m.label} className="nv-mix__row">
                <span>{m.label}</span>
                <span className="nv-mix__bar"><i style={{ width: `${(m.count / mixMax) * 100}%` }} /></span>
                <b>{m.count}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Activity / to-do / quick edits ---------- */}
      <section className="nv-dash__grid3">
        <div className="nv-panel">
          <div className="nv-panel__head"><h2>Recent activity</h2></div>
          {activity.length ? (
            <ul className="nv-activity">
              {activity.map((a, i) => (
                <li key={`${a.href}-${i}`}>
                  <a href={a.href} className={`nv-ico-${a.key}`}>
                    <i className="nv-activity__icon" aria-hidden />
                    <span className="nv-activity__body">
                      <b>{a.title || a.what}</b>
                      <small>{a.what} · updated {ago(a.at)}</small>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="nv-empty">Nothing edited yet.</p>
          )}
        </div>

        <div className="nv-panel" id="nv-todo">
          <div className="nv-panel__head">
            <h2>To do</h2>
            <span className="nv-count">{todos.length}</span>
          </div>
          {todos.length ? (
            <ul className="nv-todo">
              {todos.map((t) => (
                <li key={t.text}><a href={t.href}>{t.text}</a></li>
              ))}
            </ul>
          ) : (
            <p className="nv-empty">All caught up. Nice work.</p>
          )}
        </div>

        <div className="nv-panel">
          <div className="nv-panel__head"><h2>Quick edits</h2></div>
          <ul className="nv-links">
            {shortcuts.map((s) => (
              <li key={s.label}>
                <a href={s.href} className={`nv-ico-${s.key}`}>
                  <i className="nv-links__icon" aria-hidden />
                  <b>{s.label}</b>
                  <span aria-hidden>→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Live pages ---------- */}
      <section className="nv-live">
        <span className="nv-live__dot" aria-hidden />
        <span className="nv-live__label">Open the live site</span>
        <div className="nv-live__links">
          {livePages.map(([label, href]) => (
            <a key={href} href={href} target="_blank" rel="noreferrer">{label} ↗</a>
          ))}
        </div>
      </section>

      <h2 className="nv-dash__section">Everything in the CMS</h2>
    </div>
  );
}
