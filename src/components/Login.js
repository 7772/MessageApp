import React, { Component } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import PropTypes from "prop-types";
import { SharedStyles, LoginStyles } from "../styles";
import LoadingIcon from "../components/LoadingIcon";

class Login extends Component {
  render() {
    const {
      loading,
      logoutButton,
      loggedIn,
      handleFBlogin,
      handleLogout
    } = this.props;
    return (
      <View style={LoginStyles.containerStyle}>
        {logoutButton && loggedIn ? (
          <View style={SharedStyles.logoutButtonContainer}>
            <TouchableOpacity
              onPress={handleLogout}
              style={LoginStyles.logoutButton}
            >
              <Text style={LoginStyles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            {loading ? (
              <LoadingIcon
                containerStyle={LoginStyles.loadingIconStyle}
                animaiting
                size="large"
              />
            ) : (
              <TouchableOpacity
                onPress={handleFBlogin}
                style={LoginStyles.facebookLoginButton}
              >
                <Text style={LoginStyles.facebookLoginButtonText}>
                  페이스북으로 로그인하기
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  }
}

Login.propTypes = {
  loading: PropTypes.bool,
  loggedIn: PropTypes.bool,
  handleFBlogin: PropTypes.func,
  handleLogout: PropTypes.func,
  logoutButton: PropTypes.bool
};

Login.defaultProps = {
  loading: false,
  loggedIn: PropTypes.bool,
  handleFBlogin: () => null,
  handleLogout: () => null,
  logoutButton: false
};

export default Login;
