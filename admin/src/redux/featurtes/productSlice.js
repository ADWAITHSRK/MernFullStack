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
        })
    })
})

export const { useGetProductsQuery, useGetProductDetailsQuery,useGetTotalCountQuery } = productApiSlice;
