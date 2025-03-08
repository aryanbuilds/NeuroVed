'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';
import { ClerkProvider } from '@/components/ClerkProvider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <title>NeuroVED - Advanced NeuroVEDical AI Platform</title>
          <meta name="description" content="AI-powered NeuroVEDical assistance platform revolutionizing healthcare through advanced machine learning and clinical decision support." />
        </head>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="light">
            {!isDashboard && <Navigation />}
            <main className="min-h-screen bg-background">{children}</main>
            {!isDashboard && <Footer />}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}