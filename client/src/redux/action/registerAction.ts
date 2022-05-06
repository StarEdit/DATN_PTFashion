import { REGISTER } from "api";
import axios from "axios";
import { Dispatch } from "react";
import { toast } from "react-toastify";
import { RegisterAction } from "types/register.types";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_FINALLY,
} from "../actionTypes/userActionTypes";

export const register =
  (fullname: string, email: string, password: string) =>
  async (dispatch: Dispatch<RegisterAction>) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const req = await axios.post(REGISTER, {
        full_name: fullname,
        email: email,
        password: password,
      });

      if (req.data) {
        dispatch({
          type: USER_REGISTER_SUCCESS,
          message: "success",
        });
        toast.success("Đăng ký thành công");
      }
    } catch (error: any) {
      dispatch({
        type: USER_REGISTER_FAIL,
        message: "fail",
      });
      toast.error("Email đã tồn tại");
    } finally {
      dispatch({
        type: USER_REGISTER_FINALLY,
        message: "",
      });
    }
  };
