// src/app/dashboard/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

const categories = ['Outdoor', 'Kitchen'];

const fetchProducts = async (): Promise<Product[]> => {
    return [
        { id: 1, user_id: 1, product_name: 'Hiking Backpack', category: 'Outdoor', price: 120, image_url: '/backpack.jpg', description: 'A durable backpack suitable for long hikes.', stock: 50 },
        { id: 2, user_id: 2, product_name: 'Cooking Pot', category: 'Kitchen', price: 45, image_url: '/pot.jpg', description: 'A versatile cooking pot for all your culinary needs.', stock: 200 },
        { id: 3, user_id: 3, product_name: 'Baking Set', category: 'Kitchen', price: 75, image_url: '/baking_set.jpg', description: 'Complete set of baking tools and accessories.', stock: 150 },
    ];
};

const Dashboard = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            const products = await fetchProducts();
            setProducts(products);
        };

        loadProducts();
    }, []);

    const handleCategoryChange = (category: string | null) => {
        setSelectedCategory(category);
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
        const value = event.target.value ? parseInt(event.target.value) : null;
        if (type === 'min') {
            setMinPrice(value);
        } else {
            setMaxPrice(value);
        }
    };

    const handleSortChange = (order: 'asc' | 'desc') => {
        setSortOrder(order);
    };

    const filteredAndSortedProducts = products
        .filter(product => {
            const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
            const matchesMinPrice = minPrice !== null ? product.price >= minPrice : true;
            const matchesMaxPrice = maxPrice !== null ? product.price <= maxPrice : true;
            return matchesCategory && matchesMinPrice && matchesMaxPrice;
        })
        .sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.price - b.price;
            } else if (sortOrder === 'desc') {
                return b.price - a.price;
            }
            return 0;
        });

    return (
        <div className="flex flex-col md:flex-row">
            {/* Filters */}
            <div className="w-full p-4 bg-gray-100 md:w-1/4">
                <h2 className="text-xl font-bold mb-4">Filters</h2>
                <ul className="flex flex-col md:flex-col">
                    <li className="mb-4">
                        <strong>Category</strong>
                        <ul className="flex md:flex-col">
                            {categories.map(category => (
                                <li key={category} className="mb-2 md:mb-0 md:mr-2">
                                    <button
                                        className={`text-lg ${selectedCategory === category ? 'font-bold' : 'font-normal'}`}
                                        onClick={() => handleCategoryChange(category)}
                                    >
                                        {category}
                                    </button>
                                </li>
                            ))}
                            <li>
                                <button
                                    className={`text-lg ${selectedCategory === null ? 'font-bold' : 'font-normal'}`}
                                    onClick={() => handleCategoryChange(null)}
                                >
                                    All
                                </button>
                            </li>
                        </ul>
                    </li>
                    <li className="mb-4">
                        <strong>Price</strong>
                        <div className="flex flex-col">
                            <label className="mb-2">
                                Min Price
                                <input
                                    type="number"
                                    value={minPrice ?? ''}
                                    onChange={(e) => handlePriceChange(e, 'min')}
                                    className="w-full p-2 border rounded"
                                />
                            </label>
                            <label>
                                Max Price
                                <input
                                    type="number"
                                    value={maxPrice ?? ''}
                                    onChange={(e) => handlePriceChange(e, 'max')}
                                    className="w-full p-2 border rounded"
                                />
                            </label>
                        </div>
                    </li>
                    <li className="mb-4">
                        <strong>Sort by Price</strong>
                        <div className="flex flex-col">
                            <button
                                className={`text-lg mb-2 ${sortOrder === 'asc' ? 'font-bold' : 'font-normal'}`}
                                onClick={() => handleSortChange('asc')}
                            >
                                Low to High
                            </button>
                            <button
                                className={`text-lg ${sortOrder === 'desc' ? 'font-bold' : 'font-normal'}`}
                                onClick={() => handleSortChange('desc')}
                            >
                                High to Low
                            </button>
                        </div>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <main className="flex-1 p-6">
                {categories.map(category => {
                    const categoryProducts = filteredAndSortedProducts.filter(product => product.category === category);
                    return (
                        <div key={category} className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">{category}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {categoryProducts.map(product => (
                                    <Link key={product.id} href={`/product/${product.id}`} legacyBehavior>
                                        <a className="block p-2 border rounded-lg shadow hover:bg-gray-100">
                                            <Image
                                                src={product.image_url}
                                                alt={product.product_name}
                                                width={200}
                                                height={200}
                                                className="object-contain rounded"
                                            />
                                            <h3 className="text-lg font-semibold mt-2">{product.product_name}</h3>
                                            <p className="text-xl font-bold text-customGreen mt-1">${product.price.toLocaleString()}</p>
                                        </a>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </main>
        </div>
    );
};

export default Dashboard;
