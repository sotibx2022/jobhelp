import { configureStore } from "@reduxjs/toolkit";
import jobDetailsReducer from "./jobdetailsSlice";
export const store = configureStore({
  reducer: {
    jobDetails: jobDetailsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
