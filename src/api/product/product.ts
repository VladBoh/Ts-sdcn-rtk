import { api } from '../index'; 

import type { Product, ProductAddData, ProductQueryParams } from './product.types';

const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], Partial<ProductQueryParams>>({
      query: ({ limit = 10, offset = 0, title }) => {
        let queryString = `/products?limit=${limit}&offset=${offset}`;
        if (title) {
          queryString += `&title=${title}`;
        }
        return queryString;
      },
      providesTags: ['products'],
    }),
    addProduct: builder.mutation<Product, ProductAddData>({
      query: (data) => ({
        url: '/products',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
} = productsApi;
