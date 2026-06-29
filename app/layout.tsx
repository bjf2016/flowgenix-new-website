import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ChatWidget from '@/components/chat/ChatWidget';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FlowGenixAI - AI phone, intake & automation for service businesses',
  description:
    'AI voice receptionist, lead intake, and workflow automation for home services, professional services, health & wellness, and busy owners. Answer every call, capture every lead, automate the busywork.',
  keywords: [
    'AI voice receptionist',
    'lead intake automation',
    'workflow automation',
    'home services AI',
    'professional services automation',
    'med spa AI',
    'small business automation',
    'AI operations dashboard',
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
      </head>
      <body
        className={`${inter.className} min-h-screen bg-white text-black antialiased`}
      >
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
