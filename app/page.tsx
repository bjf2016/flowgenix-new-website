import Link from 'next/link';
import Image from 'next/image';
import { fetchLatestPosts } from '@/lib/sanity';

export const revalidate = 60;

const BUILT_WITH = [
  'Retell',
  'n8n',
  'Supabase',
  'Vercel',
  'Google Cloud',
  'OpenAI',
  'Next.js',
];

const WORK_GRID = [
  {
    tag: 'AI assistant app',
    title: 'EverSage',
    blurb: 'A personal AI assistant that remembers context and acts on it.',
    caption: '// EverSage app',
  },
  {
    tag: 'Brand & site',
    title: 'Almanac Leaf',
    blurb: 'Identity and a fast marketing site, built to convert.',
    caption: '// Almanac Leaf site',
  },
  {
    tag: 'Automation',
    title: 'n8n workflows',
    blurb: 'Connected pipelines that move work between your tools.',
    caption: '// n8n workflow map',
  },
  {
    tag: 'Voice',
    title: 'AI voice agents & sites',
    blurb: 'Agents that answer, qualify, and book. Plus the site behind them.',
    caption: '// voice agent + site',
  },
];

const WHO_WE_HELP = [
  { n: '01', title: 'Home & field services', sub: 'Plumbers, HVAC, electrical, landscaping.' },
  { n: '02', title: 'Professional services', sub: "Firms billing time they can't afford to lose." },
  { n: '03', title: 'Health & wellness', sub: 'Clinics and practices with full front desks.' },
  { n: '04', title: 'Real estate', sub: "Agents who can't let a lead go cold." },
  { n: '05', title: 'Busy owners & founders', sub: 'Wearing every hat, out of hours to do it.' },
  { n: '06', title: 'Other businesses', sub: "If it's repetitive, we can probably automate it." },
];

const COCKPIT = [
  { value: '24/7', label: 'Calls answered', accent: false },
  { value: '0', label: 'Calls missed', accent: false },
  { value: '+14', label: 'Leads captured today', accent: true },
  { value: '9.5', unit: 'hrs', label: 'Hours saved', accent: false },
];

const EXPERIENCE = ['Align Technology', 'Henry Schein', 'Straumann', 'Carl Zeiss'];

const STRIPED =
  'repeating-linear-gradient(135deg,rgba(255,255,255,0.035) 0 10px,transparent 10px 20px),var(--bg-deep)';

export default async function Home() {
  const posts = await fetchLatestPosts(3);

  return (
    <div className="relative overflow-x-hidden bg-bg-base font-body text-text-body">
      {/* ===== 1 · HERO ===== */}
      <section className="relative overflow-hidden pb-[clamp(60px,7vw,96px)] pt-[clamp(70px,9vw,130px)]">
        <div className="pointer-events-none absolute inset-0 bg-glow-brand" />
        <img
          src="/brand/fgx-head.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-[-7%] top-[-6%] w-[min(680px,54vw)] opacity-[0.07] saturate-[0.9]"
        />
        <div className="relative mx-auto max-w-container px-[var(--gutter)]">
          <div className="flex max-w-[940px] flex-col gap-7">
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand">
              AI systems, apps &amp; automation
            </span>
            <h1 className="m-0 font-display text-[clamp(3rem,6.6vw,5.75rem)] font-extrabold leading-[1.0] tracking-[-0.035em] text-text-strong [text-wrap:balance]">
              Run your business like it <span className="text-brand">runs itself.</span>
            </h1>
            <p className="m-0 max-w-[60ch] text-[clamp(1.1rem,1.5vw,1.35rem)] leading-[1.6] text-text-body">
              We answer every call, capture every lead, and handle the busywork in the background. So
              you get to run the business instead of chasing it.
            </p>
            <div className="mt-1.5 flex flex-wrap gap-[14px]">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-[14px] border border-transparent bg-brand px-[30px] py-[17px] text-[17px] font-semibold tracking-[-0.01em] text-[#06141D] transition-all duration-150 hover:bg-brand-hover hover:shadow-fgx-brand active:translate-y-px"
              >
                Book a strategy call
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center rounded-[14px] border border-hairline bg-transparent px-[30px] py-[17px] text-[17px] font-semibold tracking-[-0.01em] text-text-strong transition-all duration-150 hover:border-hairline-strong hover:bg-white/[0.06]"
              >
                See the work
              </Link>
            </div>
          </div>

          {/* built with strip */}
          <div className="mt-[clamp(48px,6vw,84px)] border-t border-hairline pt-[26px]">
            <div className="mb-[18px] font-mono text-[12px] uppercase tracking-[0.1em] text-text-faint">
              Built with
            </div>
            <div
              className="relative overflow-hidden"
              style={{
                maskImage:
                  'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)',
                WebkitMaskImage:
                  'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)',
              }}
            >
              <div className="flex w-max gap-16 animate-[fgx-marquee_26s_linear_infinite]">
                {[...BUILT_WITH, ...BUILT_WITH].map((name, i) => (
                  <span
                    key={`${name}-${i}`}
                    className="whitespace-nowrap text-[20px] font-semibold text-text-muted"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2 · STATEMENT BAND ===== */}
      <section className="border-y border-hairline bg-bg-deep py-[clamp(72px,10vw,140px)]">
        <div className="mx-auto max-w-[1000px] px-[var(--gutter)]">
          <p className="m-0 font-display text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[1.18] tracking-[-0.025em] text-text-muted [text-wrap:balance]">
            You didn&apos;t start your business to chase missed calls and dead-end emails.{' '}
            <span className="text-brand">We build the system that catches them all.</span>
          </p>
        </div>
      </section>

      {/* ===== 3 · SELECTED WORK ===== */}
      <section id="work" className="py-[clamp(72px,10vw,150px)]">
        <div className="mx-auto max-w-container px-[var(--gutter)]">
          <div className="mb-[clamp(40px,5vw,64px)] flex flex-col gap-[14px]">
            <div className="fgx-index text-[clamp(56px,8vw,88px)]">01</div>
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
              Selected work
            </span>
            <h2 className="m-0 max-w-[20ch] font-display text-[clamp(2rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-text-strong [text-wrap:balance]">
              Systems we&apos;ve shipped, running in the real world.
            </h2>
          </div>

          {/* featured */}
          <div className="group overflow-hidden rounded-[var(--radius-xl)] border border-hairline bg-surface-card shadow-fgx-md transition-all duration-300 hover:-translate-y-[3px] hover:border-hairline-strong hover:shadow-fgx-lg">
            <div className="grid md:grid-cols-[1.15fr_1fr]">
              <div
                className="relative flex min-h-[340px] items-center justify-center border-b border-hairline md:border-b-0 md:border-r"
                style={{ background: STRIPED }}
              >
                <div className="absolute inset-0 bg-glow-soft" />
                <span className="relative font-mono text-[13px] text-text-faint">
                  // AI Operations Dashboard screenshot
                </span>
              </div>
              <div className="flex flex-col justify-center gap-[18px] p-[clamp(28px,3.5vw,48px)]">
                <span className="self-start rounded-full border border-[var(--brand-40)] bg-[var(--brand-12)] px-3 py-[5px] text-[12px] font-semibold tracking-[0.04em] text-brand">
                  Dashboard
                </span>
                <h3 className="m-0 font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-bold tracking-[-0.025em] text-text-strong">
                  AI Operations Dashboard
                </h3>
                <p className="m-0 max-w-[42ch] text-[1.1875rem] leading-[1.6] text-text-muted">
                  One screen where every call, lead, and job lives. Real time, no spreadsheets, no
                  tab juggling.
                </p>
                <Link
                  href="/work"
                  className="mt-1.5 self-start text-[16px] font-semibold text-brand transition-colors hover:text-brand-hover"
                >
                  View project &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* grid of four */}
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WORK_GRID.map((item) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-[var(--radius-xl)] border border-hairline bg-surface-card shadow-fgx-md transition-all duration-300 hover:-translate-y-[3px] hover:border-hairline-strong"
              >
                <div
                  className="flex aspect-[4/3] items-center justify-center border-b border-hairline"
                  style={{ background: STRIPED }}
                >
                  <span className="font-mono text-[12px] text-text-faint">{item.caption}</span>
                </div>
                <div className="flex flex-col gap-3 p-[26px]">
                  <span className="self-start rounded-full border border-hairline-strong px-[11px] py-1 text-[11px] font-semibold tracking-[0.04em] text-silver">
                    {item.tag}
                  </span>
                  <h3 className="m-0 font-display text-[1.4rem] font-bold tracking-[-0.02em] text-text-strong">
                    {item.title}
                  </h3>
                  <p className="m-0 text-[1rem] leading-[1.55] text-text-muted">{item.blurb}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4 · WHAT WE BUILD ===== */}
      <section className="border-t border-hairline bg-bg-deep py-[clamp(72px,10vw,150px)]">
        <div className="mx-auto max-w-container px-[var(--gutter)]">
          <div className="mb-[clamp(40px,5vw,64px)] flex flex-col gap-[14px]">
            <div className="fgx-index text-[clamp(56px,8vw,88px)]">02</div>
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
              What we build
            </span>
            <h2 className="m-0 max-w-[20ch] font-display text-[clamp(2rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-text-strong [text-wrap:balance]">
              Three systems that quietly carry the load.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {/* voice receptionist */}
            <div className="flex flex-col gap-5 rounded-[var(--radius-xl)] border border-hairline bg-surface-card p-6 shadow-fgx-md">
              <div className="flex flex-col gap-[14px] rounded-[14px] border border-hairline bg-bg-deep p-[18px]">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full bg-[var(--success)]"
                    style={{ boxShadow: '0 0 10px var(--success)' }}
                  />
                  <span className="font-mono text-[12px] text-text-muted">Live · answered in 0.8s</span>
                </div>
                <div className="flex h-10 items-end gap-1">
                  {[40, 70, 30, 90, 55, 100, 45, 75, 35, 65, 25, 50].map((h, i) => (
                    <span
                      key={i}
                      className="flex-1 rounded-[2px] bg-brand"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="m-0 font-display text-[1.35rem] font-bold tracking-[-0.02em] text-text-strong">
                  AI voice receptionist
                </h3>
                <p className="m-0 text-[1rem] leading-[1.55] text-text-muted">
                  Answers every call, day or night. Books jobs, takes messages, never lets one ring
                  out.
                </p>
              </div>
            </div>

            {/* lead intake */}
            <div className="flex flex-col gap-5 rounded-[var(--radius-xl)] border border-hairline bg-surface-card p-6 shadow-fgx-md">
              <div className="flex flex-col gap-[10px] rounded-[14px] border border-hairline bg-bg-deep p-[14px]">
                {[
                  { w1: '60%', w2: '38%', tag: 'Sales', active: true },
                  { w1: '52%', w2: '30%', tag: 'Support', active: false },
                  { w1: '64%', w2: '42%', tag: 'Booked', active: false },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-[10px]">
                    <span
                      className="h-[26px] w-[26px] rounded-full border"
                      style={{
                        background: row.active ? 'var(--brand-12)' : 'rgba(201,210,216,0.08)',
                        borderColor: row.active ? 'var(--brand-40)' : 'var(--hairline-strong)',
                      }}
                    />
                    <div className="flex flex-1 flex-col gap-[3px]">
                      <span
                        className="h-[7px] rounded-[3px] bg-hairline-strong"
                        style={{ width: row.w1 }}
                      />
                      <span className="h-[6px] rounded-[3px] bg-hairline" style={{ width: row.w2 }} />
                    </div>
                    <span
                      className="font-mono text-[10px]"
                      style={{ color: row.active ? 'var(--brand)' : 'var(--text-muted)' }}
                    >
                      {row.tag}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="m-0 font-display text-[1.35rem] font-bold tracking-[-0.02em] text-text-strong">
                  Lead intake &amp; routing
                </h3>
                <p className="m-0 text-[1rem] leading-[1.55] text-text-muted">
                  Every enquiry captured, tagged, and sent to the right place. No lead slips through.
                </p>
              </div>
            </div>

            {/* workflow automation */}
            <div className="flex flex-col gap-5 rounded-[var(--radius-xl)] border border-hairline bg-surface-card p-6 shadow-fgx-md">
              <div className="flex flex-col gap-4 rounded-[14px] border border-hairline bg-bg-deep p-[18px]">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full border-2 border-brand" />
                  <span className="h-[2px] flex-1 bg-hairline-strong" />
                  <span className="h-3 w-3 rounded-full border-2 border-brand" />
                  <span className="h-[2px] flex-1 bg-hairline-strong" />
                  <span className="h-3 w-3 rounded-full bg-brand" />
                </div>
                <div className="flex h-[42px] items-end gap-1.5">
                  {[45, 70, 100, 60, 85].map((h, i) => (
                    <span
                      key={i}
                      className="flex-1 rounded-[3px]"
                      style={{
                        height: `${h}%`,
                        background: h === 100 ? 'var(--brand)' : 'var(--hairline-strong)',
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="m-0 font-display text-[1.35rem] font-bold tracking-[-0.02em] text-text-strong">
                  Workflow automation &amp; reporting
                </h3>
                <p className="m-0 text-[1rem] leading-[1.55] text-text-muted">
                  The busywork runs on rails, and you get a clean report on what happened.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5 · WHO WE HELP ===== */}
      <section className="py-[clamp(72px,10vw,150px)]">
        <div className="mx-auto grid max-w-container items-start gap-[clamp(32px,6vw,72px)] px-[var(--gutter)] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col gap-[14px]">
            <div className="fgx-index text-[clamp(56px,8vw,88px)]">03</div>
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
              Who we help
            </span>
            <h2 className="m-0 max-w-[16ch] font-display text-[clamp(2rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-text-strong [text-wrap:balance]">
              Built for businesses that run on response time.
            </h2>
            <p className="m-0 mt-1.5 max-w-[38ch] text-[1.0625rem] leading-[1.6] text-text-muted">
              If a missed call is a missed job, we&apos;re built for you. Industry neutral, outcome
              obsessed.
            </p>
          </div>
          <div className="flex flex-col">
            {WHO_WE_HELP.map((item, i) => (
              <div
                key={item.n}
                className={`flex items-baseline gap-[18px] border-t border-hairline py-6 ${
                  i === WHO_WE_HELP.length - 1 ? 'border-b' : ''
                }`}
              >
                <span className="w-[34px] flex-none font-mono text-[13px] text-brand">{item.n}</span>
                <div>
                  <div className="font-display text-[clamp(1.4rem,2.2vw,1.85rem)] font-bold tracking-[-0.02em] text-text-strong">
                    {item.title}
                  </div>
                  <div className="mt-1 text-[1rem] text-text-muted">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6 · AI OPERATIONS COCKPIT ===== */}
      <section className="pb-[clamp(72px,10vw,150px)]">
        <div className="mx-auto max-w-container px-[var(--gutter)]">
          <div
            className="relative overflow-hidden rounded-[var(--radius-xl)] border border-hairline-strong p-[clamp(36px,5vw,64px)] shadow-fgx-lg"
            style={{ background: 'linear-gradient(180deg,var(--surface-card),var(--bg-deep))' }}
          >
            <div className="pointer-events-none absolute inset-0 bg-glow-brand" />
            <img
              src="/brand/fgx-head.png"
              alt=""
              aria-hidden
              className="pointer-events-none absolute bottom-[-30%] right-[-4%] w-[min(420px,38vw)] opacity-[0.06]"
            />
            <div className="relative mb-[clamp(28px,4vw,48px)] flex flex-col gap-2">
              <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
                AI operations cockpit
              </span>
              <h2 className="m-0 max-w-[22ch] font-display text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-text-strong [text-wrap:balance]">
                The whole operation, on one quiet screen.
              </h2>
            </div>
            <div className="relative grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline md:grid-cols-4">
              {COCKPIT.map((m) => (
                <div key={m.label} className="flex flex-col gap-2 bg-bg-deep p-7">
                  <div
                    className={`font-display text-[clamp(2.4rem,4vw,3.4rem)] font-extrabold leading-none tracking-[-0.03em] ${
                      m.accent ? 'text-brand' : 'text-text-strong'
                    }`}
                  >
                    {m.value}
                    {m.unit && (
                      <span className="ml-1 text-[0.42em] font-semibold text-text-muted">
                        {m.unit}
                      </span>
                    )}
                  </div>
                  <div className="text-[14px] text-text-muted">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 7 · ABOUT TEASER ===== */}
      <section
        id="about"
        className="border-y border-hairline bg-bg-deep py-[clamp(72px,10vw,150px)]"
      >
        <div className="mx-auto grid max-w-container items-center gap-[clamp(32px,6vw,80px)] px-[var(--gutter)] md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative">
            <div className="absolute inset-x-[6%] bottom-0 top-[6%] rounded-[var(--radius-xl)] bg-glow-soft" />
            <div className="relative flex aspect-square items-end justify-center overflow-hidden rounded-[var(--radius-xl)] border border-hairline bg-surface-card">
              <Image
                src="/brand/fgx-ben.png"
                alt="Founder portrait"
                width={620}
                height={620}
                className="block w-[96%] saturate-[0.95]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[22px]">
            <div className="fgx-index text-[clamp(56px,8vw,88px)]">04</div>
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
              About
            </span>
            <h2 className="m-0 max-w-[20ch] font-display text-[clamp(2rem,3.4vw,2.85rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-text-strong [text-wrap:balance]">
              Twenty years turning messy operations into systems that work.
            </h2>
            <p className="m-0 max-w-[50ch] text-[1.1875rem] leading-[1.65] text-text-body">
              We&apos;ve sat in the operator&apos;s seat at companies that live and die on process.
              Now we build that same discipline into AI systems for businesses that can&apos;t afford
              to drop the ball.
            </p>
            <div className="mt-2 flex flex-col gap-[14px]">
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-text-faint">
                Experience across
              </span>
              <div className="flex flex-wrap items-center gap-x-9 gap-y-[14px]">
                {EXPERIENCE.map((name) => (
                  <span
                    key={name}
                    className="font-display text-[1.15rem] font-bold tracking-[-0.01em] text-text-muted"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 8 · FROM THE BLOG ===== */}
      <section id="blog" className="border-t border-hairline bg-bg-deep py-[clamp(72px,10vw,150px)]">
        <div className="mx-auto max-w-container px-[var(--gutter)]">
          <div className="mb-[clamp(36px,5vw,56px)] flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
                From the blog
              </span>
              <h2 className="m-0 font-display text-[clamp(2rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-text-strong">
                Notes from the build.
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-[16px] font-semibold text-brand transition-colors hover:text-brand-hover"
            >
              All posts &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-hairline bg-surface-card shadow-fgx-md transition-all duration-300 hover:-translate-y-[3px] hover:border-hairline-strong"
              >
                <div
                  className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-hairline"
                  style={{
                    background:
                      'repeating-linear-gradient(135deg,rgba(255,255,255,0.035) 0 10px,transparent 10px 20px),var(--bg-base)',
                  }}
                >
                  {post.imageUrl ? (
                    <Image
                      src={post.imageUrl}
                      alt={post.imageAlt || post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <span className="font-mono text-[12px] text-text-faint">// post image</span>
                  )}
                </div>
                <div className="flex flex-col gap-3 p-6">
                  <div className="flex items-center gap-3">
                    {post.categories && post.categories.length > 0 && (
                      <span className="rounded-full border border-[var(--brand-40)] bg-[var(--brand-12)] px-[11px] py-1 text-[11px] font-semibold tracking-[0.04em] text-brand">
                        {post.categories[0].title}
                      </span>
                    )}
                    {post.publishedAt && (
                      <span className="font-mono text-[12px] text-text-faint">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    )}
                  </div>
                  <h3 className="m-0 font-display text-[1.3rem] font-bold leading-[1.2] tracking-[-0.02em] text-text-strong">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 9 · FINAL CTA ===== */}
      <section
        id="cta"
        className="relative overflow-hidden border-t border-hairline py-[clamp(90px,12vw,180px)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-glow-brand" />
        <img
          src="/brand/fgx-head.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-[-34%] left-[-8%] w-[min(560px,46vw)] opacity-[0.06]"
        />
        <div className="relative mx-auto flex max-w-[860px] flex-col items-center gap-7 px-[var(--gutter)] text-center">
          <h2 className="m-0 font-display text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-text-strong [text-wrap:balance]">
            Let&apos;s build the system your business runs on.
          </h2>
          <p className="m-0 max-w-[46ch] text-[clamp(1.1rem,1.5vw,1.3rem)] leading-[1.6] text-text-body">
            A 30 minute strategy call, no pitch deck. You&apos;ll leave knowing exactly what&apos;s
            worth automating first.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-[14px] border border-transparent bg-brand px-9 py-[19px] text-[18px] font-semibold tracking-[-0.01em] text-[#06141D] transition-all duration-150 hover:bg-brand-hover hover:shadow-fgx-brand active:translate-y-px"
          >
            Book a strategy call
          </Link>
        </div>
      </section>
    </div>
  );
}
