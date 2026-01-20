import Link from 'next/link';
import { Play, Phone, Calendar, Users } from 'lucide-react';

interface DemoItem {
  title: string;
  label: string;
  description: string;
  href: string;
}

interface DemoTilesProps {
  items: DemoItem[];
  id?: string;
}

const iconMap: Record<string, any> = {
  'Dentist Intake Bot': Calendar,
  'HVAC After-Hours Bot': Phone,
  'Restaurant Waitlist Bot': Users,
};

export function DemoTiles({ items, id }: DemoTilesProps) {
  return (
    <section id={id} className="container mx-auto max-w-7xl px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          See it in action
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Experience our AI solutions with interactive demonstrations using synthetic data
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => {
          const Icon = iconMap[item.title] || Play;
          return (
            <Link
              key={item.title}
              href={item.href}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white p-6 shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#009CE3]/10 text-xs font-medium text-[#009CE3]">
                  <Play className="w-3 h-3" />
                  {item.label}
                </span>
              </div>

              <div className="mb-4 pt-8">
                <div className="inline-flex p-3 rounded-xl bg-white shadow-sm border border-gray-100 text-gray-700 group-hover:text-[#009CE3] group-hover:border-[#009CE3]/20 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#009CE3] transition-colors">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>

              <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-gray-400 group-hover:text-[#009CE3] transition-colors">
                Watch demo
                <Play className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
