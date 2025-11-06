import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { fetchPostBySlug } from '@/lib/sanity/blog';
import { urlForImage } from '@/lib/sanity/image';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export const dynamic = 'force-dynamic';

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const src = urlForImage(value)?.width(1600).fit('max').url();
      if (!src) return null;
      return (
        <Image
          src={src}
          alt={value?.alt || ''}
          width={1600}
          height={900}
          className="rounded-lg my-8"
        />
      );
    },
  },
  block: {
    h1:  ({children}) => <h1 className="text-4xl font-bold text-gray-900 mb-6 mt-8">{children}</h1>,
    h2:  ({children}) => <h2 className="text-3xl font-bold text-gray-900 mb-5 mt-8">{children}</h2>,
    h3:  ({children}) => <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-6">{children}</h3>,
    h4:  ({children}) => <h4 className="text-xl font-bold text-gray-900 mb-3 mt-6">{children}</h4>,
    normal: ({children}) => <p className="text-lg text-gray-700 leading-relaxed mb-6">{children}</p>,
    blockquote: ({children}) => (
      <blockquote className="border-l-4 border-[#009CE3] pl-6 py-2 italic text-gray-700 my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}) => <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">{children}</ul>,
    number: ({children}) => <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-700">{children}</ol>,
  },
  listItem: {
    bullet: ({children}) => <li>{children}</li>,
    number: ({children}) => <li>{children}</li>,
  },
  marks: {
    strong: ({children}) => <strong className="font-bold text-gray-900">{children}</strong>,
    em:     ({children}) => <em className="italic">{children}</em>,
    code:   ({children}) => (
      <code className="bg-gray-100 text-[#009CE3] px-2 py-1 rounded text-sm font-mono">{children}</code>
    ),
    link:   ({children, value}) => {
      const href = value?.href ?? '#';
      return (
        <a href={href} target="_blank" rel="noopener noreferrer"
           className="text-[#009CE3] hover:underline font-medium">
          {children}
        </a>
      );
    },
  },
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await fetchPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <section className="bg-[#CDE4F3] py-12">
        <div className="container mx-auto max-w-4xl px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-[#009CE3] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to articles
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
            {post.publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            )}
          </div>

          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.categories.map((cat: { title: string; slug: string }) => (
                <span
                  key={cat.slug}
                  className="inline-block px-2 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-medium"
                >
                  {cat.title}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {post.mainImage?.asset?.url && (
        <section className="relative w-full h-[400px] md:h-[500px] bg-gray-100">
          <Image
            src={post.mainImage.asset.url}
            alt={post.mainImage.alt || post.title}
            fill
            className="object-cover"
            priority
          />
        </section>
      )}

      <article className="container mx-auto max-w-4xl px-6 py-12">
        {post.excerpt && (
          <div className="text-xl text-gray-600 leading-relaxed mb-8 pb-8 border-b border-gray-200">
            {post.excerpt}
          </div>
        )}

        {post.body && (
          <div className="prose prose-lg max-w-none">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        )}
      </article>

      <section className="border-t border-gray-200 bg-gray-50 py-12">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to transform your business with AI?
          </h2>
          <p className="text-gray-600 mb-6">
            Let's discuss how our solutions can help you achieve your goals
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#009CE3] text-white rounded-lg font-semibold hover:bg-[#007AB8] transition-colors"
            >
              Get in touch
            </Link>
            <Link
              href="/blog"
              className="px-6 py-3 bg-white text-[#009CE3] border border-[#009CE3] rounded-lg font-semibold hover:bg-[#009CE3]/5 transition-colors"
            >
              Read more articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
