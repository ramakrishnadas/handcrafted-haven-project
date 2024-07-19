

import { fetchFilteredUserDetails } from "@/app/lib/data";
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ProfileEditButton } from '@/app/ui/profile/button';

export default async function UserTable({
    userId
}: {
    userId: string;
}) {
    const users = await fetchFilteredUserDetails(userId);

    //console.log("this is the update", update);
    
    return(
        <div className="flex sm:flex-row flex-col items-center m-4 bg-customGreen rounded-md text-white">
            <div className="m-2">
                <Image
                src={`/bob_profile.jpg`}
                className="rounded-md min-w-24"
                width={150}
                height={250}
                alt={`${users.name}'s profile picture`}
                />
            </div>

            <div className="m-3 text-white bg-gray-800 rounded-md w-full">
                <h4 className="m-3">Name: {users.name}</h4>
                <h4 className="m-3">Email: {users.email}</h4>
                <h4 className="m-3">User story: {users.user_story}</h4>
                <ProfileEditButton userId={userId}/>
            </div>
            
        </div>
    );
}