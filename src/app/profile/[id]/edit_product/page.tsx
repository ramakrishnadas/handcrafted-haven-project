import {fetchFilteredProductDetails} from '../../../lib/data';
import ProductForm from '../../../ui/profile/product_form';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const product = await fetchFilteredProductDetails(id);
  return (
    <div>
      <h1>Upload an Image</h1>
        <ProductForm productData={product} />
    </div>
  );
}