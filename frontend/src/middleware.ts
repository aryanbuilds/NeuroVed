import { clerkMiddleware } from '@clerk/nextjs/server';

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/about',
  '/contact',
  '/services',
  '/technology',
  '/sign-in',
  '/sign-up'
];

// Check if the current route is public
function isPublicRoute(path: string) {
  return publicRoutes.some(route => 
    path === route || 
    path.startsWith(`${route}/`)
  );
}

// This middleware protects routes and handles redirections
export default clerkMiddleware();

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}; 