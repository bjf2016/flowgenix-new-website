import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchPosts, fetchCategories, PostListItem } from '@/lib/sanity/blog';
import { BlogCard } from '@/components/blog/BlogCard';
import { LimitSelector } from '@/components/LimitSelector';

export const revalidate = 60;

interface BlogPageProps {
  searchParams: {
    q?: string;
    cat?: string;
    page?: string;
    limit?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const q = searchParams.q || '';
  const cat = searchParams.cat || 'all';
  const page = parseInt(searchParams.page || '1', 10);
  const limitParam = searchParams.limit || '10';
  const limit = limitParam === 'all' ? 999999 : parseInt(limitParam, 10);

  const [{ items: posts, total }, categories] = await Promise.all([
    fetchPosts({ q, cat: cat === 'all' ? undefined : cat, page, limit }),
    fetchCategories()
  ]);

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

  return (
    <div className="min-h-screen">
      <section className="bg-[#CDE4F3] py-16">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI Insights & Innovation
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the latest trends, strategies, and success stories in AI automation for your industry
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 space-y-6">
          <form action="/blog" method="get" className="relative max-w-xl mx-auto">
            <input
              type="hidden"
              name="cat"
              value={cat}
            />
            <input
              type="hidden"
              name="limit"
              value={limitParam}
            />
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Search articles..."
                className="w-full pl-12 pr-24 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#009CE3] focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#009CE3] text-white text-sm font-medium rounded-md hover:bg-[#0088cc] transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          <div className="space-y-4">
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href={buildUrl({ q, cat: 'all', page: 1, limit: limitParam })}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  cat === 'all'
                    ? 'bg-[#009CE3] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={buildUrl({ q, cat: category.slug, page: 1, limit: limitParam })}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    cat === category.slug
                      ? 'bg-[#009CE3] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.title}
                </Link>
              ))}
            </div>
            <div className="text-center text-gray-600 text-sm">
              {total} {total === 1 ? 'article' : 'articles'} published
            </div>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No articles found. Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <LimitSelector currentLimit={limitParam} q={q} cat={cat} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.map((post: PostListItem) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, total)} of {total} posts
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  {page > 1 && (
                    <Link
                      href={buildUrl({ q, cat, page: page - 1, limit: limitParam })}
                      className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Link>
                  )}

                  <div className="flex gap-2">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNum: number;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (page <= 3) {
                        pageNum = i + 1;
                      } else if (page >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = page - 2 + i;
                      }

                      return (
                        <Link
                          key={pageNum}
                          href={buildUrl({ q, cat, page: pageNum, limit: limitParam })}
                          className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${
                            page === pageNum
                              ? 'bg-[#009CE3] text-white'
                              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </Link>
                      );
                    })}
                  </div>

                  {page < totalPages && (
                    <Link
                      href={buildUrl({ q, cat, page: page + 1, limit: limitParam })}
                      className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
