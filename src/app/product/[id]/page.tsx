// src/app/product/[id]/page.tsx
import ProductDetails from "@/app/ui/product/productDetails";

export default function ProductPage({ params }: { params: { id: string } }) {
  const id = params?.id || "";

  return <ProductDetails id={id} />;
}
