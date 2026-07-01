import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { fetchPostBySlug, fetchPosts, type PostListItem } from '@/lib/sanity/blog';
import { urlForImage } from '@/lib/sanity/image';
import { readLabel, formatPostDate } from '@/lib/readTime';
import { ReadingProgress } from '@/components/blog/ReadingProgress';

export const revalidate = 60;
export const dynamic = 'force-dynamic';

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await fetchPostBySlug(params.slug);
  if (!post) return { title: 'Blog - FlowGenixAI' };
  return {
    title: `${post.title} - FlowGenixAI`,
    description: post.excerpt || 'Notes from the build.',
  };
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const src = urlForImage(value)?.width(1600).fit('max').url();
      if (!src) return null;
      return <Image src={src} alt={value?.alt || ''} width={1600} height={900} />;
    },
  },
  block: {
    h1: ({ children }) => <h2>{children}</h2>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h3>{children}</h3>,
    normal: ({ children }) => <p>{children}</p>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => <code>{children}</code>,
    link: ({ children, value }) => (
      <a href={value?.href ?? '#'} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

const RELATED_STRIPED =
  'repeating-linear-gradient(135deg,rgba(255,255,255,0.035) 0 10px,transparent 10px 20px),var(--bg-base)';

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await fetchPostBySlug(params.slug);
  if (!post) notFound();

  // Related posts from the existing data layer: prefer shared category, then recency.
  const { items: rawPool } = await fetchPosts({ page: 1, limit: 100 });
  const pool = rawPool as PostListItem[];
  const currentCats = new Set((post.categories || []).map((c) => c.slug));
  const related = pool
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const aShared = (a.categories || []).some((c) => currentCats.has(c.slug)) ? 1 : 0;
      const bShared = (b.categories || []).some((c) => currentCats.has(c.slug)) ? 1 : 0;
      return bShared - aShared;
    })
    .slice(0, 3);

  const meta = [formatPostDate(post.publishedAt), readLabel(post.readingChars, true)]
    .filter(Boolean)
    .join(' · ');

  return (
    <div className="relative overflow-x-hidden bg-bg-base font-body text-text-body">
      <ReadingProgress />

      <article>
        {/* header */}
        <section className="relative overflow-hidden pb-[clamp(28px,3vw,40px)] pt-[clamp(40px,5vw,72px)]">
          <div className="pointer-events-none absolute inset-0 bg-glow-brand" />
          <div className="relative mx-auto flex max-w-[760px] flex-col gap-6 px-[var(--gutter)]">
            <Link
              href="/blog"
              className="self-start font-mono text-[12px] tracking-[0.06em] text-text-muted transition-colors hover:text-brand"
            >
              &larr; All articles
            </Link>
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.categories.map((c) => (
                  <span
                    key={c.slug}
                    className="rounded-full border border-[var(--brand-40)] bg-[var(--brand-12)] px-[11px] py-1 text-[11px] font-semibold tracking-[0.04em] text-brand"
                  >
                    {c.title}
                  </span>
                ))}
              </div>
            )}
            <h1 className="m-0 font-display text-[clamp(2.3rem,5vw,3.6rem)] font-extrabold leading-[1.06] tracking-[-0.035em] text-text-strong [text-wrap:balance]">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="m-0 text-[clamp(1.15rem,1.6vw,1.35rem)] leading-[1.55] text-text-muted">
                {post.excerpt}
              </p>
            )}
            <div className="flex items-center gap-[13px] pt-1.5">
              <span className="h-[42px] w-[42px] flex-none rounded-full border border-[var(--brand-40)] bg-[var(--brand-12)]" />
              <div className="flex flex-col gap-[3px]">
                <span className="text-[15px] font-semibold text-text-strong">Ben Foroodian</span>
                <span className="font-mono text-[12px] text-text-faint">{meta}</span>
              </div>
            </div>
          </div>
        </section>

        {/* cover */}
        <section className="mx-auto max-w-[1080px] px-[var(--gutter)]">
          <div
            className="relative flex aspect-[21/9] items-center justify-center overflow-hidden rounded-[var(--radius-xl)] border border-hairline shadow-fgx-md"
            style={{
              background:
                'repeating-linear-gradient(135deg,rgba(255,255,255,0.035) 0 12px,transparent 12px 24px),var(--bg-deep)',
            }}
          >
            {post.mainImage?.asset?.url ? (
              <Image
                src={post.mainImage.asset.url}
                alt={post.mainImage.alt || post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1080px) 100vw, 1080px"
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-glow-soft" />
                <span className="relative font-mono text-[13px] text-text-faint">
                  // cover image 1680×720
                </span>
              </>
            )}
          </div>
        </section>

        {/* body */}
        <section className="mx-auto max-w-[760px] px-[var(--gutter)] pb-[clamp(48px,6vw,80px)] pt-[clamp(40px,5vw,64px)]">
          {post.body && (
            <div className="fgx-prose">
              <PortableText value={post.body} components={portableTextComponents} />
            </div>
          )}
        </section>
      </article>

      {/* author bio */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-[760px] px-[var(--gutter)] py-[clamp(36px,4vw,52px)]">
          <div className="flex flex-wrap items-start gap-[22px]">
            <span className="h-16 w-16 flex-none rounded-full border border-[var(--brand-40)] bg-[var(--brand-12)]" />
            <div className="flex min-w-[240px] flex-1 flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-faint">
                Written by
              </span>
              <span className="font-display text-[1.35rem] font-bold tracking-[-0.02em] text-text-strong">
                Ben Foroodian
              </span>
              <p className="m-0 max-w-[54ch] text-[1rem] leading-[1.6] text-text-muted">
                Founder of FlowGenixAI. Twenty years turning messy operations into systems that
                work, now building AI assistants, dashboards, and automations for businesses that
                cannot afford to drop the ball.
              </p>
              <Link
                href="/about"
                className="mt-1 self-start text-[15px] font-semibold text-brand transition-colors hover:text-brand-hover"
              >
                More about Ben &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* related posts */}
      {related.length > 0 && (
        <section className="border-t border-hairline bg-bg-deep py-[clamp(64px,8vw,120px)]">
          <div className="mx-auto max-w-container px-[var(--gutter)]">
            <div className="mb-[clamp(32px,4vw,48px)] flex flex-wrap items-end justify-between gap-6">
              <h2 className="m-0 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-text-strong">
                Related posts
              </h2>
              <Link
                href="/blog"
                className="whitespace-nowrap text-[16px] font-semibold text-brand transition-colors hover:text-brand-hover"
              >
                All posts &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rp: PostListItem) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-hairline bg-surface-card shadow-fgx-md transition-all duration-300 hover:-translate-y-[3px] hover:border-hairline-strong"
                >
                  <div
                    className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-hairline"
                    style={{ background: RELATED_STRIPED }}
                  >
                    {rp.mainImage?.asset?.url ? (
                      <Image
                        src={rp.mainImage.asset.url}
                        alt={rp.mainImage.alt || rp.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <span className="font-mono text-[12px] text-text-faint">// cover 800×500</span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    {rp.categories && rp.categories.length > 0 && (
                      <div className="flex flex-wrap gap-[7px]">
                        {rp.categories.slice(0, 2).map((c) => (
                          <span
                            key={c.slug}
                            className="rounded-full border border-[var(--brand-40)] bg-[var(--brand-12)] px-[10px] py-1 text-[10.5px] font-semibold tracking-[0.04em] text-brand"
                          >
                            {c.title}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3 className="m-0 font-display text-[1.25rem] font-bold leading-[1.22] tracking-[-0.02em] text-text-strong [text-wrap:pretty]">
                      {rp.title}
                    </h3>
                    <div className="mt-auto flex items-center justify-between border-t border-hairline-soft pt-[14px]">
                      <span className="font-mono text-[12px] text-text-faint">
                        {formatPostDate(rp.publishedAt)}
                      </span>
                      {rp.readingChars ? (
                        <span className="font-mono text-[12px] text-text-faint">
                          {readLabel(rp.readingChars)}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-hairline py-[clamp(80px,11vw,160px)]">
        <div className="pointer-events-none absolute inset-0 bg-glow-brand" />
        <img
          src="/brand/fgx-head.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-[-34%] left-[-8%] w-[min(520px,44vw)] opacity-[0.06]"
        />
        <div className="relative mx-auto flex max-w-[820px] flex-col items-center gap-[26px] px-[var(--gutter)] text-center">
          <h2 className="m-0 font-display text-[clamp(2.2rem,4.6vw,3.6rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-text-strong [text-wrap:balance]">
            Ready to automate your first workflow?
          </h2>
          <p className="m-0 max-w-[46ch] text-[clamp(1.1rem,1.5vw,1.3rem)] leading-[1.6] text-text-body">
            A 30 minute strategy call, no pitch deck. You will leave knowing exactly what is worth
            automating first.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-[14px] border border-transparent bg-brand px-9 py-[19px] text-[18px] font-semibold tracking-[-0.01em] text-[#06141D] transition-all duration-150 hover:bg-brand-hover hover:shadow-fgx-brand active:translate-y-px"
          >
            Book a strategy call
          </Link>
        </div>
      </section>
    </div>
  );
}
