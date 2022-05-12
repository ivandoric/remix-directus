import { getProducts, getCategories, getFilteredProducts } from '~/models/index.server';
import { json } from '@remix-run/node';
import { Link, useLoaderData, useFetcher, Form } from '@remix-run/react';
import ProductCard from '~/components/ProductCard';
import Filters from '~/components/Filters';
import { useState, useEffect } from 'react';

export const meta = () => ({
  title: 'Remix E-commerce',
  description: 'Welcome to Remix E-commerce site.',
});

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const cats = JSON.parse(url.searchParams.get('categories')) || [];

  return json({
    products: cats.length ? await getFilteredProducts(cats) : await getProducts(),
    categories: await getCategories(),
  });
};

export default function Index() {
  const { categories } = useLoaderData();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const products = useFetcher();

  const getSelectedCategories = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category));
      return;
    }
    setSelectedCategories([...selectedCategories, category]);
  };

  useEffect(() => {
    if (products.type === 'init') {
      products.load('/?index');
    }
  }, [products]);

  useEffect(() => {
    products.submit({ categories: JSON.stringify(selectedCategories) }, { method: 'get' });
  }, [selectedCategories]);

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Latest products</h2>

      <Filters categories={categories} getSelectedCategories={getSelectedCategories} />

      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {products.type === 'done' &&
          products.data.products.map((product) => (
            <ProductCard
              product_name={product.product_name}
              price={product.price}
              key={product.id}
              image={product.product_image.id}
              category={product.category[0].categories_id}
              slug={product.slug}
            />
          ))}
      </div>
    </div>
  );
}
