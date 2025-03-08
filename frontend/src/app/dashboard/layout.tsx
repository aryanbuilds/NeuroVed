'use client';

import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { ClerkProvider } from '@/components/ClerkProvider';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
        <Toaster />
      </ThemeProvider>
    </div>
  );
} 