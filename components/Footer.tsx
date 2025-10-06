import Link from 'next/link';
import { Logo } from './Logo';

export function Footer() {
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
                <Link href="/personas/dentists" className="text-sm text-white hover:text-[#009CE3] transition-colors">
                  For Dentists
                </Link>
              </li>
              <li>
                <Link href="/personas/local-services" className="text-sm text-white hover:text-[#009CE3] transition-colors">
                  For Local Services
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-white hover:text-[#009CE3] transition-colors">
                  Services
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


        <div>
            <h3 className="font-semibold text-[#009CE3] mb-4">Get in Touch</h3>
            <div className="space-y-2">
                <p class="text-gray-300">
                  <span class="text-sm text-white">Email:</span>
                    <a href="mailto:info@flowgenixai.com" class="text-sm text-[#009CE3]">
              info@flowgenixai.com
                    </a>
                </p>
                <p class="text-gray-300">
                  <span class="text-sm text-white">Phone:</span>
                    <a href="tel:+19259663520" class="text-sm text-white hover:text-[#009CE3] transition-colors">
              (925) 966-3520
                    </a>
                </p>
                <p class="text-gray-300">
                  <span class="font-medium">Location:</span>
            Available Nationwide
                </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} FlowGenixAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
