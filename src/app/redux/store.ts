import { configureStore } from "@reduxjs/toolkit";
import jobDetailsReducer from "./jobdetailsSlice";
import roadMapReducer from "./roadmapSlice";
import profileScoreReducer from "./profileScoreSlice";
import toastReducer from './toastSlice'
const combinedReducers = {
  jobDetails: jobDetailsReducer,
  roadmapDetails: roadMapReducer,
  profileScore:profileScoreReducer,
  toast:toastReducer
};
export const store = configureStore({
  reducer: combinedReducers,
  devTools: process.env.NODE_ENV !== "production",
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
