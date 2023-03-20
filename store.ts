import { combineReducers, configureStore, Action } from "@reduxjs/toolkit";

import authReducer from "@/slices/authSlice";
import { APP_LOGOUT } from "./utils/constants";

const appReducer = combineReducers({
  [authReducer.name]: authReducer.reducer,
});

const rootReducer = (state: any, action: Action) => {
  if (action?.type === APP_LOGOUT) {
    state = {};
  }

  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof appReducer>;

export type AppDispatch = typeof store.dispatch;
