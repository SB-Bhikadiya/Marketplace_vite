import axios from "axios";

export const Axios = axios.create();
export const Canceler = axios.CancelToken.source();

export const AxiosInstance = axios.create({ baseURL: "http://192.168.1.12:3000" });
export const CancelerInstance = axios.CancelToken.source();
