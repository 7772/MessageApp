import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import appReducer from "./reducers";

const logger = ({ getState }) => {
  return next => action => {
    console.log("will dispatch", action);

    const returnValue = next(action);

    console.log("state after dispatch", getState());

    return returnValue;
  };
};

export const store = createStore(
  appReducer,
  undefined,
  applyMiddleware(thunk, logger)
);
