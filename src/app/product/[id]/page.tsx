// src/app/product/[id]/page.tsx
import CreateReview from "@/app/ui/product/createReview";
import ProductDetails from "@/app/ui/product/productDetails";
import ReviewsAndRatings from "@/app/ui/product/reviewsAndRatings";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product'
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const id = params?.id || "";

  return (
    <>
      <ProductDetails id={id} />
      <ReviewsAndRatings productId={id} />
      <CreateReview productId={id} />
    </>
  ); 
}
