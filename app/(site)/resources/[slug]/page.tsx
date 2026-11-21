import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/page-parts";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { categoryLabels, formatDate, getPost, getPosts, getRelatedPosts } from "@/lib/cms";

// New and edited posts appear without a redeploy: the CMS revalidates on publish, and every 10 minutes as a fallback.
export const dynamicParams = true;
export const revalidate = 600;

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const title = post.seo.title || post.title;
  const description = post.seo.description || post.summary;
  return {
    title,
    description,
    alternates: { canonical: `/resources/${slug}` },
    openGraph: { type: "article", title, description, publishedTime: post.date ?? undefined, modifiedTime: post.updated, images: (post.seo.image || post.cover) ? [{ url: (post.seo.image || post.cover)!, alt: post.coverAlt }] : undefined },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const related = await getRelatedPosts(slug, post.tags);

  return (
    <PageShell crumbs={[["Resources", "/resources"], [post.title, `/resources/${slug}`]]}>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.seo.description || post.summary,
        datePublished: post.date, dateModified: post.updated, author: { "@type": "Organization", name: post.author },
        publisher: { "@type": "Organization", name: "NuvaLyf", logo: { "@type": "ImageObject", url: "https://nuvalyf.com/nuva-lyf-logo.png" } },
        image: post.cover ? [post.cover.startsWith("http") ? post.cover : `https://nuvalyf.com${post.cover}`] : undefined,
        mainEntityOfPage: `https://nuvalyf.com/resources/${slug}`,
      }} />
      <article className="bg-white">
        <header className="nv-hero relative py-16 text-white sm:py-24">
          <div className="nv-grid" />
          <div className="mx-auto max-w-3xl px-5">
            <a href="/resources" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 hover:text-white"><ArrowLeft className="h-4 w-4" />All resources</a>
            <p className="mt-8 text-xs font-bold uppercase tracking-wider text-[#14B8A6]">{categoryLabels[post.category] ?? post.category}</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">{post.title}</h1>
            <p className="mt-5 text-sm text-white/55">{post.author} · {formatDate(post.date)}</p>
          </div>
        </header>
        {post.cover && (
          <div className="mx-auto -mt-10 max-w-4xl px-5">
            <Image src={post.cover} alt={post.coverAlt} width={1200} height={630} priority className="aspect-[1200/630] w-full rounded-[22px] object-cover shadow-[0_20px_60px_rgba(15,23,42,0.18)]" />
          </div>
        )}
        <div className="prose-nuva mx-auto max-w-3xl px-5 py-14"><RichText data={post.content} /></div>
        {post.tags.length > 0 && (
          <div className="mx-auto flex max-w-3xl flex-wrap gap-2 px-5 pb-14">
            {post.tags.map((t) => <span key={t} className="rounded-full bg-[#F1F5F9] px-3 py-1 text-xs font-semibold text-[#475569]">{t}</span>)}
          </div>
        )}
      </article>
      {related.length > 0 && (
        <section className="border-t border-[#E2E8F0] bg-[#F8FAFC] py-16">
          <div className="site-container">
            <h2 className="font-display text-2xl font-semibold text-[#0F172A]">Related reading</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map((r) => (
                <a key={r.slug} href={`/resources/${r.slug}`} className="card-lift group flex flex-col rounded-[20px] border border-[#E2E8F0] bg-white p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">{categoryLabels[r.category] ?? r.category}</span>
                  <h3 className="mt-2 flex-1 text-lg font-bold leading-snug text-[#0F172A]">{r.title}</h3>
                  <ArrowRight className="mt-4 h-4 w-4 text-[#059669] transition group-hover:translate-x-1" />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBand />
    </PageShell>
  );
}
