// src/app/product/[id]/page.tsx
import ProductDetails from "@/app/ui/product/productDetails";
import { getProductById } from "@/app/lib/data";

export default function ProductPage({
  params,
}: {
  params: { id: string };
}) {

	const id = params?.id || "";

  return <ProductDetails id={id} />;
}