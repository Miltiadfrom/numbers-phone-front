import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const phonesApi = createApi({
    reducerPath: "phonesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000",
    }),
    endpoints: (builder) => ({
        getPhonesBySubId: builder.query({
            query: (id) => `/phones/${id}`,
        }),
        savePhone: builder.mutation({
            query: (phone) => ({
                url: "/phones",
                method: "POST",
                body: phone,
            }),
        }),
        deletePhone: builder.mutation({
            query: (number) => ({
                url: `/phones/${number}`,
                method: "DELETE",

            }),
        }),
    })

});


export const {
    useDeletePhoneMutation,
    useGetPhonesBySubIdQuery,
    useSavePhoneMutation
} = phonesApi;



