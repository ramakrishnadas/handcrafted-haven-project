import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request : { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnProfile = nextUrl.pathname.startsWith('/profile');
      const isOnProduct = nextUrl.pathname.startsWith('/product/');

      if (!isLoggedIn) {
        if (isOnDashboard || isOnProfile || isOnProduct) {
          return false;
        }
        return true;
      }

      if (isOnDashboard || isOnProfile || isOnProduct) {
        return true;
      }

      return NextResponse.redirect(new URL('/dashboard', nextUrl));
    },
  },
  providers: [], // Add providers with an empty array for now

} satisfies NextAuthConfig;
