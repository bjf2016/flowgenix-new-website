'use client';

import Image from 'next/image';

interface TrustMarqueeProps {
  logos: string[];
  heading?: string;
  showHeading?: boolean;
}

export default function TrustMarquee({
  logos,
  heading = "Powered by industry-leading technology",
  showHeading = true
}: TrustMarqueeProps) {
  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="container mx-auto max-w-7xl px-6">
        {showHeading && (
          <p className="text-sm text-center text-gray-500 mb-8 font-medium">
            {heading}
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center justify-items-center">
          {logos.map((logo) => (
            <div key={logo} className="transition-opacity hover:opacity-80">
              <Image
                src={`/logos/${logo}.svg`}
                alt={`${logo} logo`}
                width={120}
                height={48}
                className="h-10 w-auto opacity-60 hover:opacity-80 transition-opacity grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
