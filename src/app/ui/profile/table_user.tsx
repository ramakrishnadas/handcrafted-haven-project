import { fetchFilteredUserDetails } from "@/app/lib/data";
import Image from "next/image";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ProfileEditButton } from "@/app/ui/profile/button";

export default async function UserTable({
  userId,
  profileType,
}: {
  userId: string;
  profileType: string;
}) {
  const users = await fetchFilteredUserDetails(userId);

  let firstImage = users.profile_image;

  if (
    firstImage == null ||
    firstImage == "" ||
    firstImage == "/placeholder_profile.png" ||
    !firstImage.startsWith("https")
  ) {
    firstImage = "/placeholder_profile.png";
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col sm:flex-row items-center bg-white rounded-lg shadow-md text-gray-900 p-6 mb-8">
        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
          <Image
            src={firstImage}
            className="rounded-full border-4 border-gray-300 shadow-sm"
            width={150}
            height={150}
            alt={`${users.name}'s profile picture`}
          />
        </div>
        <div className="flex flex-col justify-between w-full sm:w-auto bg-white rounded-lg p-6">
          <div>
            <h4 className="text-xl font-bold mb-2">
              Name: <span className="font-normal">{users.name}</span>
            </h4>
            <h4 className="text-xl font-bold mb-2">
              Email: <span className="font-normal">{users.email}</span>
            </h4>
            <h4 className="text-xl font-bold mb-4">
              User story:{" "}
              <span className="font-normal">{users.user_story}</span>
            </h4>
          </div>
          {profileType == "authenticated" && (
            <div className="flex space-x-2">
              <ProfileEditButton userId={userId} />
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
