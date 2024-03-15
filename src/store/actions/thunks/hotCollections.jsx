import api from "../../../core/api";
import { Axios, Canceler } from "../../../core/axios";
import * as actions from "../../actions";
import { getHeaders } from "../helper";

export const fetchHotCollections = (collectionId) => async (dispatch) => {
  dispatch(actions.getHotCollections.request(Canceler.cancel));

  try {
    const { data } = await Axios.get(
      `${api.baseUrl + api.nfts}`,
      {
        cancelToken: Canceler.token,
        params: {
          page:collectionId
        },
        ...getHeaders(),
      }
    );

    dispatch(actions.getHotCollections.success(data.data));
  } catch (err) {
    dispatch(actions.getHotCollections.failure(err));
  }
};
