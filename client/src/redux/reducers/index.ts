import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { registerReducer } from "./registerReducer";

const rootReducer = combineReducers({
  userReducer: userReducer,
  registerReducer: registerReducer,
});

export default rootReducer;

export type State = ReturnType<typeof rootReducer>;
