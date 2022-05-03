import { Product } from "./product.types";
import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  SEARCH_FINALLY,
} from "./../redux/actionTypes/userActionTypes";

export interface SearchState {
  loading: boolean;
  product: Array<Product> | Array<any>;
}

interface SearchRequest {
  type: typeof SEARCH_REQUEST;
}

interface SearchSuccess {
  type: typeof SEARCH_SUCCESS;
  product: Array<Product> | Array<any>;
}

interface SearchFail {
  type: typeof SEARCH_FAIL;
}

interface SearchFinally {
  type: typeof SEARCH_FINALLY;
}

export type SearchAction =
  | SearchRequest
  | SearchSuccess
  | SearchFail
  | SearchFinally;
