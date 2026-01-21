'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  desc: string;
  href: string;
}

export default function ServiceCard({ title, desc, href }: ServiceCardProps) {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:border-[#009CE3] hover:shadow-lg transition-all duration-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#009CE3] transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 mb-4 leading-relaxed">
        {desc}
      </p>
      {href ? (
        <Link
          href={href}
          className="inline-flex items-center text-sm font-medium text-[#009CE3] hover:text-[#0088cc] transition-colors"
        >
          See examples
          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      ) : (
        <span className="text-sm font-medium text-gray-400">
          Demo examples coming soon!
        </span>
      )}
    </div>
  );
}
