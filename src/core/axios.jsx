import axios from "axios";
import { BASE_URL } from "../constants/endpoints";
import { MARKETPLACE_TOKEN } from "../constants/keys";

export const Axios = axios.create();
export const Canceler = axios.CancelToken.source();

export const AxiosInstance = axios.create({ baseURL: BASE_URL,headers: {Authorization:`Bearer ${localStorage.getItem(MARKETPLACE_TOKEN)}`} });
export const CancelerInstance = axios.CancelToken.source();
