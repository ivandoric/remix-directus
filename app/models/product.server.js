import getData from '~/queries/getData';
import { SingleProductQuery } from '~/queries/SingleProductQueries';

export async function getProduct(slug) {
  const data = await getData(SingleProductQuery, 'products', { product_slug: slug });
  return data[0];
}
