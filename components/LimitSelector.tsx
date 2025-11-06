'use client';

import { useRouter } from 'next/navigation';

interface LimitSelectorProps {
  currentLimit: string;
  buildUrl: (params: { q?: string; cat?: string; page?: number; limit?: string }) => string;
  q: string;
  cat: string;
}

export function LimitSelector({ currentLimit, buildUrl, q, cat }: LimitSelectorProps) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-600 text-sm">Show:</span>
      <select
        value={currentLimit}
        onChange={(e) => {
          router.push(buildUrl({ q, cat, page: 1, limit: e.target.value }));
        }}
        className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#009CE3] focus:border-transparent"
      >
        <option value="5">5 posts</option>
        <option value="10">10 posts</option>
        <option value="25">25 posts</option>
        <option value="all">All posts</option>
      </select>
    </div>
  );
}
