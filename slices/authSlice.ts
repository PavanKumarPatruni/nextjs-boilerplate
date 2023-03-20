import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { RootState } from "@/store";

export interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    setLoggedOut: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { setLoggedIn, setLoggedOut } = authSlice.actions;

export const useAuthSelector = (): AuthState =>
  useSelector(
    (state: RootState): AuthState => state[authSlice.name] || initialState
  );

export default authSlice;
