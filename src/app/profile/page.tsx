import UserTable from '@/app/ui/profile/table_user';

export default async function Page() {
    const userId = "00d69a19-2ad6-4f40-a14a-51628bc5b5f8";

    return(
        <div>
            <UserTable userId={userId}/>
        </div>
    )
}