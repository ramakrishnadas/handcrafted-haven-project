import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request : { nextUrl } }) {
      const isLoggedIn =!!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        if (isLoggedIn) {
          // If not logged in, redirect to login page
          return true;
        }
        return false;
      } else if (isLoggedIn) {
        return NextResponse.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
      
    },
  },
  providers: [], // Add providers with an empty array for now

} satisfies NextAuthConfig;
