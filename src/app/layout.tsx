"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "@/app/ui/global.css";
import Header from "./ui/header";
import { getSession, SessionProvider, useSession } from "next-auth/react";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: ReactNode;
}

// export const metadata: Metadata = {
//   title: {
//     template: '%s | Handcrafted Haven',
//     default: 'Handcrafted Haven'
//   },
//   description: "Handcrafted Haven is an innovative web application that aims to provide a platform for artisans and crafters to showcase and sell their unique handcrafted items.",
// };

function LayoutContent({ children }: { children: ReactNode}) {
  const { data: session, status } = useSession();

  // console.log(`This is my session: ${session}`)
  return (
      <html lang="en">
        <body className={inter.className}>
          {/* Common header div included here */}
          <Header session={session} status={status} />
          {children}  {/* This will render the specific page content */}
        </body>
      </html>
  );
}

export default function RootLayout({ children }: RootLayoutProps) {
  
  return (
    <SessionProvider>
      <LayoutContent>{children}</LayoutContent>
    </SessionProvider>
  );
}