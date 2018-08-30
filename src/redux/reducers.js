import { combineReducers } from "redux";

import loginState from "./modules/login";
import profileState from "./modules/profile";
import messageState from "./modules/message";

const appReducer = combineReducers({
  loginState: loginState,
  profileState: profileState,
  messageState: messageState
});

export default appReducer;
