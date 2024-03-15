import { MARKETPLACE_TOKEN } from "../../constants/keys";

export const getHeaders = () => {
  return {
    headers: {
      Authorization: localStorage.getItem(MARKETPLACE_TOKEN),
    },
  };
};
