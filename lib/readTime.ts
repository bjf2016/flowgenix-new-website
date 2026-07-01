// Estimate reading time from a character count of the plain-text body.
// Sanity provides `readingChars` via `length(pt::text(content))`.
// ~5.5 chars/word and ~200 words/min gives roughly 1100 chars/min; round to 1000.
const CHARS_PER_MINUTE = 1000;

export function readMinutes(chars?: number): number {
  if (!chars || chars <= 0) return 1;
  return Math.max(1, Math.round(chars / CHARS_PER_MINUTE));
}

export function readLabel(chars?: number, withRead = false): string {
  const m = readMinutes(chars);
  return withRead ? `${m} min read` : `${m} min`;
}

export function formatPostDate(iso?: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
