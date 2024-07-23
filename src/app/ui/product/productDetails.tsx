import Image from 'next/image';
import { Product } from '@/app/lib/definitions';
import { getProductById } from '@/app/lib/data';

export default async function ProductDetails({ id }: { id: string }) {
    const product = await getProductById(id);

    return (
        <div className="flex justify-center items-center p-6 my-20">
            <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6 max-w-4xl">
                <div className="w-full md:w-auto md:flex-shrink-0">
                    <Image
                        src={product.image_url}
                        alt={product.product_name}
                        width={400}
                        height={400}
                        className="object-contain rounded-lg mb-4 md:mb-0"
                    />
                </div>
                <div className="w-full text-center md:text-left">
                    <h1 className="text-3xl font-bold mb-4">{product.product_name}</h1>
                    <p className="text-xl font-bold text-customGreen mb-4">${product.price.toLocaleString()}</p>
                    <p className="mb-4">{product.description}</p>
                    <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                    <p className="text-sm text-gray-600">Category: {product.category}</p>
                </div>
            </div>
        </div>
    )
}
