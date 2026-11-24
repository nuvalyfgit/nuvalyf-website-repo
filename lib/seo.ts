import type { Metadata } from "next";
import { getPageSeo } from "@/lib/cms";

const OG_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: "NuvaLyf clinic management system and online booking" };

/** Page metadata: the built-in defaults, overridden by whatever an editor set in CMS > SEO > Page SEO. Every page gets a share image. */
export async function pageSeo(path: string, base: Metadata): Promise<Metadata> {
  const s = await getPageSeo(path).catch(() => null);
  const title = s?.title ?? (typeof base.title === "string" ? base.title : undefined);
  const description = s?.description ?? base.description ?? undefined;
  return {
    ...base,
    ...(s?.title ? { title: { absolute: s.title } } : {}),
    ...(description ? { description } : {}),
    openGraph: {
      ...base.openGraph,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      images: [s?.image ? { url: s.image } : OG_IMAGE],
    },
    twitter: { card: "summary_large_image", images: [s?.image ?? OG_IMAGE.url] },
  };
}
