import { Form, Link } from '@remix-run/react';
import React from 'react';

const CreateCategory = () => {
  return (
    <div>
      <h1 className='my-8 font-bold'>Create Category</h1>

      <Form method='post' id='create-category-form'>
        <div className='mx-auto lg:w-[50%] text-left p-8 bg-slate-900'>
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
            <label htmlFor='categories'>parent category</label>
            <div>
              <select
                name='categories'
                id='categories'
                className='w-full bg-slate-600  font-semibold'
              >
                <option value='category1'>category 1</option>
                <option value='category2'>category 2</option>
                <option value='category3'>category 3</option>
              </select>
            </div>
          </div>

          <button
            type='submit'
            className='bg-slate-950 py-2 px-8 mx-auto flex justify-center mt-3'
          >
            Create
          </button>
        </div>
      </Form>
    </div>
  );
};

export default CreateCategory;
