export type IDispatcherType = any;

declare global {
  interface Window {
    google: any;
  }
}

export type IGetParams = {
  [field: string]: string | number;
};

export type IError = {
  name: string;
  message: string;
  code: string;
  stack: string;
  data?: unknown;
};

export type IApiResponse<T> = {
  success: boolean;
  status: boolean;
  message: string;
  data: T;
};
