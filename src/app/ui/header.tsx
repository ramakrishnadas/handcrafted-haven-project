import Image from "next/image";
import Link from "next/link";
import { signOut, auth } from "../../auth";

interface User {
  id: string;
  name: string;
}

export default async function Header() {
  const session = await auth();
  const user = session?.user ? { id: session.user.id || '', name: session.user.name || '' } : null;

  return (
    <div className="relative bg-customGreen p-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center w-full md:w-auto">
          <Image
            src="/logo.png"
            alt="Handcrafted Haven Logo"
            width={50}
            height={50}
            className="object-contain"
          />
          <Link href="/" className="ml-3 text-xl md:text-3xl font-bold text-white">
            Handcrafted Haven
          </Link>
          {session && (
            <div className="text-white md:ml-4 mt-2 md:mt-0">
              Welcome, {user?.name}
            </div>
          )}
        </div>
        
        {/* Navigation Links */}
        {session && (
          <div className="flex flex-col md:flex-row items-center w-full md:w-auto mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-4">
            <Link href="/dashboard" className="text-white bg-gray-800 hover:bg-gray-700 p-2 rounded-lg w-full md:w-auto text-center">
              Home
            </Link>
            <Link href="/profile" className="text-white bg-gray-800 hover:bg-gray-700 p-2 rounded-lg w-full md:w-auto text-center">
              My Profile
            </Link>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
              method="post"
              className="w-full md:w-auto"
            >
              <button
                type="submit"
                className="text-white bg-gray-800 hover:bg-gray-700 p-2 rounded-lg w-full md:w-auto text-center"
              >
                Log Out
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
