export type Category = {
  id: string;
  name: string;
  parentCategory: Category | null;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categories: ProductCategory[];
};

export type ProductCategory = {
  id: string;
  productId: string;
  categoryId: string;
  category: Category;
};
