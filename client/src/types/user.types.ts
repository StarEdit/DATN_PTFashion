import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "./../redux/actionTypes/userActionTypes";
export interface User {
  full_name: String;
  email: String;
  password: String;
  phone: String;
  address: String;
  isWork: Boolean;
  isAdmin: Boolean;
  resetPasswordToken: String;
}

export interface UserState {
  loading: boolean;
  message: string;
  userInfo: userInfo;
}

export interface userInfo {
  _id: String;
  name: String;
  email: String;
  isAdmin: Boolean;
  token: String;
}

interface LoginRequest {
  type: typeof USER_LOGIN_REQUEST;
}

interface LoginSuccess {
  type: typeof USER_LOGIN_SUCCESS;
  userInfo: userInfo;
}

interface LoginFail {
  type: typeof USER_LOGIN_FAIL;
  message: string;
}

interface Logout {
  type: typeof USER_LOGOUT;
  userInfo: userInfo;
}

export type UserAction = LoginRequest | LoginSuccess | LoginFail | Logout;
