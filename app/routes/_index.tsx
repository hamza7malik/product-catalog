import type { MetaFunction } from '@remix-run/node';

export default function Index() {
  return (
    <div className='font-sans p-4'>
      <h1 className='w-full text-center'>Hello World!</h1>
    </div>
  );
}

export const meta: MetaFunction = () => {
  return [
    { title: 'Product Catalog' },
    { name: 'description', content: 'Welcome to the Product Catalog' },
  ];
};
