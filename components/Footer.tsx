import Link from 'next/link';
import Image from 'next/image';
import { Logo } from './Logo';

export function Footer() {
  const techLogos = ["retell", "n8n", "sanity", "vercel"];

  return (
    <footer className="border-t bg-[#1F2528]">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Logo variant="light" />
            <p className="mt-4 text-sm text-white">
              Transforming businesses through intelligent automation and AI-powered solutions.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-[#009CE3] mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="demos/dentist-intake" className="text-sm text-white hover:text-[#009CE3] transition-colors">
                  AI Receptionist
                </Link>
              </li>
              <li>
                <Link href="/services/lead-intake-routing" className="text-sm text-white hover:text-[#009CE3] transition-colors">
                  Lead Capture
                </Link>
              </li>
              <li>
                <Link href="/services/website-chatbot" className="text-sm text-white hover:text-[#009CE3] transition-colors">
                  Website Chatbot
                </Link>
              </li>
                            <li>
                <Link href="/services/workflow-automation" className="text-sm text-white hover:text-[#009CE3] transition-colors">
                  Workflow Automations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#009CE3] mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-white hover:text-[#009CE3] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-white hover:text-[#009CE3] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white hover:text-[#009CE3] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-white hover:text-[#009CE3] transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-white hover:text-[#009CE3] transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>


          {/* Get in Touch */}
          <div>
            <h3 className="mb-4 font-semibold text-[#009CE3]">Get in Touch</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-white/80">Email: </span>
                <a href="mailto:info@flowgenixai.com" className="text-[#009CE3]">
                  info@flowgenixai.com
                </a>
              </li>
              <li>
                <span className="text-white/80">Phone: </span>
                <a href="tel:+19259663520" className="text-[#009CE3]">
                  (925) 966-3520
                </a>
              </li>
              <li>
                <span className="text-white/80">Location: </span>
                <span className="text-[#009CE3]">Available Nationwide </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Tech Strip */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-sm text-center text-gray-300 mb-8 font-medium">
            Powered by industry-leading technology
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center justify-items-center">
            {techLogos.map((logo) => (
              <div key={logo} className="transition-opacity hover:opacity-100">
                <Image
                  src={`/logos/${logo}.svg`}
                  alt={`${logo} logo`}
                  width={120}
                  height={48}
                  className="h-10 w-auto opacity-70 hover:opacity-90 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} FlowGenixAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
