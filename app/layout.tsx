import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChatProvider } from '@/components/ChatProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FlowGenixAI - AI that answers, qualifies, and books',
  description:
    'AI-powered voice and chat solutions for Dentists and Local Services. Automated intake, qualification, and booking without exposing your calendar.',
  keywords: [
    'AI voice bot',
    'dental intake automation',
    'local services',
    'HVAC automation',
    'restaurant booking',
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
        <ChatProvider>
          {/* Global header for all pages */}
          <Header />

          {/* Page content */}
          <main className="min-h-[60vh]">{children}</main>

          {/* Global footer for all pages */}
          <Footer />
        </ChatProvider>
      </body>
    </html>
  );
}
