import { Product } from '../types/types';
import { prisma } from './database.server';

export async function addProduct(productData: Product) {
  try {
    const createdProduct = await prisma.product.create({
      data: {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        image: productData.image,
        categories: {
          create: productData.categories.map((category) => ({
            categoryId: category.categoryId,
          })),
        },
      },
    });

    return createdProduct;
  } catch (error) {}
}
export async function getAllProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    return products;
  } catch (error) {}
}

// -------
