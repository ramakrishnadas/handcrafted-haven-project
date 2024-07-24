import {fetchFilteredProductDetails} from '../../../lib/data';
import ProductForm from '../../../ui/profile/product_form';
import { revalidatePath } from "next/cache";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Product'
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  revalidatePath(`/profile/${id}/edit_product`);
  const product = await fetchFilteredProductDetails(id);
  return (
    <div>
        <ProductForm productData={product} />
    </div>
  );
}