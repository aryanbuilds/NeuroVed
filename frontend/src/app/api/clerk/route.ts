import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    publicRoutes: ["/", "/about", "/contact", "/services", "/technology"],
    signInUrl: "/sign-in",
    signUpUrl: "/sign-up",
    afterSignInUrl: "/dashboard",
    afterSignUpUrl: "/dashboard",
  });
} 