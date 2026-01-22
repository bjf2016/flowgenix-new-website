import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CallToAction } from '@/components/CallToAction';

export default function Page() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#CDE4F3] to-white py-20">
        <div className="container mx-auto max-w-6xl px-6">
          {/* Centered Heading */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Flowgenix AI
            </h1>
            <p className="text-xl text-gray-600">
              Your trusted partner in intelligent automation
            </p>
          </div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left Column: Text Content */}
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Flowgenix AI is built to bridge the gap between cutting-edge artificial intelligence and practical business operations. We understand that every business has unique challenges, processes, and goals.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Our approach combines cutting-edge AI technology with deep business understanding, ensuring that every solution we implement drives measurable results. Whether you're looking to automate routine tasks, enhance customer experiences, or unlock insights from your data, we're here to guide you through every step of your AI transformation.
              </p>

              <p className="text-gray-700 leading-relaxed">
                From strategy development to implementation and ongoing support, Flowgenix AI ensures your business stays ahead of the curve in an increasingly AI-driven marketplace.
              </p>

              <div className="pt-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Vision
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  To democratize AI adoption for businesses of all sizes, making intelligent automation accessible, practical, and profitable for every organization ready to embrace the future.
                </p>
              </div>

              <div className="pt-4">
                <Button asChild size="lg" className="bg-[#009CE3] hover:bg-[#0082C4] text-white">
                  <Link href="/services">
                    Explore Our Services
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Column: YouTube Video */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="aspect-video w-full">
                {/* TODO: Replace VIDEO_ID with the actual Flowgenix AI explainer video ID */}
                <iframe
                  src="/brand/flowgenix_ai_intro.mp4"
                  title="Flowgenix AI explainer video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section - Image should be placed at public/images/ben-foroodian.png */}
      <section className="py-10 md:py-12 mt-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-semibold tracking-wide text-sky-600 uppercase">
            Founder
          </p>

          <div className="rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-md p-6 sm:p-8">
            <div className="grid gap-6 md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] md:gap-8 items-center">
              {/* Founder Image */}
              <div className="flex flex-col items-center md:items-start space-y-3">
                <div className="max-w-xs">
                  <Image
                    src="/images/ben-foroodian.png"
                    alt="Ben Foroodian, Founder of FlowgenixAI"
                    width={400}
                    height={400}
                    className="rounded-2xl object-cover border border-slate-200 shadow-lg"
                  />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wide text-sky-600 text-center md:text-left">
                  Founder & AI Workflow Architect
                </p>
              </div>

              {/* Founder Bio */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
                    Meet Ben Foroodian
                  </h2>
                  <div className="h-px bg-sky-500/30 w-24 mb-4"></div>
                </div>

                <div className="text-sm sm:text-base text-gray-700 leading-relaxed space-y-3">
                  <p>
                    Ben Foroodian is the founder of FlowgenixAI and a strategic operator with 20+ years of experience building technology, data, and automation solutions across healthcare, software, and services. He's led teams in companies like Align Technology, Henry Schein Orthodontics, Straumann/ClearCorrect, Carl Zeiss Meditec, and several SaaS and data firms—always with the same focus: turn messy, manual workflows into clear, scalable systems that actually work in the real world.
                  </p>

                  <p>
                    In previous roles, Ben built and led global teams across product, R&D, clinical affairs, and operations. He helped launch and scale digital platforms for clear aligners, treatment planning, and practice workflows, integrating everything from scanners and remote monitoring to CRM-style communication tools. Earlier in his career he worked in ASP/SaaS data platforms, finance tech, and digital agencies, giving him a broad perspective on how different industries move information and serve customers.
                  </p>

                  <p>
                    Today, through FlowgenixAI, Ben helps dentists, local service businesses, and other specialized markets use AI to streamline intake, routing, and operations. His approach is practical and outcome-driven: start with the real workflow, automate what matters, and measure the impact in booked appointments, staff time saved, and better customer experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="pt-10 md:pt-12">
        <CallToAction
          title="Ready to see it in action?"
          primary={{
            label: "Talk to our AI front desk",
            onClick: "openChat"
          }}
          secondary={{
            label: "Book a 30-min consult",
            href: "/strategy-call"
          }}
        />
      </div>
    </div>
  );
}
