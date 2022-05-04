import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { registerReducer } from "./registerReducer";
import { searchReducer } from "./searchReducer";
import { addCartReducer } from "./addCartReducer";

const rootReducer = combineReducers({
  userReducer: userReducer,
  registerReducer: registerReducer,
  searchReducer: searchReducer,
  addCartReducer: addCartReducer,
});

export default rootReducer;

export type State = ReturnType<typeof rootReducer>;
