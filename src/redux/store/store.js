import { configureStore } from "@reduxjs/toolkit";
import {
  foodReducer,
  ordenReducer,
  restaurantesReducer,
} from "../reducers/restaurantesReducers";
import { userReducer } from "../reducers/userReducers";

const reducer = {
  userStore: userReducer,
  restaurantesStore: restaurantesReducer,
  foodStore: foodReducer,
  ordenStore: ordenReducer,
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
