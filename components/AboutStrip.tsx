import Image from 'next/image';

export function AboutStrip() {
  return (
    <section className="container mx-auto max-w-7xl px-6">
      <div className="rounded-2xl bg-gradient-to-br from-[#009CE3] to-[#0088cc] p-8 md:p-12 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex justify-center md:justify-start">
            <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center text-white text-4xl font-bold">
              FG
            </div>
          </div>

          <div className="md:col-span-2 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Built by operators, for operators
            </h2>
            <p className="text-white/90 leading-relaxed mb-6">
              FlowGenixAI was founded by experienced entrepreneurs who understand the daily challenges
              of running a local business. We've combined enterprise-grade AI technology with practical,
              no-nonsense implementation to help you answer every call, qualify every lead, and book more appointments.
            </p>
            <p className="text-sm text-white/80">
              Our ecosystem partners include industry leaders in voice AI, workflow automation, and content management.
            </p>
          </div>
        </div>

        <div className="relative mt-12 pt-8 border-t border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center">
            {['retell', 'n8n', 'sanity', 'vercel'].map((logo) => (
              <div key={logo} className="w-24 h-10 relative grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">
                <Image
                  src={`/logos/${logo}.svg`}
                  alt={`${logo} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
