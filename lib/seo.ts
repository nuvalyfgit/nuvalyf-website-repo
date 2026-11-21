import type { Metadata } from "next";
import { getPageSeo } from "@/lib/cms";

/** Page metadata: the built-in defaults, overridden by whatever an editor set in CMS > SEO > Page SEO. */
export async function pageSeo(path: string, base: Metadata): Promise<Metadata> {
  const s = await getPageSeo(path).catch(() => null);
  if (!s) return base;
  const title = s.title ?? base.title;
  const description = s.description ?? base.description;
  return {
    ...base,
    ...(s.title ? { title: { absolute: s.title } } : {}),
    description,
    openGraph: {
      ...base.openGraph,
      ...(s.title || base.title ? { title: (s.title ?? (typeof title === "string" ? title : undefined)) || undefined } : {}),
      ...(description ? { description } : {}),
      ...(s.image ? { images: [{ url: s.image }] } : {}),
    },
  };
}
