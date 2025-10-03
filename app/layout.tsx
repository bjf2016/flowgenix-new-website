import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FlowGenixAI - AI that answers, qualifies, and books',
  description: 'AI-powered voice and chat solutions for Dentists and Local Services. Automated intake, qualification, and booking without exposing your calendar.',
  keywords: ['AI voice bot', 'dental intake automation', 'local services', 'HVAC automation', 'restaurant booking'],
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
