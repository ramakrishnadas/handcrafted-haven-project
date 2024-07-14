import { fetchFilteredUserDetails } from "@/app/lib/data";

export default async function UserTable({
    userId
}: {
    userId: string;
}) {
    console.log(userId);
    const users = await JSON.stringify(fetchFilteredUserDetails(userId));

    return(
        <div>
            {users}
        </div>
    );
}