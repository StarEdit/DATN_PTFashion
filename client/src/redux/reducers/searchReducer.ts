import {
  SEARCH_FAIL,
  SEARCH_FINALLY,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
} from "redux/actionTypes/userActionTypes";
import { SearchAction, SearchState } from "./../../types/searchProduct.types";

const initialState: SearchState = {
  loading: true,
  product: [],
};

export const searchReducer = (
  state: SearchState = initialState,
  action: SearchAction
) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return { ...state, loading: true };
    case SEARCH_SUCCESS:
      return { ...state, loading: false, product: action.product };
    case SEARCH_FAIL:
      return { ...state, loading: false };
    case SEARCH_FINALLY:
      return { ...state, loading: false };
    default:
      return state;
  }
};
