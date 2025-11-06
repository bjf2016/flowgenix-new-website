'use client';

import { useRouter } from 'next/navigation';

interface LimitSelectorProps {
  currentLimit: string;
  q: string;
  cat: string;
}

export function LimitSelector({ currentLimit, q, cat }: LimitSelectorProps) {
  const router = useRouter();

  const handleChange = (newLimit: string) => {
    const urlParams = new URLSearchParams();
    if (q) urlParams.set('q', q);
    if (cat && cat !== 'all') urlParams.set('cat', cat);
    if (newLimit !== '10') urlParams.set('limit', newLimit);
    const query = urlParams.toString();
    router.push(query ? `/blog?${query}` : '/blog');
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-600 text-sm">Show:</span>
      <select
        value={currentLimit}
        onChange={(e) => handleChange(e.target.value)}
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
