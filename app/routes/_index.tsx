import { json, type LoaderFunction, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Category, Product } from '~/types/types';
import { getAllCategories } from '~/repositories/categories.server';
import { getAllProducts } from '~/repositories/products.server';
import ProductList from '~/components/ProductList.tsx/ProductList';

export default function Index() {
  const { products, categories } = useLoaderData<{
    products: Product[];
    categories: Category[];
  }>();

  return (
    <div className=''>
      <ProductList products={products} categories={categories} />
    </div>
  );
}

export const meta: MetaFunction = () => {
  return [
    { title: 'Product Catalog' },
    { name: 'description', content: 'Welcome to the Product Catalog' },
  ];
};

export const loader: LoaderFunction = async () => {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return json({ products, categories });
};
