import {
  ADD_CART_PRODUCT_REQUEST,
  ADD_CART_PRODUCT_SUCCESS,
  ADD_CART_PRODUCT_FAIL,
  ADD_CART_PRODUCT_FINALLY,
} from "./../redux/actionTypes/userActionTypes";
import { ProductInCart } from "./cart.types";

export interface AddCartProductState {
  loading: boolean;
  productInCart: Array<ProductInCart>;
}

interface AddCartProductRequest {
  type: typeof ADD_CART_PRODUCT_REQUEST;
}

interface AddCartProductSuccess {
  type: typeof ADD_CART_PRODUCT_SUCCESS;
  productInCart: Array<ProductInCart>;
}

interface AddCartProductFail {
  type: typeof ADD_CART_PRODUCT_FAIL;
}

interface AddCartProductFinally {
  type: typeof ADD_CART_PRODUCT_FINALLY;
}

export type AddCartProductAction =
  | AddCartProductRequest
  | AddCartProductSuccess
  | AddCartProductFail
  | AddCartProductFinally;
