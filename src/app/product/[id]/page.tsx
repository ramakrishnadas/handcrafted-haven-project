// src/app/product/[id]/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface Product {
    id: number;
    user_id: number;
    product_name: string;
    category: string;
    price: number;
    image_url: string;
    description: string;
    stock: number;
}

const fetchProductById = async (id: number): Promise<Product | null> => {
    const products = [
        { id: 1, user_id: 1, product_name: 'Hiking Backpack', category: 'Outdoor', price: 120, image_url: '/backpack.jpg', description: 'A durable backpack suitable for long hikes.', stock: 50 },
        { id: 2, user_id: 2, product_name: 'Cooking Pot', category: 'Kitchen', price: 45, image_url: '/pot.jpg', description: 'A versatile cooking pot for all your culinary needs.', stock: 200 },
        { id: 3, user_id: 3, product_name: 'Baking Set', category: 'Kitchen', price: 75, image_url: '/baking_set.jpg', description: 'Complete set of baking tools and accessories.', stock: 150 },
    ];
    return products.find(product => product.id === id) || null;
};

const ProductPage = () => {
    const  id = useParams();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (id) {
            const loadProduct = async () => {
                const product = await fetchProductById(Number(id));
                setProduct(product);
            };

            loadProduct();
        }
    }, [id]);

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen p-6">
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
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
