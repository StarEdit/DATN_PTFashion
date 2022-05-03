import { UserAction, userInfo } from "./../../types/user.types";
import { UserState } from "types/user.types";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "./../actionTypes/userActionTypes";

const userInfoFromStorage: userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo") + "")
  : undefined;

const initialState: UserState = {
  loading: true,
  message: "",
  userInfo: userInfoFromStorage,
};

export const userReducer = (
  state: UserState = initialState,
  action: UserAction
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.userInfo,
      };
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, message: action.message };
    case USER_LOGOUT:
      return {
        ...state,
        loading: false,
        userInfo: action.userInfo,
      };
    default:
      return state;
  }
};
