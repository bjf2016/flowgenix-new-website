import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';
import type { Post } from '@/lib/sanity';

interface BlogListProps {
  posts: Post[];
}

export function BlogList({ posts }: BlogListProps) {
  return (
    <section className="container mx-auto max-w-7xl px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Latest insights
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Learn how AI is transforming businesses like yours
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl bg-white overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {post.imageUrl && (
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100">
                <Image
                  src={post.imageUrl}
                  alt={post.imageAlt || post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
              </div>
            )}

            <div className="p-6">
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories.map((cat) => (
                    <span
                      key={cat.slug}
                      className="inline-block px-2 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-medium"
                    >
                      {cat.title}
                    </span>
                  ))}
                </div>
              )}

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#009CE3] transition-colors line-clamp-2">
                {post.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>

                <div className="flex items-center gap-1 text-sm font-semibold text-[#009CE3] group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#009CE3] font-semibold hover:gap-3 transition-all"
        >
          View all articles
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
