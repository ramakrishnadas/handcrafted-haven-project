import Image from "next/image";
import Link from "next/link";
import { signOut, auth } from "../../auth";

export default async function Header() {
  const session = await auth();

  const user = session?.user;

  return (
    <div className="relative">

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

      <div className="absolute top-0 left-0 p-4 flex">
        <Link key={user?.id} href={`/dashboard`} legacyBehavior shallow={true}>
          <a className="block p-2 border rounded-lg shadow hover:bg-gray-100  mx-4">
            <p className="text-customBlue">Home</p>
          </a>
        </Link>
      </div>
      

      {session && (
        <>
          <p className="text-white absolute bottom-0 left-0 p-4">Welcome, {user?.name}</p>
          <div className="absolute top-0 right-0 p-4 flex">
            <Link key={user?.id} href={`/profile`} legacyBehavior>
              <a className="block p-2 border rounded-lg shadow hover:bg-gray-100  mx-4">
                <p className="text-customBlue">My Profile</p>
              </a>
            </Link>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button className="flex h-[40px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                <div className="hidden md:block">Log Out</div>
              </button>
            </form>
          </div>
        </>
      )}
    </div>
    
  );
}
