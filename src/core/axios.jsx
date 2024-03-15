import axios from "axios";
import { BASE_URL } from "../constants/endpoints";

export const Axios = axios.create();
export const Canceler = axios.CancelToken.source();

export const AxiosInstance = axios.create({ baseURL: BASE_URL });
export const CancelerInstance = axios.CancelToken.source();
