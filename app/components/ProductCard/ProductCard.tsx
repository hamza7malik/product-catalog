import { Link } from '@remix-run/react';
import React from 'react';
import { Product } from '~/types/types';
import { limitedText } from '~/utils/helpers';

type ProductCardProps = {
  product: Product;
};
const ProductCard = ({ product }: ProductCardProps) => {
  const { name, description, price, image, categories } = product;

  return (
    <div className='w-[300px] text-left p-6 mx-auto border border-slate-900 my-8 hover:scale-95 transform transition-transform duration-300'>
      <Link to={'/'}>
        <div
          className='bg-cover bg-center w-full h-[200px]'
          style={{ backgroundImage: `url("${image}")` }}
        ></div>
        <div className='py-2'>
          <p className='text-slate-500 text-s'>
            category: {categories.map((category, index) => category.name)}
          </p>
          <div className='py-2'>
            <div className='flex items-center justify-between font-semibold'>
              <h2>{name}</h2>
              <p>{price}$</p>
            </div>
            <p className='text-slate-500'>{limitedText(description, 60)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
