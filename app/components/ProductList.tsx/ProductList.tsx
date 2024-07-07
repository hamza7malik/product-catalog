import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '~/types/types';

type ProductListProps = {
  products: Product[];
};

const ProductList = ({ products }: ProductListProps) => {
  const handleSortByPrice = () => {
    console.log('handle sort by price');
  };
  return (
    <div>
      <h1 className='my-8 font-bold'>Product List</h1>
      <div className='flex justify-center items-center gap-24 my-8'>
        <button onClick={handleSortByPrice}>
          <span className='text-slate-500'>sort by price</span>
        </button>
        <div className='w-[200px]'>
          <select className='bg-transparent text-slate-600 font-semibold'>
            <option value=''>filter by category</option>
            <option value='category1'>category 1</option>
            <option value='category2'>category 2</option>
            <option value='category3'>category 3</option>
          </select>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 justify-center'>
        {products.map((product, index) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
