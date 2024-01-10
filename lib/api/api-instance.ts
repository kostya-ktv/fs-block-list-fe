import axios, { AxiosError, AxiosRequestConfig } from "axios";

const apiInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createInstance = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const res = await apiInstance({
    ...config,
    ...options,
  });
  return res.data;
};
export type BodyType<T> = T;
export type ErrorType<T> = AxiosError<T>;
