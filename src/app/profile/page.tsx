import UserTable from "@/app/ui/profile/table_user";
import ProductTable from "@/app/ui/profile/table_product";

export default async function Page() {
  const userId = "70f79bd9-a154-496e-a1da-528576e53897";

  return (
    <div>
      <UserTable userId={userId} />
      <ProductTable userId={userId} />
    </div>
  );
}
