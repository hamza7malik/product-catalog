import { Form, Link } from '@remix-run/react';
import React from 'react';

const CreateProduct = () => {
  const handleCreateUsingCLI = () => {
    console.log('handleCreateUsingCLI');
  };
  const handleCreateNewCategory = () => {
    console.log('handleCreateNewCategory');
  };

  return (
    <div>
      <h1 className='my-8 font-bold'>Create Product</h1>

      <Form method='post' id='create-product-form'>
        <div className='mx-auto lg:w-[50%] text-left p-8 bg-slate-900'>
          <div className='my-4 grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-0 justify-between'>
            <label htmlFor='image'>image</label>
            <input
              type='file'
              id='image'
              name='image'
              accept='image/*'
              required
            />
          </div>
          <div className='my-4 grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-0 justify-between'>
            <label htmlFor='name'>name</label>
            <input
              className='bg-slate-700'
              type='text'
              id='name'
              name='name'
              required
            />
          </div>

          <div className='my-4 grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-0 justify-between'>
            <label htmlFor='price'>price ($)</label>
            <input
              className='bg-slate-700'
              type='text'
              id='price'
              name='price'
              required
            />
          </div>
          <div className='my-4 grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-0 justify-between'>
            <label htmlFor='categories'>categories</label>
            <div>
              <select
                name='categories'
                id='categories'
                multiple
                className='w-full bg-slate-600  font-semibold'
              >
                <option value='category1'>category 1</option>
                <option value='category2'>category 2</option>
                <option value='category3'>category 3</option>
              </select>
              <Link
                to={'/create-category'}
                className='text-slate-700 mt-2 block cursor-pointer'
              >
                create new category
              </Link>
            </div>
          </div>
          <div className='my-4 grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-0 justify-between'>
            <label htmlFor='description'>description</label>
            <textarea
              className='bg-slate-700'
              id='description'
              name='description'
              required
              rows={4}
            />
          </div>

          <button
            type='submit'
            className='bg-slate-950 py-2 px-8 mx-auto flex justify-center mt-3'
          >
            Create
          </button>
        </div>
      </Form>
      <button onClick={handleCreateUsingCLI} className='text-slate-700 mt-2'>
        create using CLI ▶
      </button>
    </div>
  );
};

export default CreateProduct;
