import { program } from 'commander';
import { addProduct } from './app/utils/products.server';

program
  .command('add-product')
  .description('Add a new product')
  .option('-n, --name <name>', 'Product name')
  .option('-d, --description <description>', 'Product description')
  .option('-p, --price <price>', 'Product price')
  .option('-i, --image <image>', 'Product image URL or path')
  .option(
    '-c, --categories <categories>',
    'Comma-separated list of category IDs'
  )
  .action(async (options) => {
    const { name, description, price, image, categories } = options;
    const categoryArray = categories
      .split(',')
      .map((id: string) => ({ categoryId: id }));

    try {
      await addProduct({
        id: '',
        name,
        description,
        price: parseFloat(price),
        image,
        categories: categoryArray,
      });
      console.log('Product added successfully!');
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  });

program.parse(process.argv);
