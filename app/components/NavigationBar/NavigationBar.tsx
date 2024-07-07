import { Link } from '@remix-run/react';
import React from 'react';

const NavigationBar = () => {
  return (
    <div className='py-8'>
      <ul className='flex justify-center items-center gap-6'>
        <li>
          <Link to='/'>Products</Link>
        </li>
        <li>
          <Link to='/create-product'>Create Product</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavigationBar;
