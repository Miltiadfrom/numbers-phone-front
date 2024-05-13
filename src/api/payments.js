import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentsApi = createApi({
    reducerPath: "paymentsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:5000",
    }),
    endpoints: (builder) => ({
        getPaymentsBySubId: builder.query({
            query: (id) => `/payments/${id}`,
        }),
        savePayment: builder.mutation({
            query: (payment) => ({
                url: "/payments",
                method: "POST",
                body: payment,
            }),
        }),
    })

});


export const {
    useGetPaymentsBySubIdQuery,
    useSavePaymentMutation
} = paymentsApi;



