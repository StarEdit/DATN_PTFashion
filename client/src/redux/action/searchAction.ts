import { GET_PRODUCT_NAME } from "api";
import axios from "axios";
import { Dispatch } from "react";
import { SearchAction } from "types/searchProduct.types";
import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  SEARCH_FINALLY,
} from "../actionTypes/userActionTypes";

export const search =
  (name: string) => async (dispatch: Dispatch<SearchAction>) => {
    try {
      dispatch({
        type: SEARCH_REQUEST,
      });

      const req = await axios.get(`${GET_PRODUCT_NAME}${name}`);

      if (req.data) {
        dispatch({
          type: SEARCH_SUCCESS,
          product: req.data.products,
        });
      }
    } catch (error: any) {
      dispatch({
        type: SEARCH_FAIL,
      });
    } finally {
      dispatch({
        type: SEARCH_FINALLY,
      });
    }
  };
