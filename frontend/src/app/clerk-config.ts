// This file contains configuration for Clerk authentication

export const clerkConfig = {
  // Public routes that don't require authentication
  publicRoutes: [
    "/",
    "/about",
    "/contact",
    "/services",
    "/technology",
    "/sign-in",
    "/sign-up",
  ],
  
  // Routes for authentication
  signInUrl: "/sign-in",
  signUpUrl: "/sign-up",
  
  // Where to redirect after authentication
  afterSignInUrl: "/dashboard",
  afterSignUpUrl: "/dashboard",
}; 