import { RegisterState, RegisterAction } from "./../../types/register.types";
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_FINALLY,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "./../actionTypes/userActionTypes";

const initialState: RegisterState = {
  loading: true,
  message: "",
};

export const registerReducer = (
  state: RegisterState = initialState,
  action: RegisterAction
) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, message: action.message };
    case USER_REGISTER_FAIL:
      return { ...state, loading: false, message: action.message };
    case USER_REGISTER_FINALLY:
      return { ...state, loading: false, message: action.message };
    default:
      return state;
  }
};
