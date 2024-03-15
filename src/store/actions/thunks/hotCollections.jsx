import api from "../../../core/api";
import { Axios, Canceler } from "../../../core/axios";
import * as actions from "../../actions";
import { getHeaders } from "../helper";

export const fetchHotCollections = (collectionId) => async (dispatch) => {
  dispatch(actions.getHotCollections.request(Canceler.cancel));

  try {
    let filter = collectionId ? "id=" + collectionId : "";
    const { data } = await Axios.get(
      `${api.baseUrl + api.hotCollections}?${filter}`,
      {
        cancelToken: Canceler.token,
        params: {},
        ...getHeaders(),
      }
    );

    dispatch(actions.getHotCollections.success(data));
  } catch (err) {
    dispatch(actions.getHotCollections.failure(err));
  }
};
