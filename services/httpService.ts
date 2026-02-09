import axios, { AxiosInstance, AxiosResponse } from "axios";

type Options = {
  urlParams?: Record<string, string>;
  params?: Record<string, any>;
};

let axiosInstance: AxiosInstance | null = null;
const env = process.env;

const createAxiosInstance = () => {
  const BASE_URL = env.EXPO_PUBLIC_BASE_URL;
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: BASE_URL,
      params: {
        units: "metric",
        appid: env.EXPO_PUBLIC_WEATHER_API_KEY,
      },
      headers: { "Content-Type": "application/json" },
    });
  }
  axiosInstance.interceptors.request.use(
    (config) => config,
    (error) => {
      return Promise.reject(error);
    },
  );
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      return {
        status: error.response ? error.response.status : 500,
        data: error.response
          ? error.response.data
          : { message: "Network Error" },
      };
    },
  );
  return axiosInstance;
};

const request = async (url: string, options = {}, method: string) => {
  const { urlParams, params } = options as Options;
  let finalURL = url;
  if (urlParams) {
    const params = new URLSearchParams(
      urlParams as Record<string, string>,
    ).toString();
    finalURL = `${url}?${params}`;
  }
  try {
    const instance = createAxiosInstance();
    const response = await instance({
      url: finalURL,
      method,
      params: urlParams,
    });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    throw error;
  }
};

export const get = (url: string, options?: Options) =>
  request(url, options, "GET");
