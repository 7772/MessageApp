import * as AuthUtils from "../../utils/auth";
import * as ProfileCreators from "./profile";

// Action Types
const LOADING = "MESSAGEAPP/login/LOADING";
const ERROR = "MESSAGEAPP/login/ERROR";
const LOGIN = "MESSAGEAPP/login/LOGIN";
const LOGOUT = "MESSAGEAPP/login/LOGOUT";

// Action Creators
export const attempt = () => ({
  type: LOADING
});

export const errors = err => ({
  type: ERROR,
  err
});

export const loggedIn = () => ({
  type: LOGIN
});

export const loggedOut = () => ({
  type: LOGOUT
});

// Initail State
const initialState = {
  loading: false,
  loggedIn: false,
  error: null
};

// reducer
export default (reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };

    case ERROR:
      return {
        loading: false,
        loggedIn: false,
        error: action.err
      };

    case LOGIN:
      return {
        loading: false,
        loggedIn: true,
        error: null
      };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
});

const getUserDataWithFirebase = async loginType => {
  console.log("getUserDataWithFirebase");
  try {
    let res;
    if (loginType === "facebook") {
      res = await AuthUtils.loginFB();
    } else {
      alert("로그인 실패!", "지원하지 않는 SNS 타입입니다.");
    }
    return Promise.resolve(res);
  } catch (error) {
    // 단순 취소는 resolve 처리해서 아래 login 으로 보내준다.
    if (error.status && error.status === "canceled") {
      return Promise.resolve();
    } else {
      return Promise.reject(error);
    }
  }
};

// // side effects, e.g. thunk, saga ..
export const login = loginType => async dispatch => {
  console.log("login");
  dispatch(attempt());

  let userDataWithFirebase = await getUserDataWithFirebase(loginType);

  // console.log("userDataWithFirebase", userDataWithFirebase);

  if (userDataWithFirebase && userDataWithFirebase.status === "OK") {
    let userInfo = userDataWithFirebase.userInfo;

    console.log("userInfo", userInfo);
    dispatch(ProfileCreators.addProfile(userInfo));
    dispatch(loggedIn());
  } else {
    // 전달받는 error 메시지로 에러 핸들링 
    // ...
    dispatch(errors());
  }
};

export const logout = () => async dispatch => {
  dispatch(attempt());
  AuthUtils.logout();
  dispatch(ProfileCreators.deleteProfile());
  dispatch(loggedOut());
};
