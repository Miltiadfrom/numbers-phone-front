import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query"; 
import { usersApi } from "../api/users";
import { phonesApi } from "../api/phones";
import { paymentsApi } from "../api/payments";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer, 
    [phonesApi.reducerPath]: phonesApi.reducer,
    [paymentsApi.reducerPath]: paymentsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware, phonesApi.middleware, paymentsApi.middleware),
});

setupListeners(store.dispatch);