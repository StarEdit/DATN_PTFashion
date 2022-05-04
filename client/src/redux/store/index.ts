import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "redux/reducers";

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

export * as userAction from "../action/userAction";
export * as registerAction from "../action/registerAction";
export * as SearchAction from "../action/searchAction";
export * as AddCartAction from "../action/addCartAction";
