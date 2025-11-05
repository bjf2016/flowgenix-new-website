export const LATEST_POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "category": category->title,
    mainImage {
      asset->{_id, url},
      alt
    }
  }[0...$limit]
`;

export const POSTS_QUERY = `
  *[_type == "post"
    && ($q == "" || title match $q || excerpt match $q || pt::text(body) match $q)
    && ($cat == "" || category->slug.current == $cat)
  ] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "category": category->title,
    "categorySlug": category->slug.current,
    mainImage {
      asset->{_id, url},
      alt
    }
  }
`;

export const POSTS_COUNT_QUERY = `
  count(*[_type == "post"
    && ($q == "" || title match $q || excerpt match $q || pt::text(body) match $q)
    && ($cat == "" || category->slug.current == $cat)
  ])
`;

export const CATEGORIES_QUERY = `
  *[_type == "category"] | order(title asc) {
    title,
    "slug": slug.current
  }
`;

export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "author": author->name,
    "categories": categories[]->title,
    mainImage {
      asset->{_id, url},
      alt
    },
    body
  }
`;
