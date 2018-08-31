import {
  AccessToken as FBAccessToken,
  LoginManager as FBLoginManager,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";
import firebase from 'react-native-firebase'

const getFcmToken = async () => {
  try {
    const token = await firebase.messaging().getToken();
    console.log("token", token);
    return Promise.resolve({ status: "OK", token: token });
  } catch (error) {
    console.log("error", error);
    return Promise.reject({ status: "Failure", error: error });
  }
};

const handleAddTokenWithFirestorm = async payload => {
  try {
    const ref = firebase.firestore().collection("users")
    const setToken = ref.doc(payload.uid).set({ pushToken: payload.fcmToken});
    return Promise.resolve({ status: "OK" });
  } catch (error) {
    return Promise.reject({ status: "Failure", error: error });
  }
};

const fbGetCredential = async () => {
  console.log("fbGetCredential");
  try {
    const result = await FBLoginManager.logInWithReadPermissions(['public_profile', 'email']);
    if (result.isCancelled) {
      return Promise.reject({
        status: "canceled"
      });
    }
    // console.log(`Login success with permissions: ${result}`);
    // get the access token
    const data = await FBAccessToken.getCurrentAccessToken();
    if (!data) {
      return Promise.reject({
        status: "Failure",
        error: "Can't get AccessToken from Facebook"
      });
    }
    // create a new firebase credential with the token
    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
    // console.log("credential with Firebase", credential);
    const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
    // console.log("currentUser with Firebase", currentUser.user.toJSON());
    
    if (!currentUser) {
      return Promise.reject({
        status: "Failure",
        error: "Can't get currentUser with Firebase. Please try again later."
      });
    }

    const fcmToken = await getFcmToken();

    if (fcmToken) {
      let payload = {
        uid: currentUser.user.uid,
        fcmToken: fcmToken
      };
      const firestormResponse = await handleAddTokenWithFirestorm(payload);
      console.log("firestormResponse", firestormResponse);
    } else {
      console.log("Can't get Device Token");
    }

    let userInfo = {
      name: currentUser.user.displayName,
      email: currentUser.user.email,
      uid: currentUser.user.uid,
      providerId: currentUser.user.providerId,
      photoURL: currentUser.user.photoURL,
      phoneNumber: currentUser.user.phoneNumber,
      emailVerified: currentUser.user.emailVerified
    };

    return Promise.resolve({
      userInfo: userInfo,
      status: "OK"
    });

  } catch (e) {
    console.error(e);
  }
}

const cleanLoginStatus = () => {
  firebase.auth().signOut()
    .then(data => console.log(data))
    .catch(error => console.log(error))
};


export const logout = () => {
  FBLoginManager.logOut();
  cleanLoginStatus();
};

export async function loginFB() {
  console.log("loginFB");
  try {
    const credential = await fbGetCredential();
    return Promise.resolve(credential);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

