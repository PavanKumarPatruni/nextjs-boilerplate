import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
  CancelToken,
} from "axios";
import { getCookie } from "cookies-next";

import { ACCESS_TOKEN } from "@/utils/constants";

import { IGetParams, IApiResponse, IError } from "@/types";

const Request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_PATH,
  headers: { "Content-Type": "application/json" },
});

const serializeError = (error: AxiosError): IError => {
  const { response } = error;
  if (!response) throw error;
  const { status, statusText, data } = response as AxiosResponse;
  const { message } = data;
  let errorMsg = "";
  try {
    errorMsg = JSON.parse(message).error.debug_msg;
  } catch (e) {
    errorMsg = message;
  }
  const errorObj = {
    name: "API ERROR",
    message: errorMsg || statusText || `API FAILED (${status})`,
    code: status.toString(),
    stack: JSON.stringify(error.toJSON()),
  };
  return errorObj;
};

const tokenHeaderInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = getCookie(ACCESS_TOKEN);
  if (!token) return config;

  config.headers["token"] = token;
  return config;
};

const onErrorInterceptor = (error: AxiosError): IError => {
  throw serializeError(error);
};

Request.interceptors.request.use(tokenHeaderInterceptor, undefined);
Request.interceptors.response.use(undefined, onErrorInterceptor);

const extractor = <T>(response: AxiosResponse<IApiResponse<T>>) => {
  const { status, data, statusText } = response;
  if (status !== 200) throw new Error(statusText);
  return data.data;
};

export const Get = <T>(
  path: string,
  params?: Partial<IGetParams>,
  config?: InternalAxiosRequestConfig,
  cancelToken?: CancelToken
): Promise<T> =>
  Request.get<IApiResponse<T>>(path, { ...config, params, cancelToken }).then(
    extractor
  );

export const Post = <T>(
  path: string,
  payload: unknown,
  config?: InternalAxiosRequestConfig,
  cancelToken?: CancelToken
): Promise<T> =>
  Request.post<IApiResponse<T>>(path, payload, { ...config, cancelToken }).then(
    extractor
  );

export const Patch = <T>(
  path: string,
  payload?: unknown,
  config?: InternalAxiosRequestConfig,
  cancelToken?: CancelToken
): Promise<T> =>
  Request.patch<IApiResponse<T>>(path, payload, {
    ...config,
    cancelToken,
  }).then(extractor);

export const Delete = <T>(
  path: string,
  config?: InternalAxiosRequestConfig,
  cancelToken?: CancelToken
): Promise<T> =>
  Request.delete<IApiResponse<T>>(path, {
    ...config,
    cancelToken,
  }).then(extractor);
