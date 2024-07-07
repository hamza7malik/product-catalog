export type Category = {
  id: string;
  name: string;
  parentCategory: Category | null; // Self-referential relationship
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categories: ProductCategory[]; // Array of ProductCategory
};

export type ProductCategory = {
  id: string;
  productId: string; // Reference to Product id
  categoryId: string; // Reference to Category id
};
