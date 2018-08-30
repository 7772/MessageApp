// Action Types
const SHOW_PROFILE = "MESSAGEAPP/profile/SHOW_PROFILE";
const ADD_PROFILE = "MESSAGEAPP/profile/ADD_PROFILE";
const DELETE_PROFILE = "MESSAGEAPP/profile/DELETE_PROFILE";

// Action Creators
export const showProfile = bool => ({
  type: SHOW_PROFILE,
  bool
});

export const addProfile = userInfo => ({
  type: ADD_PROFILE,
  userInfo
});

export const deleteProfile = () => ({
  type: DELETE_PROFILE
});

// Initail State
const initialState = {
  isShowProfile: false,
  name: null,
  email: null,
  uid: null,
  providerId: null,
  photoURL: null,
  phoneNumber: null,
  emailVerified: null
};

// reducer
export default (reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_PROFILE:
      return {
        ...state,
        isShowProfile: action.bool
      };

    case ADD_PROFILE:
      return {
        name: action.userInfo.name,
        email: action.userInfo.email,
        uid: action.userInfo.uid,
        providerId: action.userInfo.providerId,
        photoURL: action.userInfo.photoURL,
        phoneNumber: action.userInfo.phoneNumber,
        emailVerified: action.userInfo.emailVerified
      };

    case DELETE_PROFILE:
      return initialState;

    default:
      return state;
  }
});

// // side effects, e.g. thunk, saga ..
// export const getData = () => async dispatch => {
//   try {
//     return Promise.resolve();
//   } catch (error) {
//     console.log(error);
//     return Promise.reject(error);
//   }
// };
