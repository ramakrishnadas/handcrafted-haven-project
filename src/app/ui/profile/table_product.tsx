import { fetchFilteredProductsByUser } from "@/app/lib/data";
import Image from 'next/image';

export default async function ProductTable({
    userId
}: {
    userId: string;
}) {

    const products = await fetchFilteredProductsByUser(userId);
    console.log(products);
    return(
        <ul className="border-2 bg-customGreen rounded-md m-4">
            <h1 className="text-center m-0.5">My Products</h1>
            {
                products?.map((product) => (
                   <li key= {product.id} className="flex sm:flex-row items-center m-8 rounded-md text-white bg-gray-800">
                        <div> 
                            <Image
                            src={`/product.jpg`}
                            width={200}
                            height={300}
                            alt={`${product.product_name}'s profile picture`}
                            className="rounded-md min-w-24"
                            />
                        </div>
                    
                        <div className="flex sm:flex-row m-2"> 
                            <p>Name: {product.product_name}</p> 
                            <p>Category: {product.category}</p>
                            <p>Description: {product.description}</p>
                            <p>Price: ${product.price}</p>
                            <p>Stock: {product.stock}</p>
                        </div>
                        <div >
                            <button className="m-3 bg-customGreen rounded-md p-1 w-1/6">Edit</button>
                            <button className="m-3 bg-customGreen rounded-md p-1 w-1/6">Delete</button>
                        </div>
            </li> 
                )

                )
            }
        </ul>
    );
}