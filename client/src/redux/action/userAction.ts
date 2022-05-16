import { toast } from "react-toastify";
import { LOGIN, LOGOUT } from "api";
import axios from "axios";
import { Dispatch } from "react";
import { UserAction } from "types/user.types";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "../actionTypes/userActionTypes";

export const login =
  (email: string, password: string) =>
  async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });

      const req = await axios.post(LOGIN, {
        email: email,
        password: password,
      });

      if (req.data) {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          userInfo: req.data,
        });

        localStorage.setItem("userInfo", JSON.stringify(req.data));
        localStorage.setItem("token", JSON.stringify(req.data.token));
        window.location.reload();
      }
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        message: "Email hoặc mật khẩu không chính xác",
      });
      toast.error("Email hoặc mật khẩu không chính xác");
    }
  };

export const logout = () => async (dispatch: Dispatch<UserAction>) => {
  try {
    dispatch({
      type: USER_LOGOUT,
      userInfo: { _id: "", name: "", email: "", isAdmin: false, token: "" },
    });
    await axios.post(LOGOUT);
    localStorage.clear();
  } catch (error) {}
};
