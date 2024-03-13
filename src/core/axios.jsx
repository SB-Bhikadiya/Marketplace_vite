import axios from "axios";

export const Axios = axios.create();
export const Canceler = axios.CancelToken.source();

export const AxiosInstance = axios.create({ baseURL: "http://127.0.0.1:3000" });
export const CancelerInstance = axios.CancelToken.source();
