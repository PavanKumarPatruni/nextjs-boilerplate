import { LOGIN_API } from "./constants";
import { Get, Patch, Post } from "./interceptor";

export const loginApi = async (data: any) => {
  return await Post(LOGIN_API, data);
};
