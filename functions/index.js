const functions = require("firebase-functions");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey/messageApp.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://messageapp-bd79b.firebaseio.com"
});

/**
 * FIREBASE FUNCTIONS 사용법
 * .document() 은 다음과 같은 규칙으로 문서를 살핌.
 * "콜렉션이름/문서이름/콜렉션이름/문서이름/콜렉션이름/문서이름.."
 * 또한 마지막 path 는 콜렉션이 될 수 없고 오로지 문서만 가능함.
 * 따라서 마지막 path 가 id 인 경우 (대다수의 경우)
 * 다음과 같이 path 를 설정해야함.
 * .document("콜렉션이름/문서이름/.../{문서ID}")
 * 
 * 2018-08-31 박현도
 */
exports.onCheckNotifications = functions.firestore
  .document("notifications/global/messages/{messageId}")
  .onCreate((snap, context) => {  
    const newValue = snap.data().message;
    // console.log("newValue", newValue);
    // 주제 메시지는 아래와 같이 특별한 token 없이도 실행됨.
    const topic = "MessageAppTesting";
    const payload = {
      notification: {
        title: "Arrive New Message !",
        body: newValue.content,
        icon: newValue.userInfo.photoURL
      }
    };
    const options = {
      priority: "high",
      timeToLive: 60*60*2
    };
    // 추후 특정 사용자의 기기에 메시지를 보내려면 sendToDevice() 실행.
    // tokens 는 "users/{userId}/pushToken/token" 에 위치함. (로그인 시 생성됨)
    // return admin.messaging().sendToDevice(tokens, payload);
    return admin.messaging().sendToTopic(topic, payload, options);
  });
    


