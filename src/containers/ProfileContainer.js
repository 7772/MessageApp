import React, { Component } from "react";
import { View, Text, Alert, Image } from "react-native";
import PropTypes from "prop-types";
import { SafeAreaView } from "react-navigation";
import { SharedStyles, ProfileStyles } from "../styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProfileScreen from "../components/ProfileScreen";
import LoginContainer from "./LoginContainer";
import * as ProfileCreators from "../redux/modules/profile";

class ProfileContainer extends Component {
  _showProfile = () => {
    this.props.handleShowProfile(true);
  };

  render() {
    const { profileState, loginState } = this.props;
    const { loggedIn } = loginState;
    return (
      <SafeAreaView style={SharedStyles.safeAreaView}>
        <View style={SharedStyles.whiteContainer}>
          {loggedIn ? (
            <View style={SharedStyles.container}>
              <ProfileScreen
                delayForProfile={500}
                handleShowProfile={this._showProfile}
                profile={profileState}
              />
              <LoginContainer logoutButton={true} loggedIn={true} />
            </View>
          ) : (
            <LoginContainer logoutButton={false} loggedIn={loggedIn} />
            // 로그아웃 버튼 사용 방식
            // <LoginContainer logoutButton={true} loggedIn={true} />
          )}
        </View>
      </SafeAreaView>
    );
  }
}

ProfileContainer.propTypes = {
  loginState: PropTypes.object,
  profileState: PropTypes.object
};

const mapStateToProps = state => {
  return {
    loginState: state.loginState,
    profileState: state.profileState
  };
};

const mapDispatchToProps = dispatch => ({
  handleShowProfile: bindActionCreators(ProfileCreators.showProfile, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
