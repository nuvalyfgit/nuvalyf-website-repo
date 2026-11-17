import type { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import Markdoc from "@markdoc/markdoc";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/page-parts";
import { PageShell } from "@/components/page-shell";
import { categoryLabels, formatDate, getPosts, getRelatedPosts, reader } from "@/lib/cms";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await reader.collections.posts.read(slug);
  if (!post) return {};
  const title = post.seo.title || post.title;
  const description = post.seo.description || post.summary;
  return {
    title,
    description,
    alternates: { canonical: `/resources/${slug}` },
    openGraph: { type: "article", title, description, publishedTime: post.date ?? undefined, images: post.cover ? [{ url: post.cover, alt: post.coverAlt || post.title }] : undefined },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await reader.collections.posts.read(slug);
  if (!post || post.draft) notFound();
  const { node } = await post.content();
  const body = Markdoc.renderers.react(Markdoc.transform(node), React);
  const related = await getRelatedPosts(slug, post.tags);

  return (
    <PageShell crumbs={[["Resources", "/resources"], [post.title, `/resources/${slug}`]]}>
      <article className="bg-white">
        <header className="bg-[#0B1120] py-16 text-white sm:py-24">
          <div className="mx-auto max-w-3xl px-5">
            <a href="/resources" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 hover:text-white"><ArrowLeft className="h-4 w-4" />All resources</a>
            <p className="mt-8 text-xs font-bold uppercase tracking-wider text-[#14B8A6]">{categoryLabels[post.category] ?? post.category}</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">{post.title}</h1>
            <p className="mt-5 text-sm text-white/55">{post.author} · {formatDate(post.date)}</p>
          </div>
        </header>
        {post.cover && (
          <div className="mx-auto -mt-10 max-w-4xl px-5">
            <Image src={post.cover} alt={post.coverAlt || post.title} width={1200} height={630} priority className="aspect-[1200/630] w-full rounded-[22px] object-cover shadow-[0_20px_60px_rgba(15,23,42,0.18)]" />
          </div>
        )}
        <div className="prose-nuva mx-auto max-w-3xl px-5 py-14">{body}</div>
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
