import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { registerReducer } from "./registerReducer";
import { searchReducer } from "./searchReducer";

const rootReducer = combineReducers({
  userReducer: userReducer,
  registerReducer: registerReducer,
  searchReducer: searchReducer,
});

export default rootReducer;

export type State = ReturnType<typeof rootReducer>;
