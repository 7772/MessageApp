import React, { Component } from "react";
import { View, Text, Image, Alert } from "react-native";
import PropTypes from "prop-types";
import { SharedStyles, ProfileStyles } from "../styles";
import LodingIcon from "./LoadingIcon";
import ContentWithPhoto from "./ContentWithPhoto";

class ProfileScreen extends Component {
  componentWillMount() {
    setTimeout(() => {
      this.props.handleShowProfile();
    }, this.props.delayForProfile);
  }

  render() {
    const {
      name,
      photoURL,
      isShowProfile
    } = this.props.profile;
    let styleProps = {
      containerStyle: ProfileStyles.profileContainer,
      photoContainerStyle: ProfileStyles.imageContainer,
      photoStyle: ProfileStyles.profileImage,
      textContainerStyle: ProfileStyles.textContainer,
      nameTextContainerStyle: ProfileStyles.nameTextContainer,
      nameTextStyle: ProfileStyles.nameText,
      contentContainerStyle: ProfileStyles.contentContainer,
      contentStyle: ProfileStyles.content
    };
    return (
      <View style={SharedStyles.container}>
        {isShowProfile ? (
          <ContentWithPhoto 
            content={"반가워요 !"}
            name={name}
            photoURL={photoURL}
            styleProps={styleProps}
          />
        ) : (
          <LodingIcon size="small" />
        )}
      </View>
    );
  }
}

ProfileScreen.propTypes = {
  profile: PropTypes.object,
  profileURL: PropTypes.string,
  delayForProfile: PropTypes.number,
  handleShowProfile: PropTypes.func
};

export default ProfileScreen;
