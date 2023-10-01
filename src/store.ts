import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./features/translate/translateSlice"; // use createSlice

export const store = configureStore({
  // if only one reducer
  // reducer: rootReducer,

  //  if multiple reducers
   reducer: {
    root: rootReducer,

  },
});
export type StoreStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
