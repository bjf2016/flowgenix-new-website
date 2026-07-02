import type { MetadataRoute } from 'next';

// Allow crawling of the redesigned marketing pages (/, /services, /work,
// /about, /blog, /contact, /privacy, /terms) and block the legacy,
// off-brand demo/persona pages until they are reskinned.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/personas',
        '/demo',
        '/demos',
        '/services/website-chatbot',
        '/services/lead-intake-routing',
        '/services/workflow-automation',
      ],
    },
  };
}
