"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
  const [backgroundImage, setBackgroundImage] = useState("/images/wall.jpg");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setBackgroundImage("/images/wall.jpg");
      } else {
        setBackgroundImage("/images/wall-big.jpg");
      }
    };

    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="mt-4 flex grow flex-col gap-4">
        <div className="relative flex flex-col justify-center items-center gap-6 rounded-lg px-6 py-10 md:w-5/5 md:px-20 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
          <p className="relative z-10 antialiased text-xl text-white md:text-3xl md:leading-normal">
            Are you looking for a place to buy or sell exquisite handcrafted
            products? <br />
            <strong>You&apos;ve found the perfect destination</strong>
          </p>
          <Link
            href="/login"
            className="relative z-10 flex justify-center items-center gap-5 self-start md:self-center md:w- rounded-lg bg-customGreen px-10 py-4 text-sm font-medium text-white transition-colors hover:bg-green-400 md:text-2xl"
          >
            <span>Log in</span>
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-5/5 md:px-28 md:py-12 rounded-lg shadow-xl">
          {/* Add Hero Image Here */}
          {/* <Image 
            src=""
            width={1000}
            height={760}
            className="hidden md:block"
            alt=""
          />*/}
          <p className={` antialiased text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            At Handcrafted Haven, we celebrate the unique value of handmade
            goods.
            <br />
            <br />
            Just like our users, each item is one-of-a-kind and crafted with
            care. Join our user-friendly platform to{" "}
            <strong>discover exactly what you&apos;re looking for</strong> or
            showcase your artistry to the world.
            <br />
            <br />
            <strong>Your style and creativity are in demand</strong>, and we&apos;re
            here to connect you with those who appreciate it. Don&apos;t wait another
            moment. Create your account today and become part of our community.
          </p>
        </div>
      </div>
    </main>
  );
}
