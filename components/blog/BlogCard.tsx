import Link from 'next/link';
import Image from 'next/image';
import type { PostListItem } from '@/lib/sanity/blog';
import { readLabel, formatPostDate } from '@/lib/readTime';

interface BlogCardProps {
  post: PostListItem;
}

const STRIPED =
  'repeating-linear-gradient(135deg,rgba(255,255,255,0.035) 0 10px,transparent 10px 20px),var(--bg-deep)';

export function BlogCard({ post }: BlogCardProps) {
  const imageUrl = post.mainImage?.asset?.url;
  const imageAlt = post.mainImage?.alt || post.title;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-hairline bg-surface-card shadow-fgx-md transition-all duration-300 hover:-translate-y-[3px] hover:border-hairline-strong"
    >
      <div
        className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-hairline"
        style={{ background: STRIPED }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <span className="font-mono text-[12px] text-text-faint">// cover 800×500</span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-[13px] p-6">
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-[7px]">
            {post.categories.map((cat) => (
              <span
                key={cat.slug}
                className="rounded-full border border-[var(--brand-40)] bg-[var(--brand-12)] px-[10px] py-1 text-[10.5px] font-semibold tracking-[0.04em] text-brand"
              >
                {cat.title}
              </span>
            ))}
          </div>
        )}

        <h3 className="m-0 font-display text-[1.3rem] font-bold leading-[1.22] tracking-[-0.02em] text-text-strong [text-wrap:pretty]">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="m-0 text-[0.975rem] leading-[1.55] text-text-muted">{post.excerpt}</p>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-hairline-soft pt-[14px]">
          <span className="font-mono text-[12px] text-text-faint">
            {formatPostDate(post.publishedAt)}
          </span>
          {post.readingChars ? (
            <span className="font-mono text-[12px] text-text-faint">
              {readLabel(post.readingChars)}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
