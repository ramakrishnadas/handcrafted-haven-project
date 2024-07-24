import UserTable from "@/app/ui/profile/table_user";
import ProductTable from "@/app/ui/profile/table_product";
import { auth } from "@/auth";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile'
}

export default async function Page({ params }: { params: { id: string } }) {
  
  // Get id from params
  const id = params?.id || "";
  
  // Get id from authenticated user
  const session = await auth();
  const user = session?.user ?? null;
  let userId;

  if (!user?.id) {
    return <div>User not found</div>;
  } else {
    userId = user.id.toString();
  }

  if (id === userId) {
    return (
      <div>
        <UserTable userId={userId} profileType={"authenticated"}/>
        <ProductTable userId={userId} profileType={"authenticated"}/>
      </div>
    );
  } else {
    return (
      <div>
        <UserTable userId={id} profileType={"seller"}/>
        <ProductTable userId={id} profileType={"seller"}/>
      </div>
    );
  }

  
}
