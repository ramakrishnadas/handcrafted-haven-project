import Image from "next/image";
import { signOut, auth } from "../../auth";

export default async function Header() {
  
  const session = await auth();

  return (
    <div className="flex h-20 shrink-0 items-center justify-center rounded-lg bg-customGreen p-4 md:h-52 relative">
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

      {session && (
        <div className="absolute top-0 right-0 p-4">
          <form action={async () => {
            "use server";
            await signOut();
          }}>
            <button 
              className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            >
              <div className="hidden md:block">Log Out</div>
            </button>
          </form>
        </div>
      )}
    
    </div>
  );
}
