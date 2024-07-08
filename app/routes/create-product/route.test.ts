import { action } from './route';
import { redirect } from '@remix-run/node';
import { uploadImage } from '../../utils/cloudinary.server';
import { addProduct } from '../../utils/products.server';

jest.mock('../../utils/cloudinary.server');
jest.mock('../../utils/products.server');

// Suppress console.log during tests
jest.spyOn(global.console, 'log').mockImplementation(() => {});

const mockFormData = {
  get: (key: string) => {
    switch (key) {
      case 'name':
        return 'Test Product';
      case 'description':
        return 'Test description for the product.';
      case 'price':
        return '10.99';
      case 'image':
        return new File([], 'test-image.jpg');
      case 'categories':
        return ['category1', 'category2'];
      default:
        return null;
    }
  },
  getAll: (key: string) => {
    if (key === 'categories') {
      return ['category1', 'category2'];
    }
    return [];
  },
};

describe('Product creation action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a product with valid form data', async () => {
    const request = { formData: async () => mockFormData };

    (uploadImage as jest.Mock).mockResolvedValue(
      'https://res.cloudinary.com/dcjxxw51h/image/upload/v1720401725/wkdisbsyq53dmzputdas.webp'
    );
    (addProduct as jest.Mock).mockResolvedValue({ id: '1' });

    const result = await action({ request } as any);

    expect(uploadImage).toHaveBeenCalledWith(expect.any(File));
    expect(addProduct).toHaveBeenCalledWith({
      id: '',
      name: 'Test Product',
      description: 'Test description for the product.',
      price: 10.99,
      image:
        'https://res.cloudinary.com/dcjxxw51h/image/upload/v1720401725/wkdisbsyq53dmzputdas.webp',
      categories: [
        { productId: '', categoryId: 'category1' },
        { productId: '', categoryId: 'category2' },
      ],
    });
    expect(result).toEqual(redirect('/'));
  });

  it('should throw an error with invalid price format', async () => {
    const invalidFormData = {
      ...mockFormData,
      get: (key: string) =>
        key === 'price' ? 'invalid-price' : mockFormData.get(key),
    };

    const request = { formData: async () => invalidFormData };

    const result = await action({ request } as any);

    expect(result).toEqual(redirect('/error'));
  });

  it('should throw an error when required fields are missing', async () => {
    const missingNameFormData = {
      ...mockFormData,
      get: (key: string) => (key === 'name' ? null : mockFormData.get(key)),
    };

    const request = { formData: async () => missingNameFormData };

    const result = await action({ request } as any);

    expect(result).toEqual(redirect('/error'));
  });

  it('should handle server errors', async () => {
    const request = { formData: async () => mockFormData };

    (uploadImage as jest.Mock).mockRejectedValue(new Error('Upload error'));

    const result = await action({ request } as any);

    expect(result).toEqual(redirect('/error'));
  });
});
