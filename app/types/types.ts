export type Category = {
  _id: string;
  name: string;
  parentCategory: null | Category;
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categories: Category[];
};
