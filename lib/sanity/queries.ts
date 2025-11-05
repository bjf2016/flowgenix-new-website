export const LATEST_POSTS_QUERY = `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    categories[]->{
      "title": title,
      "slug": slug.current
    },
    mainImage{asset->{_id, url}, alt}
  }[0...$limit]
`;

export const PAGED_POSTS_QUERY = `
{
  "items": *[_type == "post"
             && defined(slug.current)
             && (!defined($q) || pt::text(body) match $q || title match $q || excerpt match $q)
             && (!defined($cat) || $cat in categories[]->slug.current)
  ] | order(publishedAt desc) [$from...$to] {
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    categories[]->{"title": title, "slug": slug.current},
    mainImage{asset->{_id, url}, alt}
  },
  "total": count(*[_type == "post"
                   && defined(slug.current)
                   && (!defined($q) || pt::text(body) match $q || title match $q || excerpt match $q)
                   && (!defined($cat) || $cat in categories[]->slug.current)])
}
`;

export const ALL_CATEGORIES_QUERY = `
  *[_type == "category"] | order(title asc) {
    "title": title,
    "slug": slug.current
  }
`;

export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    categories[]->{"title": title, "slug": slug.current},
    mainImage{asset->{_id, url}, alt},
    body
  }
`;
