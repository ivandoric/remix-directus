import getData from '~/queries/getData';
import {
  HomepageProductsQuery,
  HomepageCategoriesQuery,
  HomepageFilteredProductsQuery,
} from '~/queries/HomepageQueries';

export async function getProducts() {
  return await getData(HomepageProductsQuery, 'products');
}

export async function getCategories() {
  return await getData(HomepageCategoriesQuery, 'categories');
}

export async function getFilteredProducts(query) {
  return await getData(HomepageFilteredProductsQuery, 'products', { categories: query });
}
