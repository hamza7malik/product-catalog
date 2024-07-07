import type { MetaFunction } from '@remix-run/node';
import ProductList from '~/components/ProductList.tsx/ProductList';

export const meta: MetaFunction = () => {
  return [
    { title: 'Product Catalog' },
    { name: 'description', content: 'Welcome to the Product Catalog' },
  ];
};

export default function Index() {
  const products = [
    {
      _id: '1',
      name: 'Test Product 1',
      categories: [{ _id: '1', name: 'clothing', parentCategory: null }],
      description: 'this is test product',
      price: 12,
      image: '/images/products/1.webp',
    },
    {
      _id: '2',
      name: 'Test Product 2',
      categories: [{ _id: '2', name: 'clothing', parentCategory: null }],
      description: 'this is test product',
      price: 12,
      image: '/images/products/1.webp',
    },
    {
      _id: '3',
      name: 'Test Product 3',
      categories: [{ _id: '3', name: 'clothing', parentCategory: null }],
      description: 'this is test product',
      price: 12,
      image: '/images/products/1.webp',
    },
    {
      _id: '4',
      name: 'Test Product 3',
      categories: [{ _id: '4', name: 'clothing', parentCategory: null }],
      description: 'this is test product',
      price: 12,
      image: '/images/products/1.webp',
    },
    {
      _id: '5',
      name: 'Test Product 3',
      categories: [{ _id: '5', name: 'clothing', parentCategory: null }],
      description: 'this is test product',
      price: 12,
      image: '/images/products/1.webp',
    },
    {
      _id: '6',
      name: 'Test Product 3',
      categories: [{ _id: '6', name: 'clothing', parentCategory: null }],
      description: 'this is test product',
      price: 12,
      image: '/images/products/1.webp',
    },
    {
      _id: '7',
      name: 'Test Product 3',
      categories: [{ _id: '7', name: 'clothing', parentCategory: null }],
      description: 'this is test product',
      price: 12,
      image: '/images/products/1.webp',
    },
  ];

  return (
    <div className=''>
      <ProductList products={products} />
    </div>
  );
}
