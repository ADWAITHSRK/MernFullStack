import { apiSlice } from "./apiSlice";
import { PRODUCT_URL } from "../../Const";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints :(builder) => ({
        getProducts : builder.query({
            query:()=>PRODUCT_URL,
            keepUnusedDataFor:5,
        }),
        getProductDetails : builder.query({
            query:(productId)=>`${PRODUCT_URL}/${productId}`,
            keepUnusedDataFor:5,
        }),
        getTotalCount : builder.query({
            query:()=>`${PRODUCT_URL}/getcount`,
            keepUnusedDataFor:5,
        }),
        createProduct: builder.mutation({
            query: (data) => ({
              url: `${PRODUCT_URL}/create`,
              method: "POST",
              body: data,
            }),
          }),
        
          deleteProduct: builder.mutation({
            query: (productId) => ({
              url: `${PRODUCT_URL}/delete/${productId}`,
              method: "POST",
              body: data,
            }),
          }),
    })
})

export const { useGetProductsQuery, useGetProductDetailsQuery,useGetTotalCountQuery,createProduct } = productApiSlice;
