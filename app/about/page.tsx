import Link from 'next/link';
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

      <div className="pt-16">
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
