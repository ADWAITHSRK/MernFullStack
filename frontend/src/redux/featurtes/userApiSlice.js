import { apiSlice } from "./apiSlice";
import { USER_URL } from "../../Const";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        register : builder.mutation({
            query : (data) =>(
                {
                    url :`${USER_URL}/register`,
                    method:"POST",
                    body:data,
                    credentials:'include'
                }
            )
        }),

        login : builder.mutation({
            query : (data) =>(
                {
                    url :`${USER_URL}/login`,
                    method:"POST",
                    body:data,
                    credentials : 'include',
                }
            )
        }),

        logout : builder.mutation({
            query : () =>(
                {
                    url :`${USER_URL}/logout`,
                    method:"POST",
                    credentials : 'include',
                }
            )
        }),

        getProfile : builder.query({
            query : () =>(
                {
                    url :`${USER_URL}/profile`,
                    method:"GET",
                    credentials : 'include',
                }
            ),
            providesTags : ['User'],
        }),

        updateProfile : builder.mutation({
            query : (formData) =>(
                {
                    url :`${USER_URL}/profile/update`,
                    method:"PUT",
                    body:formData,
                    credentials : 'include',
                }
            ),
            providesTags : ['User'],
        }),





    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useGetProfileQuery,
    useUpdateProfileMutation
  } = userApiSlice;