import React, { Component } from 'react';
import { View, Text } from 'react-native';
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
        alert("notificationListener");
    });
}

componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
}

  handleMessage(content) {
    // if (content === '') {
    //     this.setState({
    //       content: '',
    //       error: tr
    //     });
    //     this.props.handleClearNews();
    // } 
    // else {
    //     this.setState({content: content});
    // }
    this.setState({content: content});
  }

  handleSubmit = () => {
    console.log("handleSubmit");
    firebase.messaging().hasPermission()
      .then(enabled => {
        if (enabled) {
          // user has permissions
          console.log("enabled");
        } else {
          // user doesn't have permission
          console.log("don't enabled");
        } 
      });


    if (this.state.content !== '') {
        this.props.handleLoading(true);

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

        this.props.handleAddMessage(message);
        this.setState({content: ""});
        this.props.handleLoading(false);
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageContainer);
