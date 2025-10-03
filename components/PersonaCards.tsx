import Link from 'next/link';
import { ArrowRight, Stethoscope, Wrench } from 'lucide-react';

interface PersonaItem {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
}

interface PersonaCardsProps {
  items: PersonaItem[];
}

const iconMap: Record<string, any> = {
  'Dentists': Stethoscope,
  'Local Services': Wrench,
};

export function PersonaCards({ items }: PersonaCardsProps) {
  return (
    <section className="container mx-auto max-w-7xl px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Built for your industry
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Specialized AI solutions designed for the unique needs of healthcare and local service businesses
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((item) => {
          const Icon = iconMap[item.title] || Stethoscope;
          return (
            <Link
              key={item.title}
              href={item.href}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#009CE3]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />

              <div className="relative">
                <div className="inline-flex p-3 rounded-xl bg-[#009CE3]/10 text-[#009CE3] mb-4">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center text-[#009CE3] font-semibold group-hover:gap-3 gap-2 transition-all">
                  {item.ctaLabel}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
