'use client';

import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { ClerkProvider } from '@/components/ClerkProvider';
import VerticalTabs from '@/components/VerticalTabs';

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <ThemeProvider attribute="class" defaultTheme="light">
        <VerticalTabs />
        <Toaster />
      </ThemeProvider>
    </div>
  );
} 