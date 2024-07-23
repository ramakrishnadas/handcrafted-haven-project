import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/ui/global.css";
import Header from "./ui/header";
import { ReactNode } from "react";
import AuthWrapper from "@/auth_wrapper";
import { auth } from "../auth";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: {
//     template: '%s | Handcrafted Haven',
//     default: 'Handcrafted Haven'
//   },
//   description: "Handcrafted Haven is an innovative web application that aims to provide a platform for artisans and crafters to showcase and sell their unique handcrafted items.",
// };

export default async function LayoutContent({ children }: { children: ReactNode}) {

  const session = await auth();
  console.log(session?.user)

  return (
      <html lang="en">
        <body className={inter.className}>
          {/* Common header div included here */}
          <AuthWrapper>
            <Header/>
            {children}  {/* This will render the specific page content */}
          </AuthWrapper>
        </body>
      </html>
  );
}