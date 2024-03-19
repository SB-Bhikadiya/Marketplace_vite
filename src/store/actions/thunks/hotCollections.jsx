import api from "../../../core/api";
import { Axios, Canceler } from "../../../core/axios";
import * as actions from "../../actions";
import { getHeaders } from "../helper";

export const fetchHotCollections = (collectionId) => async (dispatch) => {
  dispatch(actions.getHotCollections.request(Canceler.cancel));

  try {
    const { data } = await Axios.get(
      `${api.baseUrl + api.hotCollections}`,
      {
        cancelToken: Canceler.token,
        params: {
          address:collectionId
        },
        ...getHeaders(),
      }
    );
      console.log(data);
    dispatch(actions.getHotCollections.success(data));
  } catch (err) {
    console.log(err);

    dispatch(actions.getHotCollections.failure(err));
  }
};
