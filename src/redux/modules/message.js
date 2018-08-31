import firebase from "react-native-firebase";
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

const handleFirestrom = async message => {
  try {
    const messageCollection = firebase.firestore().collection("notifications")
      .doc("global").collection("messages");
    const docRef = await messageCollection.add({ message: message });
    // console.log("docRef", docRef);
    if (!docRef) {
      return Promise.reject({ status: "Failure" });
    } else {
      return Promise.resolve({ status: "OK", docId: docRef.id });
    }
  } catch (error) {
    return Promise.reject({ status: "Failure", error: error });
  }
};
 
// side effects, e.g. thunk, saga ..
export const messageWithFirestorm = (message) => async dispatch => {
  dispatch(loading(true));
  const firestormReponse = await handleFirestrom(message);
  if ( firestormReponse && firestormReponse.status === "OK" ) {
    // console.log("firestormReponse", firestormReponse);
    // message 객체에 docId 를 추가함으로써
    // 추후 firestore 삭제 기능을 사용할 수 있도록 함.
    message.docId = firestormReponse.docId;
    dispatch(addMessage(message));
    dispatch(loading(false));
  } else {
    dispatch(loading(false));
    alert("현재 전체 알림기능을 사용할 수 없습니다. 잠시 후 다시 시도해주세요..");
  }

}