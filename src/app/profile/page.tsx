import UserTable from "@/app/ui/profile/table_user";
import ProductTable from "@/app/ui/profile/table_product";
import { auth } from "@/auth";

export default async function Page() {
  
  const session = await auth();

  const user = session?.user ?? null;

  let userId;

  if (!user?.id) {
    return <div>User not found</div>;
  } else {
    userId = user.id.toString();
  } 
  return (
    <div>
      <UserTable userId={userId} />
      <ProductTable userId={userId} />
    </div>
  );
}
