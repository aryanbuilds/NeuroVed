'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Brain, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useAuth, UserButton } from '@clerk/nextjs';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/technology', label: 'Technology' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push('/dashboard');
    } else {
      router.push('/sign-in');
    }
  };

  return (
    <header className="fixed w-full bg-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Brain className="h-8 w-8 text-[#2D336B]" />
            <span className="ml-2 text-xl font-bold text-[#2D336B]">NeuroVED</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-NeuroVEDium transition-colors hover:text-[#2D336B]",
                  pathname === item.href
                    ? "text-[#2D336B]"
                    : "text-[#7886C7]"
                )}
              >
                {item.label}
              </Link>
            ))}
            
            {isLoaded && (
              isSignedIn ? (
                <div className="flex items-center space-x-4">
                  <Button 
                    className="bg-[#2D336B] hover:bg-[#1E2245]"
                    onClick={() => router.push('/dashboard')}
                  >
                    Dashboard
                  </Button>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <Button 
                  className="bg-[#2D336B] hover:bg-[#1E2245]"
                  onClick={handleGetStarted}
                >
                  Get Started
                </Button>
              )
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-[#2D336B]" />
              ) : (
                <Menu className="h-6 w-6 text-[#2D336B]" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-NeuroVEDium",
                  pathname === item.href
                    ? "text-[#2D336B] bg-[#F3F4F9]"
                    : "text-[#7886C7] hover:text-[#2D336B] hover:bg-[#F3F4F9]"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {isLoaded && (
              <div className="px-3 py-2">
                {isSignedIn ? (
                  <div className="flex flex-col space-y-2">
                    <Button 
                      className="w-full bg-[#2D336B] hover:bg-[#1E2245]"
                      onClick={() => {
                        setIsOpen(false);
                        router.push('/dashboard');
                      }}
                    >
                      Dashboard
                    </Button>
                    <div className="flex justify-center">
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  </div>
                ) : (
                  <Button 
                    className="w-full bg-[#2D336B] hover:bg-[#1E2245]"
                    onClick={() => {
                      setIsOpen(false);
                      handleGetStarted();
                    }}
                  >
                    Get Started
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;