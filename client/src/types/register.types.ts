import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_FINALLY,
} from "./../redux/actionTypes/userActionTypes";

export interface RegisterState {
  loading: boolean;
  message: string;
}

interface RegisterRequest {
  type: typeof USER_REGISTER_REQUEST;
}

interface RegisterSuccess {
  type: typeof USER_REGISTER_SUCCESS;
  message: string;
}

interface RegisterFail {
  type: typeof USER_REGISTER_FAIL;
  message: string;
}

interface RegisterFinally {
  type: typeof USER_REGISTER_FINALLY;
  message: string;
}

export type RegisterAction =
  | RegisterRequest
  | RegisterSuccess
  | RegisterFail
  | RegisterFinally;
