import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000",
    }),
    endpoints: (builder) => ({
        getUserById: builder.query({
            query: (id) => `/users/${id}`,
        }),
        getUsers: builder.query({
            query: () => `/users`,
        }),
        saveUser: builder.mutation({
            query: (user) => ({
                url: "/users",
                method: "POST",
                body: user,
            }),
        }),
        updateUser: builder.mutation({
            query: (user) => ({
                url: `/users/${user.id}`,
                method: "PUT",
                body: user,
            }),
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",

            }),
        }),
    })

});


export const {
    useGetUserByIdQuery,
    useGetUsersQuery,
    useSaveUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = usersApi;



