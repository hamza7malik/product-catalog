import { Category, Product } from '~/types/types';
import { prisma } from './database.server';

export async function getAllCategories() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return categories;
}

export async function addCategory(categoryData: {
  name: string;
  parentCategory: string | null;
}) {
  const { name, parentCategory } = categoryData;

  const category = await prisma.category.create({
    data: {
      name,
      parentCategory: parentCategory ? parentCategory : null,
    },
  });

  return category;
}
