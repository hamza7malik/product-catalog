import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { Category, Product } from '../../types/types';

type ProductListProps = {
  products: Product[];
  categories: Category[];
};

const ProductList = ({ products, categories }: ProductListProps) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortedByPrice, setSortedByPrice] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    let filtered = products;
    if (selectedCategory) {
      filtered = products.filter((product) =>
        product.categories.some(
          (category) => category.categoryId === selectedCategory
        )
      );
    }
    if (sortedByPrice) {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(filtered);
  }, [selectedCategory, sortedByPrice, products]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortByPrice = () => {
    setSortedByPrice(!sortedByPrice);
  };
  return (
    <div>
      <h1 className='my-8 font-bold'>Product List</h1>
      <div className='flex justify-center items-center gap-24 my-8'>
        <button onClick={handleSortByPrice}>
          <span className='text-slate-500'>{`sort by price ${
            sortedByPrice ? '👆' : '👇'
          }`}</span>
        </button>
        <div className='w-[200px]'>
          <select
            className='bg-transparent text-slate-600 font-semibold'
            name='categories'
            id='categories'
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value=''>Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 justify-center'>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
