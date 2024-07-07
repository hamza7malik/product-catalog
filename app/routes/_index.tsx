import { json, type LoaderFunction, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import ProductList from '~/components/ProductList.tsx/ProductList';
import { Category, Product } from '~/types/types';
import { prisma } from '~/utils/database.server';

export const meta: MetaFunction = () => {
  return [
    { title: 'Product Catalog' },
    { name: 'description', content: 'Welcome to the Product Catalog' },
  ];
};

export const loader: LoaderFunction = async () => {
  const products = await prisma.product.findMany({
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  const categories = await prisma.category.findMany();

  return json({ products, categories });
};

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
