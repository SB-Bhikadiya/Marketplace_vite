import { USER_ENDPOINT } from "../../../constants/endpoints";
import api from "../../../core/api";
import { Axios, Canceler } from "../../../core/axios";
import * as actions from "../../actions";
import { getHeaders } from "../helper";

export const fetchAuthorList = (authorId) => async (dispatch) => {
  dispatch(actions.getAuthorList.request(Canceler.cancel));

  try {
    if (authorId) {
      const { data } = await Axios.get(`${api.baseUrl}${USER_ENDPOINT}`, {
        cancelToken: Canceler.token,
        ...getHeaders(),
        params: { author: authorId },
      });

      dispatch(actions.getAuthorList.success(data));
    } else {
      const { data } = await Axios.get(`${api.baseUrl}${USER_ENDPOINT}`, {
        cancelToken: Canceler.token,
        ...getHeaders(),
      });

      dispatch(actions.getAuthorList.success(data));
    }
  } catch (err) {
    dispatch(actions.getAuthorList.failure(err));
  }
};

export const fetchAuthorRanking = () => async (dispatch) => {
  dispatch(actions.getAuthorRanking.request(Canceler.cancel));

  try {
    const { data } = await Axios.get(`${api.baseUrl}${USER_ENDPOINT}`, {
      cancelToken: Canceler.token,
      ...getHeaders(),
      params: {},
    });

    dispatch(actions.getAuthorRanking.success(data));
  } catch (err) {
    dispatch(actions.getAuthorRanking.failure(err));
  }
};
