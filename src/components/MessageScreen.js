import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { SharedStyles, MessageStyles } from "../styles";
import LoadingIcon from "./LoadingIcon";
import ContentWithPhoto from "./ContentWithPhoto";

class MessageScreen extends Component {
  renderMessage = (messages, styleProps) => {
    return (
      messages.map((message, key) => {
        console.log("message", message);
        return (
          <View key={key} style={SharedStyles.container}>
            <ContentWithPhoto 
              content={message.content}
              name={message.userInfo.name}
              photoURL={message.userInfo.photoURL}
              styleProps={styleProps}
            />
          </View>
        );
      })
    );
  };
  render() {
    const { messages, loading } = this.props;
    let styleProps = {
      containerStyle: MessageStyles.contentWithPhotoContainer,
      photoContainerStyle: MessageStyles.imageContainer,
      photoStyle: MessageStyles.profileImage,
      textContainerStyle: MessageStyles.textContainer,
      nameTextContainerStyle: MessageStyles.nameTextContainer,
      nameTextStyle: MessageStyles.nameText,
      contentContainerStyle: MessageStyles.contentContainer,
      contentStyle: MessageStyles.content
    };
    return (
      <View style={SharedStyles.center}>
        <View style={MessageStyles.messageContainer}>
          {
            (loading === true) ? (
              <LoadingIcon />
            ) : (
              <ScrollView style={{flex: 1}}>
                {this.renderMessage(messages, styleProps)}
              </ScrollView>
            )
          }
        </View>
      </View>
    );
  }
}

MessageScreen.propTypes = {
  messages: PropTypes.array,
  loading: PropTypes.bool
};

export default MessageScreen;
