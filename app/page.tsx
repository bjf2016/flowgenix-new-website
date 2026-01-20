import Hero from '@/components/Hero';
import TrustMarquee from '@/components/TrustMarquee';
import PromoBand from '@/components/PromoBand';
import { PersonaCards } from '@/components/PersonaCards';
import { DemoTiles } from '@/components/DemoTiles';
import { AboutStrip } from '@/components/AboutStrip';
import { BlogList } from '@/components/BlogList';
import { TrustSignals } from '@/components/TrustSignals';
import { CallToAction } from '@/components/CallToAction';
import { fetchLatestPosts } from '@/lib/sanity';

export const revalidate = 60;

export default async function Home() {
  const posts = await fetchLatestPosts(3);

  return (
    <div className="space-y-20 pb-20">
      <Hero
        eyebrow="Built for local & service-based businesses"
        title="AI Systems & Workflow Automation for Service Businesses"
        highlight="Service Businesses"
        subtitle="FlowGenixAI designs and implements AI phone, intake, and automation systems so your team answers every call, captures every lead, and keeps your CRM up to date — without adding headcount."
        features="AI voice receptionist · Multi-step intake & routing · CRM dashboards & workflows"
        primaryCta={{ label: "Book a strategy call", href: "/contact" }}
        secondaryCta={{ label: "View live demos", href: "#demos" }}
        badges={[
          { src: "/badges/cert-1.svg", alt: "Certification placeholder" },
          { src: "/badges/cert-2.svg", alt: "Award placeholder" }
        ]}
        portraitSrc="/brand/ben v4.png"
        trustLogos={["retell","n8n","sanity","vercel"]}
      />
      
      <TrustMarquee logos={["retell","n8n","sanity","vercel"]} />

      <PromoBand
        message="Get in touch to discuss your project."
        primary={{ label: "Talk to our AI", onClick: "openChat" }}
      />

      <PersonaCards
        items={[
          {
            title: "Dentists",
            description: "Automated intake, insurance pre-qual, recalls and reminders.",
            ctaLabel: "See Dentist solutions",
            href: "/personas/dentists"
          },
          {
            title: "Local Services",
            description: "Answer, qualify, schedule, and reduce no-shows for HVAC, Electricians, Restaurants & Retail.",
            ctaLabel: "See Local Services",
            href: "/personas/local-services"
          }
        ]}
      />

      <DemoTiles
        id="demos"
        items={[
          {
            title: "Dentist Intake Bot",
            label: "Demo (synthetic)",
            description: "Collect the right info and increase completed bookings.",
            href: "/demo/dentist-intake-bot"
          },
          {
            title: "HVAC After-Hours Bot",
            label: "Demo (synthetic)",
            description: "Capture overnight leads and prepare next-day dispatch.",
            href: "/demo/hvac-after-hours"
          },
          {
            title: "Restaurant Waitlist Bot",
            label: "Demo (synthetic)",
            description: "Confirm reservations and reduce no-shows.",
            href: "/demo/restaurant-waitlist"
          }
        ]}
      />

      <AboutStrip />

      <BlogList posts={posts} />

      <TrustSignals />

      <CallToAction
        title="Ready to see it in action?"
        primary={{
          label: "Talk to our AI front desk",
          onClick: "openChat"
        }}
        secondary={{
          label: "Watch the 60-sec demo",
          href: "/demo/dentist-intake-bot"
        }}
      />
    </div>
  );
}
