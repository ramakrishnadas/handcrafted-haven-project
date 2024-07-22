import { fetchFilteredProductsByUser } from "@/app/lib/data";
import Image from "next/image";
import {
  ProductEditButton,
  ProductCreateButton,
  DeleteProductButton,
} from "@/app/ui/profile/button";
import { revalidatePath } from "next/cache";

export default async function ProductTable({ userId }: { userId: string }) {
  revalidatePath(`/profile`);
  const products = await fetchFilteredProductsByUser(userId);

  return (
    <div className="container mx-auto p-8">
  <ul className="bg-white rounded-lg shadow-md p-8">
    <h1 className="text-center text-3xl font-bold mb-8 text-gray-900">My Products</h1>
    {products?.map((product) => (
      <li
        key={product.id}
        className="flex flex-col sm:flex-row items-center bg-gray-50 rounded-lg p-6 mb-6 shadow-sm"
      >
        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
          <Image
            src={product.thumbnail_image_url}
            width={200}
            height={300}
            alt={`${product.product_name}'s profile picture`}
            className="rounded-lg border border-gray-200 shadow-sm"
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center w-full">
          <div className="mb-4 sm:mb-0 sm:mr-6">
            <p className="text-lg font-semibold text-gray-700">Name: <span className="font-normal">{product.product_name}</span></p>
            <p className="text-lg font-semibold text-gray-700">Category: <span className="font-normal">{product.category}</span></p>
            <p className="text-lg font-semibold text-gray-700">Description: <span className="font-normal">{product.description}</span></p>
            <p className="text-lg font-semibold text-gray-700">Price: <span className="font-normal">${product.price}</span></p>
            <p className="text-lg font-semibold text-gray-700">Stock: <span className="font-normal">{product.stock}</span></p>
          </div>
          <div className="flex space-x-2">
            <ProductEditButton productId={product.id} />
            <DeleteProductButton id={product.id} />
          </div>
        </div>
      </li>
    ))}
    <div className="flex justify-center mt-6">
      <ProductCreateButton userId={userId} />
    </div>
  </ul>
</div>


  );
}
