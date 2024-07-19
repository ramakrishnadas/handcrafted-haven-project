
import Link from 'next/link';

 export function ProfileEditButton({ userId }: { userId: string }) 
 {   

       return ( 
        <Link href={`/profile/${userId}/edit_profile`} className='"m-3 bg-customGreen rounded-md p-1 w-1/6"'> EDIT</Link>
    ); }

 export function ProductEditButton({ productId }: { productId: string }) 
 { 
       return ( 
        <Link href={`/profile/${productId}/edit_product`} className='"m-3 bg-customGreen rounded-md p-1 w-1/6"'> EDIT </Link>
    ); }