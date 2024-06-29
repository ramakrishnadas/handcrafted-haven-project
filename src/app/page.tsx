import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        {/* Insert logo here */}
        <h1 className="text-5xl font-bold text-center text-gray-800 mt-4 mb-2">
          Handcrafted Haven
        </h1>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          {/*<div
          className="h-0 w-0 border-b-[30px] border-l-[20px] border-r-[20px] border-b-black border-l-transparent border-r-transparent"
        />*/}
          <p
            className={` antialiased text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            Are you looking for a place to buy or sell exquisite handcrafted
            products? <br />
            <strong>You've found the perfect destination</strong>
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span>
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Image Here */}
          {/* <Image 
            src=""
            width={1000}
            height={760}
            className="hidden md:block"
            alt=""
          />*/}
          <p
            className={` antialiased text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            At Handcrafted Haven, we celebrate the unique value of handmade
            goods.
            <br />
            <br />
            Just like our users, each item is one-of-a-kind and crafted with
            care. Join our user-friendly platform to{" "}
            <strong>discover exactly what you're looking for</strong> or
            showcase your artistry to the world.
            <br />
            <br />
            <strong>Your style and creativity are in demand</strong>, and we're
            here to connect you with those who appreciate it. Don't wait another
            moment. Create your account today and become part of our community.
          </p>
        </div>
      </div>
    </main>
  );
}
