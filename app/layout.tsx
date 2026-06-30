import './tokens.css';
import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ChatWidget from '@/components/chat/ChatWidget';

export const metadata: Metadata = {
  title: 'FlowGenixAI - AI systems, apps, and automation',
  description:
    'FlowGenixAI is an AI systems, apps, and automation studio. We answer every call, capture every lead, and run the busywork in the background, so you get to run the business instead of chasing it.',
  keywords: [
    'AI systems',
    'AI automation',
    'AI voice receptionist',
    'lead intake automation',
    'workflow automation',
    'business automation studio',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/brand/favicon.png" type="image/png" />
        {/* Cabinet Grotesk (display) + General Sans (body) via Fontshare */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&f[]=general-sans@400,500,600,700&display=swap"
        />
      </head>
      <body className="min-h-screen bg-bg-base font-body text-text-body antialiased">
        {/* Film-grain overlay over dark areas */}
        <div aria-hidden className="fgx-grain" />

        {/* Global header for all pages */}
        <Header />

        {/* Page content */}
        <main className="min-h-[60vh]">{children}</main>

        {/* Global footer for all pages */}
        <Footer />

        {/* Chat widget */}
        <ChatWidget />
      </body>
    </html>
  );
}
