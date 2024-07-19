import { fetchFilteredProductsByUser } from "@/app/lib/data";
import Image from 'next/image';
import { ProductEditButton } from '@/app/ui/profile/button';

export default async function ProductTable({
    userId
}: {
    userId: string;
}) {

    const products = await fetchFilteredProductsByUser(userId);
    
    return(
        <ul className="border-2 bg-customGreen rounded-md m-4">
            <h1 className="text-center m-0.5">My Products</h1>
            {
                products?.map((product) => (
                   <li key= {product.id} className="flex flex-col sm:flex-row items-center m-8 rounded-md text-white bg-gray-800">
                        <div className="flex-auto"> 
                            <Image
                            src={`/product.jpg`}
                            width={200}
                            height={300}
                            alt={`${product.product_name}'s profile picture`}
                            className="rounded-md min-w-24"
                            />
                        </div>
                    
                        <div className="flex flex-col sm:flex-row m-2 items-start w-64 sm:w-full"> 
                            <p className="m-2">Name: {product.product_name}</p> 
                            <p className="m-2">Category: {product.category}</p>
                            <p className="m-2">Description: {product.description}</p>
                            <p className="m-2">Price: ${product.price}</p>
                            <p className="m-2">Stock: {product.stock}</p>
                        </div>
                        <div className="flex-auto" >
                            <ProductEditButton productId={product.id}/>
                            <button className="m-3 bg-customGreen rounded-md p-1 w-24">Delete</button>
                        </div>
            </li> 
                )

                )
            }
        </ul>
    );
}