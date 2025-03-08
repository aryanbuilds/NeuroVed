import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    publicRoutes: [
      "/",
      "/about",
      "/contact",
      "/services",
      "/technology",
      "/sign-in",
      "/sign-up"
    ],
    signInUrl: "/sign-in",
    signUpUrl: "/sign-up",
    afterSignInUrl: "/dashboard",
    afterSignUpUrl: "/dashboard"
  });
} 