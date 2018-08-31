import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import PropTypes from "prop-types";
import { SafeAreaView } from "react-navigation";
import { SharedStyles, MessageStyles } from "../styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as MessageCreators from "../redux/modules/message";
import MessageScreen from "../components/MessageScreen";
import LoginContainer from "../containers/LoginContainer";
import ContentInputBox from '../components/ContentInputBox';
import firebase, { Notification } from "react-native-firebase";


class MessageContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

componentDidMount() {
  this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      console.log("notificationDisplayedListener");
  });
  this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
      // Process your notification as required
      console.log("notification", notification);
      Alert.alert(notification._title, notification._body);
  });
  this.subscribeToTopic();
}

componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
}

subscribeToTopic() {
  console.log("subscribeToTopic");
  firebase.messaging().subscribeToTopic("MessageAppTesting");
}

handleMessage(content) {
  this.setState({content: content});
}

  handleSubmit = () => {
    /** 기존 방식 - Redux 만 이용
     *  1. content 가 있는 상태로 전송버튼을 누르면
     *    - 로딩 상태를 true 로 변경시켜줌
     *    - message 객체를 정의
     *    - message redux 로 보내줌
     *    - content 를 초기상태로 돌려줌
     *    - 로딩 상태를 false 로 돌려놓음
     *  2. content 가 없는 상태로 전송버튼을 누르면
     *    - "메시지를 입력해주세요" alert 출력
     * 
     * 새로운 방식 - Firebase firestorm + Redux 사용
     *  1. content 가 있는 상태로 전송버튼을 누르면
     *    - message 객체를 정의
     *    - handleMessageWithFirestorm 으로 보내줌 
     *  2. content 가 없는 상태로 전송버튼을 누르면
     *    - "메시지를 입력해주세요" alert 출력
     * 
     * handleMessageWithFirestorm 동작 방식 정리
     *  1. 로딩 상태를 true 로 변경시켜줌
     *  2. firestorm 으로 메시지를 전송시킴
     *  3. store 에 메시지 객체를 추가시킴 
     *  (단순 앱에 메시지를 보여주는 기능은 
     *    firestore API 통신을 하지않고 앱에서 그대로 보여줌)
     *  4. 로딩 상태를 false 로 돌려놓음
     */ 
    if (this.state.content !== '') {
        // this.props.handleLoading(true);
        let message = {
          content: this.state.content,
          userInfo: {
            name: this.props.profileState.name,
            email: this.props.profileState.email,
            uid: this.props.profileState.uid,
            photoURL: this.props.profileState.photoURL
          },
          sendTime: new Date()
        }
        // this.props.handleAddMessage(message);
        // this.setState({content: ""});
        // this.props.handleLoading(false);
        this.props.handleMessageWithFirestorm(message);
        this.setState({ content: "" });
    }
    else {
        alert('메시지를 입력해주세요!')
    }
  }


  render() {
    const { content } = this.state;
    const { profileState, loginState, messageState } = this.props;
    const { loggedIn } = loginState;
    const { messages, loading } = messageState;

    console.log("messageState",  messageState);

    return (
      <SafeAreaView style={SharedStyles.safeAreaView}>
        <View style={SharedStyles.whiteContainer}>
          {loggedIn ? (
            <View style={SharedStyles.container}>
              <MessageScreen 
                messages={messages}
                loading={loading}
              />

              <ContentInputBox 
                label="메시지 입력 : "
                placeholer="메시지를 입력해주세요.."
                value={content}
                autoFocus={true}
                autoCorrect={false}
                handleSubmit={this.handleSubmit}
                onChangeText={this.handleMessage.bind(this)}
                containerStyle={MessageStyles.contentInnerContainer}
                labelContainerStyle={MessageStyles.labelContainer}
                labelStyle={MessageStyles.labelStyle}
                inputContainerStyle={MessageStyles.innerTextInputContainer}
                textInputStyle={MessageStyles.contentTextInput}
              />

            </View>
          ) : (
            <LoginContainer logoutButton={true} loggedIn={loggedIn} />
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginState: state.loginState,
    profileState: state.profileState,
    messageState: state.messageState
  };
};

const mapDispatchToProps = dispatch => ({
  handleLoading: bindActionCreators(MessageCreators.loading, dispatch),
  handleAddMessage: bindActionCreators(MessageCreators.addMessage, dispatch),
  handleMessageWithFirestorm: bindActionCreators(MessageCreators.messageWithFirestorm, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageContainer);
