// Action Types
const LOADING = 'MESSAGEAPP/message/LOADING';
const ADD_MESSAGE = 'MESSAGEAPP/message/ADD_MESSAGE';
 
// Action Creators

/**
 * addMessage
 * @param {content, userInfo, sendTime} payload 
 */
export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  message
});

export const loading = (bool) => ({
  type: LOADING,
  bool,
});

// Initail State
const initialState = {
  messages: [],
  loading: false
};
 
// reducer
export default (reducer = (state = initialState, action) => {
 switch (action.type) {
   case ADD_MESSAGE:
     return {
      ...state,
      messages: [...state.messages, action.message]
     }

    case LOADING:
      return {
        ...state,
        loading: action.bool
      }
   default:
     return state;
 }
});
 
// side effects, e.g. thunk, saga ..
// export const getData = () => async dispatch => {
//  try {
//    return Promise.resolve();
//  } catch (error) {
//    console.log(error);
//    return Promise.reject(error);
//  }
// }