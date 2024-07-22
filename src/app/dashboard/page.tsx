import { getProducts, getCategories, getFilteredProducts } from "@/app/lib/data";
import { Product, Category } from "@/app/lib/definitions";
import ProductList from "../ui/dashboard/productList";

const fetchCategories = async (): Promise<Category[]> => {
  return await getCategories();
};

const fetchProducts = async (): Promise<Product[]> => {
  return await getProducts();
};

export default async function Dashboard({
	searchParams
}: {
	searchParams?: {
		query?: string;
	}
}) {
	const query = searchParams?.query || '';

  const categoryData = await Promise.all([fetchCategories()]);
  const categories = categoryData[0].map((item) => item.category);

  const productData = await Promise.all([fetchProducts()]);

	let products;
	if (query) {
		products = await getFilteredProducts(query);
	} else {
		products = productData[0];
	}
	
  return <ProductList products={products} categories={categories} />;
};