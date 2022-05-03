import { REGISTER } from "api";
import axios from "axios";
import { Dispatch } from "react";
import { RegisterAction } from "types/register.types";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_FINALLY,
} from "../actionTypes/userActionTypes";

export const register =
  (email: string, password: string) =>
  async (dispatch: Dispatch<RegisterAction>) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const req = await axios.post(REGISTER, {
        email: email,
        password: password,
      });

      if (req.data) {
        dispatch({
          type: USER_REGISTER_SUCCESS,
          message: "success",
        });
      }
    } catch (error: any) {
      dispatch({
        type: USER_REGISTER_FAIL,
        message: "fail",
      });
    } finally {
      dispatch({
        type: USER_REGISTER_FINALLY,
        message: "",
      });
    }
  };
