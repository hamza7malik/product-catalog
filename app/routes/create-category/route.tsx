import { ActionFunction, MetaFunction } from '@remix-run/node';
import { Form, json, redirect, useLoaderData } from '@remix-run/react';
import { Category } from '~/types/types';
import {
  addCategory,
  getAllCategories,
} from '~/repositories/categories.server';

const CreateCategory = () => {
  const categories = useLoaderData<Category[]>();
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
                <option value=''>Select parent category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
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

export const meta: MetaFunction = () => {
  return [
    { title: 'Create Category' },
    { name: 'description', content: 'Create a category' },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name') as string;
  const parentCategory = formData.get('categories') as string | null;

  await addCategory({ name, parentCategory });

  return redirect('/');
};

export const loader = async () => {
  const categories = await getAllCategories();
  return json(categories);
};

export default CreateCategory;
