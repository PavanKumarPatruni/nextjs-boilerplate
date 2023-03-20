import { deleteCookie, setCookie } from "cookies-next";
import { toast } from "react-toastify";
import Router from "next/router";

import { store } from "@/store";

import { IS_LOGGED_IN, ACCESS_TOKEN, APP_LOGOUT } from "./constants";
import { saveData } from "./localStorage";
import { setLoggedIn } from "@/slices/authSlice";

export const loginUser = (accessToken: string) => {
  showSuccessToast("Logged in successfully!!");
  store.dispatch(setLoggedIn());
  saveData(IS_LOGGED_IN, true);
  setCookie(ACCESS_TOKEN, accessToken);
};

export const logoutUser = () => {
  showErrorToast("Logged out!!");
  store.dispatch({ type: APP_LOGOUT });
  saveData(IS_LOGGED_IN, false);
  deleteCookie(ACCESS_TOKEN);
  Router.replace("/");
};

export const showErrorToast = (message: string) => {
  toast.error(message);
};

export const showWarningToast = (message: string) => {
  toast.warning(message);
};

export const showSuccessToast = (message: string) => {
  toast.success(message);
};

export const showToast = (message: string) => {
  toast(message);
};

export const setThemeAttr = (mode: string) => {
  document.documentElement.setAttribute("data-theme", mode);
};

export const getThemeAttr = () => {
  return document.documentElement.getAttribute("data-theme");
};
