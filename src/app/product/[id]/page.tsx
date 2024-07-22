// src/app/product/[id]/page.tsx
"use client";

import ProductDetails from '@/app/ui/product/productDetails';
import { useParams } from 'next/navigation';

export default function ProductPage() {
    const params = useParams();

    if (params) {
        const id = params.id.toString();

        return (
            <ProductDetails id={id} />
        );
    }
    
};