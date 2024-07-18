import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "@/app/ui/global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Handcrafted Haven',
    default: 'Handcrafted Haven'
  },
  description: "Handcrafted Haven is an innovative web application that aims to provide a platform for artisans and crafters to showcase and sell their unique handcrafted items.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Common header div included here */}
        <div className="flex h-20 shrink-0 items-center justify-center rounded-lg bg-customGreen p-4 md:h-52">
          {/* Insert logo here */}
          <Image
            src="/logo.png"
            alt="Handcrafted Haven Logo"
            width={150}
            height={150}
            className="object-contain"
          />
          <h1 className="text-2xl md:text-5xl font-bold text-center text-white mt-4 mb-2">
            Handcrafted Haven
          </h1>
        </div>
        {children}  {/* This will render the specific page content */}
      </body>
    </html>
  );
}
