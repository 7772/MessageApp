import React, { Component } from "react";
import { Alert } from "react-native";
import PropTypes from "prop-types";
import Login from "../components/Login";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as LoginCreators from "../redux/modules/login";

class LoginContainer extends Component {
  handleLogin = loginType => {
    this.props.handleLogin(loginType);
  };

  handleLogout = () => {
    this.props.handleLogout();
  };

  render() {
    const { loginState, logoutButton } = this.props;
    const { loading, loggedIn } = loginState;
    return (
      <Login
        logoutButton={logoutButton}
        loggedIn={loggedIn}
        loading={loading}
        handleFBlogin={() => this.handleLogin("facebook")}
        handleLogout={() => this.handleLogout()}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    loginState: state.loginState
  };
};

LoginContainer.propTypes = {
  loginState: PropTypes.object,
  profileState: PropTypes.object,
  logoutButton: PropTypes.bool
};

Login.defaultProps = {
  logoutButton: false
};

const mapDispatchToProps = dispatch => ({
  handleLogin: bindActionCreators(LoginCreators.login, dispatch),
  handleLogout: bindActionCreators(LoginCreators.logout, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
