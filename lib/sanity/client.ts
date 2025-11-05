import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || '',
  apiVersion: process.env.SANITY_API_VERSION || '2025-01-01',
  token: process.env.SANITY_READ_TOKEN,
  useCdn: true,
});

export const sanityClient = client;
