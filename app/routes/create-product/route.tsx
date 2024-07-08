import {
  ActionFunction,
  LoaderFunction,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from '@remix-run/node';
import {
  Form,
  Link,
  json,
  redirect,
  useLoaderData,
  useSubmit,
} from '@remix-run/react';
import React, { FormEvent, useState } from 'react';
import { Category, Product, ProductCategory } from '~/types/types';
import { uploadImage } from '../../utils/cloudinary.server';
import { prisma } from '../../utils/database.server';

import { addProduct } from '../../utils/products.server';

export const loader: LoaderFunction = async () => {
  const categories = await prisma.category.findMany();
  return json({ categories });
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const imageFile = formData.get('image') as File;
    const selectedCategoryIds = formData.getAll('categories') as string[];

    if (!name || !description || isNaN(price) || !imageFile) {
      throw new Error('Invalid form data');
    }

    let imageUrl = '';
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }
    // @ts-ignore
    const categories: ProductCategory[] = selectedCategoryIds.map(
      (categoryId) => ({
        productId: '',
        categoryId,
      })
    );

    const productData = {
      id: '',
      name,
      description,
      price,
      image: imageUrl,
      categories,
    };

    await addProduct(productData);

    return redirect('/');
  } catch (error) {
    console.log('Error processing action:', error);
    return redirect('/error');
  }
};

const CreateProduct = () => {
  const { categories } = useLoaderData<{ categories: Category[] }>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isCliMessage, setIsCliMessage] = useState(false);

  const handleCreateUsingCLI = () => {
    setIsCliMessage(!isCliMessage);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedCategories(selectedOptions);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = useSubmit();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    submit(event.currentTarget, { replace: true });
  };

  return (
    <div>
      <h1 className='my-8 font-bold'>Create Product</h1>

      <Form
        method='post'
        id='create-product-form'
        encType='multipart/form-data'
        onSubmit={handleSubmit}
      >
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
                onChange={handleCategoryChange}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
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
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Loading...' : 'Create'}
          </button>
          <div
            className={`bg-gray-950 px-24 py-12 mx-auto lg:w-[90%] rounded-lg mt-4 ${
              isCliMessage ? 'block' : 'hidden'
            }`}
          >
            To add a product, navigate to the project folder and run the
            following command:
            <p className='text-orange-300 mt-3'>
              {
                '<node --loader ts-node/esm ./productAddCli.ts add-product --name "Your Product Name" --description "Product Description" --price 99.99 --image "https://uploaded/image/url.webp" --categories "category_id_1,category_id_2">'
              }
            </p>
          </div>
        </div>
      </Form>
      <button onClick={handleCreateUsingCLI} className='text-slate-700 mt-2'>
        create using CLI ▶
      </button>
    </div>
  );
};

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className='error-container'>
      <pre>{error.message}</pre>
    </div>
  );
}

export default CreateProduct;
