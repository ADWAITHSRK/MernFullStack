import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../Const";


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL ,credentials : 'include'}),
    tagTypes: ["Product", "Order", "User"],
    endpoints: () => ({}), 
})