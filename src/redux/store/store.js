import { configureStore } from "@reduxjs/toolkit";
import { restaurantesReducer } from "../reducers/restaurantesReducers";
import { userReducer } from "../reducers/userReducers";

const reducer = {
  user: userReducer,
  restaurantesStore: restaurantesReducer,
};

const store = configureStore({
  reducer,
  devTool: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
