import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query"; 
import { usersApi } from "../api/users";
import { phonesApi } from "../api/phones";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer, 
    [phonesApi.reducerPath]: phonesApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware, phonesApi.middleware),
});

setupListeners(store.dispatch);