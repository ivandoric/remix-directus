import { getProduct } from '~/models/product.server';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

const assetsUrl = 'http://localhost:8055/assets';

export const loader = async ({ params }) => {
  return json({
    product: await getProduct(params.slug),
  });
};

export const meta = ({ data }) => ({
  title: data.product.product_name,
  description: 'Some product description.',
});

export default function ProductPage() {
  const { product } = useLoaderData();

  return (
    <section className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="md:flex">
        <div className="">
          <img
            className="w-full object-center object-cover group-hover:opacity-75"
            src={`${assetsUrl}/${product.product_image.id}?width=385&height=385`}
          />
        </div>
        <div className="mt-2 md:ml-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 ">{product.product_name}</h2>
          {product.show_colors && (
            <div className="mt-4">
              <p className="mb-4 font-bold">Choose a color</p>
              <div className="flex">
                {product.available_colors.map((color) => (
                  <div key={color.product_colors_id.id}>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        value={color.product_colors_id.color_value}
                        className="absolute opacity-0 h-0 w-0 peer"
                        name="colors"
                        onChange={(evt) => setColorValue(evt.target.value)}
                      />
                      <span
                        className="w-8 h-8 peer-checked:shadow-[0_0_0_2px_rgba(204,204,204)] rounded-2xl mr-2 border-white border-2"
                        style={{ background: color.product_colors_id.color_value }}
                      ></span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.show_sizes && (
            <div className="mt-4">
              <p className="mb-4 font-bold">Choose a size</p>
              <div className="flex">
                {product.available_sizes.map((size) => (
                  <div key={size.product_sizes_id.id}>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        value={size.product_sizes_id.short_title}
                        className="mr-2 absolute opacity-0 h-0 w-0 peer"
                        name="sizes"
                        onChange={(evt) => setSizeShortTitle(evt.target.value)}
                      />
                      <span className="w-8 h-8 peer-checked:bg-black peer-checked:text-white peer-checked:border-black rounded mr-2 border-gray-300 border-2 flex items-center justify-center">
                        {size.product_sizes_id.short_title}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          <button
            className="mt-8 bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-700"
            onClick={() => addToCart()}
          >
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
}
