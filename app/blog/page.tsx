import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { fetchPosts, fetchCategories, PostListItem } from '@/lib/sanity/blog';
import { BlogCard } from '@/components/blog/BlogCard';
import { NewsletterBand } from '@/components/blog/NewsletterBand';
import { readLabel, formatPostDate } from '@/lib/readTime';
import Reveal from '@/components/Reveal';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Blog - FlowGenixAI',
  description: 'Practical takes on AI and automation, written for owners, not engineers.',
};

interface BlogPageProps {
  searchParams: {
    q?: string;
    cat?: string;
    page?: string;
    limit?: string;
  };
}

const SHOW_OPTIONS = ['5', '10', '25', 'all'];

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const q = searchParams.q || '';
  const cat = searchParams.cat || 'all';
  const page = parseInt(searchParams.page || '1', 10);
  const limitParam = searchParams.limit || '10';
  const limit = limitParam === 'all' ? 999999 : parseInt(limitParam, 10);

  const [{ items: rawPosts, total }, categories] = await Promise.all([
    fetchPosts({ q, cat: cat === 'all' ? undefined : cat, page, limit }),
    fetchCategories(),
  ]);
  const posts = rawPosts as PostListItem[];

  const totalPages = Math.ceil(total / limit);

  const buildUrl = (params: { q?: string; cat?: string; page?: number; limit?: string }) => {
    const urlParams = new URLSearchParams();
    if (params.q) urlParams.set('q', params.q);
    if (params.cat && params.cat !== 'all') urlParams.set('cat', params.cat);
    if (params.page && params.page > 1) urlParams.set('page', params.page.toString());
    if (params.limit && params.limit !== '10') urlParams.set('limit', params.limit);
    const query = urlParams.toString();
    return query ? `/blog?${query}` : '/blog';
  };

  const featured = posts[0];
  const rest = posts.slice(1);

  // page-number window (keep existing behavior)
  const pageNumbers: number[] = [];
  for (let i = 0; i < Math.min(totalPages, 5); i++) {
    let n: number;
    if (totalPages <= 5) n = i + 1;
    else if (page <= 3) n = i + 1;
    else if (page >= totalPages - 2) n = totalPages - 4 + i;
    else n = page - 2 + i;
    pageNumbers.push(n);
  }

  const pillBase =
    'whitespace-nowrap rounded-full border px-[15px] py-2 text-[13.5px] font-semibold transition-colors';
  const segBase =
    'min-w-[38px] rounded-[8px] px-3 py-[7px] text-center text-[13px] font-semibold transition-colors';

  return (
    <div className="relative overflow-x-hidden bg-bg-base font-body text-text-body">
      {/* page header */}
      <section className="relative overflow-hidden pb-[clamp(32px,4vw,52px)] pt-[clamp(56px,7vw,104px)]">
        <div className="pointer-events-none absolute inset-0 bg-glow-brand" />
        <img
          src="/brand/fgx-head.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-[-7%] top-[-12%] w-[min(560px,46vw)] opacity-[0.06] saturate-[0.9]"
        />
        <div className="relative mx-auto max-w-container px-[var(--gutter)]">
          <Reveal className="flex max-w-[900px] flex-col gap-[22px]">
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand">
              Blog
            </span>
            <h1 className="m-0 font-display text-[clamp(2.8rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-text-strong [text-wrap:balance]">
              Notes from the build.
            </h1>
            <p className="m-0 max-w-[62ch] text-[clamp(1.1rem,1.5vw,1.3rem)] leading-[1.6] text-text-body">
              Practical takes on AI and automation, written for owners, not engineers.
            </p>
          </Reveal>
        </div>
      </section>

      {/* controls bar: search + show */}
      <section className="mx-auto max-w-container px-[var(--gutter)]">
        <div className="flex flex-wrap items-center justify-between gap-5 pb-6">
          <form action="/blog" method="get" className="relative flex min-w-[240px] max-w-[420px] flex-1 items-center">
            <input type="hidden" name="cat" value={cat} />
            <input type="hidden" name="limit" value={limitParam} />
            <svg
              className="pointer-events-none absolute left-4 h-[15px] w-[15px] text-text-faint"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search articles"
              aria-label="Search articles"
              className="w-full rounded-[12px] border border-hairline-strong bg-surface-card py-[13px] pl-[42px] pr-4 font-body text-[15px] text-text-strong outline-none transition-[border-color,box-shadow] placeholder:text-text-faint focus:border-[var(--brand-40)] focus:shadow-[var(--focus-ring)]"
            />
          </form>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-text-faint">
              Show
            </span>
            <div className="flex gap-[2px] rounded-[11px] border border-hairline-strong bg-surface-card p-[3px]">
              {SHOW_OPTIONS.map((opt) => {
                const active = limitParam === opt;
                return (
                  <Link
                    key={opt}
                    href={buildUrl({ q, cat, page: 1, limit: opt })}
                    className={`${segBase} ${
                      active
                        ? 'border border-transparent bg-brand text-[#06141D]'
                        : 'border border-transparent text-text-muted hover:text-text-strong'
                    }`}
                  >
                    {opt === 'all' ? 'All' : opt}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* category filter */}
      <section className="mx-auto max-w-container px-[var(--gutter)]">
        <div className="flex flex-wrap gap-[10px] border-b border-hairline pb-[clamp(36px,4vw,52px)] pt-1">
          <Link
            href={buildUrl({ q, cat: 'all', page: 1, limit: limitParam })}
            className={`${pillBase} ${
              cat === 'all'
                ? 'border-transparent bg-brand text-[#06141D]'
                : 'border-hairline-strong text-text-muted hover:border-[var(--brand-40)] hover:text-text-strong'
            }`}
          >
            All
          </Link>
          {categories.map((category) => {
            const active = cat === category.slug;
            return (
              <Link
                key={category.slug}
                href={buildUrl({ q, cat: category.slug, page: 1, limit: limitParam })}
                className={`${pillBase} ${
                  active
                    ? 'border-transparent bg-brand text-[#06141D]'
                    : 'border-hairline-strong text-text-muted hover:border-[var(--brand-40)] hover:text-text-strong'
                }`}
              >
                {category.title}
              </Link>
            );
          })}
        </div>
      </section>

      {posts.length === 0 ? (
        <section className="mx-auto max-w-container px-[var(--gutter)]">
          <div className="flex flex-col items-center gap-[10px] py-16 text-center">
            <span className="font-display text-[1.4rem] font-bold text-text-strong">
              No articles match.
            </span>
            <span className="text-[1rem] text-text-muted">
              Try a different category or search term.
            </span>
          </div>
        </section>
      ) : (
        <>
          {/* featured post */}
          {featured && (
            <Reveal as="section" className="mx-auto block max-w-container px-[var(--gutter)] pt-[clamp(40px,5vw,64px)]">
              <Link
                href={`/blog/${featured.slug}`}
                className="group block overflow-hidden rounded-[var(--radius-xl)] border border-hairline bg-surface-card shadow-fgx-md transition-all duration-300 hover:-translate-y-[3px] hover:border-hairline-strong hover:shadow-fgx-lg"
              >
                <div className="grid md:grid-cols-[1.15fr_1fr]">
                  <div
                    className="relative flex min-h-[340px] items-center justify-center border-b border-hairline md:border-b-0 md:border-r"
                    style={{
                      background:
                        'repeating-linear-gradient(135deg,rgba(255,255,255,0.035) 0 11px,transparent 11px 22px),var(--bg-deep)',
                    }}
                  >
                    {featured.mainImage?.asset?.url ? (
                      <Image
                        src={featured.mainImage.asset.url}
                        alt={featured.mainImage.alt || featured.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 55vw"
                        priority
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-glow-soft" />
                        <span className="relative font-mono text-[13px] text-text-faint">
                          // cover image 1280×800
                        </span>
                      </>
                    )}
                    <span className="absolute left-[18px] top-[18px] rounded-full border border-[var(--brand-40)] px-3 py-[6px] text-[11px] font-semibold uppercase tracking-[0.08em] text-brand" style={{ background: 'rgba(16,23,29,0.7)' }}>
                      Featured
                    </span>
                  </div>
                  <div className="flex flex-col justify-center gap-[18px] p-[clamp(28px,3.5vw,48px)]">
                    {featured.categories && featured.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {featured.categories.slice(0, 2).map((c) => (
                          <span
                            key={c.slug}
                            className="rounded-full border border-[var(--brand-40)] bg-[var(--brand-12)] px-[11px] py-1 text-[11px] font-semibold tracking-[0.04em] text-brand"
                          >
                            {c.title}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className="m-0 max-w-[46ch] font-display text-[clamp(1.7rem,2.8vw,2.4rem)] font-bold leading-[1.12] tracking-[-0.025em] text-text-strong [text-wrap:balance]">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="m-0 max-w-[46ch] text-[1.1rem] leading-[1.6] text-text-muted">
                        {featured.excerpt}
                      </p>
                    )}
                    <div className="mt-1.5 flex items-center gap-3">
                      <span className="h-[34px] w-[34px] flex-none rounded-full border border-[var(--brand-40)] bg-[var(--brand-12)]" />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[14px] font-semibold text-text-body">Ben Foroodian</span>
                        <span className="font-mono text-[12px] text-text-faint">
                          {[formatPostDate(featured.publishedAt), featured.readingChars ? readLabel(featured.readingChars) : '']
                            .filter(Boolean)
                            .join(' · ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          {/* post grid */}
          {rest.length > 0 && (
            <section className="mx-auto max-w-container px-[var(--gutter)] pt-[clamp(28px,3vw,40px)]">
              <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post: PostListItem, i) => (
                  <Reveal key={post.slug} delay={i * 80} className="h-full">
                    <BlogCard post={post} />
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* pagination */}
          <section className="mx-auto max-w-container px-[var(--gutter)] pt-[clamp(44px,5vw,64px)]">
            <div className="flex flex-col items-center gap-[18px]">
              <span className="font-mono text-[12px] tracking-[0.06em] text-text-faint">
                Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total}
              </span>
              {totalPages > 1 && (
                <div className="flex items-center gap-2">
                  {page > 1 && (
                    <Link
                      href={buildUrl({ q, cat, page: page - 1, limit: limitParam })}
                      className="flex h-10 items-center rounded-[11px] border border-hairline-strong px-[18px] text-[14px] font-semibold text-text-strong transition-colors hover:border-[var(--brand-40)] hover:bg-white/[0.04]"
                    >
                      &larr; Prev
                    </Link>
                  )}
                  {pageNumbers.map((n) => {
                    const active = n === page;
                    return (
                      <Link
                        key={n}
                        href={buildUrl({ q, cat, page: n, limit: limitParam })}
                        className={`flex h-10 w-10 items-center justify-center rounded-[11px] text-[14px] font-semibold transition-colors ${
                          active
                            ? 'border border-transparent bg-brand text-[#06141D]'
                            : 'border border-hairline-strong text-text-muted hover:border-[var(--brand-40)] hover:text-text-strong'
                        }`}
                      >
                        {n}
                      </Link>
                    );
                  })}
                  {page < totalPages && (
                    <Link
                      href={buildUrl({ q, cat, page: page + 1, limit: limitParam })}
                      className="flex h-10 items-center rounded-[11px] border border-hairline-strong px-[18px] text-[14px] font-semibold text-text-strong transition-colors hover:border-[var(--brand-40)] hover:bg-white/[0.04]"
                    >
                      Next &rarr;
                    </Link>
                  )}
                </div>
              )}
            </div>
          </section>
        </>
      )}

      <NewsletterBand />
    </div>
  );
}
