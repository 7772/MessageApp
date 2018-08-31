import {
  AccessToken as FBAccessToken,
  LoginManager as FBLoginManager,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";
import firebase from 'react-native-firebase'

const fbGetCredential = async () => {
  console.log("fbGetCredential");
  try {
    const result = await FBLoginManager.logInWithReadPermissions(['public_profile', 'email']);
    if (result.isCancelled) {
      return Promise.reject({
        status: "canceled"
      });
    }
    console.log(`Login success with permissions: ${result}`);
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
    console.log("credential with Firebase", credential);
    const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
    console.log("currentUser with Firebase", currentUser.user.toJSON());
    
    if (!currentUser) {
      return Promise.reject({
        status: "Failure",
        error: "Can't get currentUser with Firebase. Please try again later."
      });
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

