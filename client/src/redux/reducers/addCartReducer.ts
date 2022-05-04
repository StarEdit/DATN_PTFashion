import { AddCartProductAction, AddCartProductState } from "types/addCart.types";
import {
  ADD_CART_PRODUCT_FAIL,
  ADD_CART_PRODUCT_FINALLY,
  ADD_CART_PRODUCT_REQUEST,
  ADD_CART_PRODUCT_SUCCESS,
} from "./../actionTypes/userActionTypes";

const initialState: AddCartProductState = {
  loading: true,
  productInCart: [],
};

export const addCartReducer = (
  state: AddCartProductState = initialState,
  action: AddCartProductAction
) => {
  switch (action.type) {
    case ADD_CART_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case ADD_CART_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        productInCart: action.productInCart,
      };
    case ADD_CART_PRODUCT_FAIL:
      return { ...state, loading: false };
    case ADD_CART_PRODUCT_FINALLY:
      return { ...state, loading: false };
    default:
      return state;
  }
};
