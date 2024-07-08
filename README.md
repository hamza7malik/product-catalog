# Product Catalog

A product catalog application built with **Remix**, **TypeScript**, **Prisma**, and **MongoDB**.

## Features

- Create Product
- Create Category
- Sort Products by Price
- Filter Products by Category
- Create Product from CLI

## Project Setup

### Prerequisites

- Node.js
- MongoDB
- Cloudinary account

### Environment Variables

Create a `.env` file in the root directory and add the following:

```bash
DATABASE_URL=<your_mongodb_connection_string>
CLOUD_NAME=<your_cloudinary_cloud_name>
API_KEY=<your_cloudinary_api_key>
API_SECRET=<your_cloudinary_api_secret>
```

### Installation

### Environment Variables

Clone the repository:

```bash
git clone https://github.com/your-username/product-catalog.git
cd product-catalog
```

Install dependencies:

```bash
npm install
```

Generate Prisma client:

```bash
npx prisma generate
```

### Running the Application

```bash
npm run dev
```

### CLI Usage

To create a product from the CLI, navigate to the project root directory and run:

```bash
node --loader ts-node/esm ./productAddCli.ts add-product --name "Your Product Name" --description "Product Description" --price 99.99 --image "https://res.cloudinary.com/dcjxxw51h/image/upload/v1720422782/wfu9nf1ayqcuy0cbsub9.webp" --categories "category_id_1,category_id_2"
```

### Deployment

The application is deployed on Vercel. Visit https://product-catalog-psi.vercel.app/

### Contributing

Feel free to open issues or submit pull requests.

### License

This project is licensed under the MIT License.
