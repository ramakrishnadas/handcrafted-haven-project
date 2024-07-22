"use client";

import { Product } from "@/app/lib/definitions";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import Search from "./search";

interface ProductListProps {
  products: Product[];
	categories: string[];
}

const ProductList: React.FC<ProductListProps> = ({
  products,
	categories
}) => {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [minPrice, setMinPrice] = useState<number | null>(null);
	const [maxPrice, setMaxPrice] = useState<number | null>(null);
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

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
              {categories.map((category) => (
                <li key={category} className="mb-2 md:mb-0 md:mr-2">
                  <button
                    className={`text-lg ${selectedCategory === category ? "font-bold" : "font-normal"}`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
              <li>
                <button
                  className={`text-lg ${selectedCategory === null ? "font-bold" : "font-normal"}`}
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
                  value={minPrice ?? ""}
                  onChange={(e) => handlePriceChange(e, "min")}
                  className="w-full p-2 border rounded"
                />
              </label>
              <label>
                Max Price
                <input
                  type="number"
                  value={maxPrice ?? ""}
                  onChange={(e) => handlePriceChange(e, "max")}
                  className="w-full p-2 border rounded"
                />
              </label>
            </div>
          </li>
          <li className="mb-4">
            <strong>Sort by Price</strong>
            <div className="flex flex-col">
              <button
                className={`text-lg mb-2 ${sortOrder === "asc" ? "font-bold" : "font-normal"}`}
                onClick={() => handleSortChange("asc")}
              >
                Low to High
              </button>
              <button
                className={`text-lg ${sortOrder === "desc" ? "font-bold" : "font-normal"}`}
                onClick={() => handleSortChange("desc")}
              >
                High to Low
              </button>
            </div>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6">
				<Search placeholder="Search products..." />
				{filteredAndSortedProducts.length > 0 ? (
					<>
						<h2 className="text-2xl font-bold mb-4 mt-4">{selectedCategory || "All"}</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{filteredAndSortedProducts.map((product) => (
								<Link key={product.id} href={`/product/${product.id}`} legacyBehavior>
									<a className="block p-2 border rounded-lg shadow hover:bg-gray-100">
										<Image
											src={product.thumbnail_image_url}
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
					</>
				) : (
					<p>No products found.</p>
				)}
      </main>
    </div>
  );
};

export default ProductList;
