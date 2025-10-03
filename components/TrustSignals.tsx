import { CircleCheck as CheckCircle2, Zap, Shield } from 'lucide-react';

export function TrustSignals() {
  const phases = [
    {
      phase: 'Phase 1',
      title: 'Answer Every Call',
      icon: CheckCircle2,
      features: [
        '24/7 availability',
        'Natural conversation',
        'Multi-language support',
        'Call routing & escalation'
      ]
    },
    {
      phase: 'Phase 2',
      title: 'Qualify & Capture',
      icon: Zap,
      features: [
        'Smart intake forms',
        'Insurance verification',
        'Lead scoring',
        'CRM integration'
      ]
    },
    {
      phase: 'Phase 3',
      title: 'Book & Confirm',
      icon: Shield,
      features: [
        'Calendar coordination',
        'Automated reminders',
        'No-show reduction',
        'Follow-up sequences'
      ]
    }
  ];

  return (
    <section className="container mx-auto max-w-7xl px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          How it works
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Three phases to transform your customer communication
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {phases.map((phase, index) => {
          const Icon = phase.icon;
          return (
            <div
              key={phase.phase}
              className="relative rounded-2xl bg-white p-8 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute -top-4 left-8 px-4 py-1 rounded-full bg-[#009CE3] text-white text-sm font-semibold">
                {phase.phase}
              </div>

              <div className="mt-4 mb-6">
                <div className="inline-flex p-3 rounded-xl bg-[#009CE3]/10 text-[#009CE3] mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {phase.title}
                </h3>
              </div>

              <ul className="space-y-3">
                {phase.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#009CE3] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              {index < phases.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#009CE3] to-transparent" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
