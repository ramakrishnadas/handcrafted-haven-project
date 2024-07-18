import UserTable from '@/app/ui/profile/table_user';
import ProductTable from '@/app/ui/profile/table_product';

export default async function Page() {
    const userId = "2fe21b44-acf6-43da-af7c-06cc1f109b51";

    return(
        <div>
            <UserTable userId={userId}/>
            <ProductTable userId={userId}/>
        </div>
    )
}