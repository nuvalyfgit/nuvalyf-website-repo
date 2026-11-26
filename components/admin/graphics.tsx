/* NuvaLyf branding for the Payload admin (login logo, nav icon, nav footer link, login intro). */

export function Logo() {
  return (
    <span className="nv-admin-logo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/nuva-lyf-logo.png" alt="NuvaLyf" className="nv-admin-logo__light" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/nuva-lyf-logo-light.png" alt="NuvaLyf" className="nv-admin-logo__dark" />
    </span>
  );
}

/** Full logo at the top of the sidebar. */
export function NavLogo() {
  return (
    <a href="/admin" className="nv-nav-logo" aria-label="NuvaLyf CMS home">
      <Logo />
      <span className="nv-nav-logo__tag">CMS</span>
    </a>
  );
}

export function Icon() {
  return (
    <span className="nv-admin-icon" aria-label="NuvaLyf CMS">
      N
    </span>
  );
}

export function BeforeLogin() {
  return (
    <div className="nv-login-intro">
      <h1>Welcome back</h1>
      <p>Sign in to manage the NuvaLyf website: blog posts, numbers, team and SEO.</p>
    </div>
  );
}

export function NavFooter() {
  return (
    <a className="nv-nav-site" href="/" target="_blank" rel="noreferrer">
      View website <span aria-hidden>↗</span>
    </a>
  );
}
