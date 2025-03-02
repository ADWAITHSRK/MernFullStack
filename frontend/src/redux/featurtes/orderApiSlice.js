import { apiSlice } from "./apiSlice.js";
import { ORDER_URL } from "../../Const.js";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDER_URL,
        method: "POST",
        body: order,
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/getallorders`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Order"],
    }),
    updateOrder : builder.mutation({
        query : (order_Id) =>({
            url : `${ORDER_URL}/updateorder/${order_Id}`,
            method : 'PATCH',
            body :order_Id,
        })
    }),
  }),
});

export const { useCreateOrderMutation ,useGetOrdersQuery,useUpdateOrderMutation} = orderApiSlice;
