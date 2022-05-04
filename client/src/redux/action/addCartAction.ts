import { ADD_CART } from "api";
import axios from "axios";
import { Dispatch } from "react";
import { AddCartProductAction } from "types/addCart.types";
import { userInfo } from "types/user.types";
import {
  ADD_CART_PRODUCT_REQUEST,
  ADD_CART_PRODUCT_SUCCESS,
  ADD_CART_PRODUCT_FAIL,
  ADD_CART_PRODUCT_FINALLY,
} from "../actionTypes/userActionTypes";

const userInfoFromStorage: userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo") + "")
  : undefined;

export const addCart =
  (
    productId: String,
    productName: String,
    quantity: Number,
    price: Number,
    percentSale: Number,
    color: String,
    size: String
  ) =>
  async (dispatch: Dispatch<AddCartProductAction>) => {
    try {
      dispatch({
        type: ADD_CART_PRODUCT_REQUEST,
      });

      const req = await axios.post(
        ADD_CART,
        {
          productId: productId,
          productName: productName,
          quantity: quantity,
          price: price,
          percentSale: percentSale,
          color: color,
          size: size,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfoFromStorage.token}`,
          },
        }
      );

      if (req.data) {
        dispatch({
          type: ADD_CART_PRODUCT_SUCCESS,
          productInCart: req.data.cart.products,
        });
      }
    } catch (error: any) {
      dispatch({
        type: ADD_CART_PRODUCT_FAIL,
      });
    } finally {
      dispatch({
        type: ADD_CART_PRODUCT_FINALLY,
      });
    }
  };
