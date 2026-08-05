import Link from 'next/link';
import Image from 'next/image';

const COLUMNS = [
  {
    heading: 'Studio',
    links: [
      { label: 'Products', href: '/products' },
      { label: 'Work', href: '/work' },
      { label: 'Services', href: '/services' },
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-bg-deep">
      <div className="mx-auto grid max-w-container gap-10 px-[var(--gutter)] pb-10 pt-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Image
            src="/brand/fgx-logo.png"
            alt="FlowGenixAI"
            width={200}
            height={50}
            className="mb-4 h-9 w-auto"
          />
          <p className="m-0 max-w-[34ch] text-[15px] leading-[1.6] text-text-muted">
            AI systems, apps, and automation. We build the work that runs itself.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.heading}>
            <div className="mb-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-text-faint">
              {col.heading}
            </div>
            <div className="flex flex-col gap-[10px]">
              {col.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-[15px] text-text-muted transition-colors hover:text-text-strong"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div>
          <div className="mb-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-text-faint">
            Get in touch
          </div>
          <div className="flex flex-col gap-[10px] text-[15px]">
            <a
              href="mailto:info@flowgenixai.com"
              className="text-text-muted transition-colors hover:text-text-strong"
            >
              info@flowgenixai.com
            </a>
            <a
              href="tel:+19259663520"
              className="text-text-muted transition-colors hover:text-text-strong"
            >
              (925) 966-3520
            </a>
            <span className="text-text-faint">Available nationwide</span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-container flex-wrap justify-between gap-3 border-t border-hairline-soft px-[var(--gutter)] pt-5">
        <span className="font-mono text-[12px] text-text-faint">© {year} FlowGenixAI</span>
        <span className="font-mono text-[12px] text-text-faint">Built, not templated.</span>
      </div>
    </footer>
  );
}
