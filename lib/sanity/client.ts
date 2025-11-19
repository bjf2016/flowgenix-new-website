import { createClient } from '@sanity/client';

const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || '';

export const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.SANITY_API_VERSION || '2024-05-01',
  token: process.env.SANITY_READ_TOKEN,
  useCdn: false,
});

export const sanityClient = client;
