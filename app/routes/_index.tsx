import type { MetaFunction } from '@remix-run/node';
import ProductList from '~/components/ProductList.tsx/ProductList';

export default function Index() {
  return (
    <div className=''>
      <ProductList />
    </div>
  );
}

export const meta: MetaFunction = () => {
  return [
    { title: 'Product Catalog' },
    { name: 'description', content: 'Welcome to the Product Catalog' },
  ];
};
