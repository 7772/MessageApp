/**
 * components/LoadingIcon.js
 *
 * 앱에서 Loading 이 필요할 때 사용합니다.
 */

import React from "react";
import PropTypes from "prop-types";

import { View, ActivityIndicator } from "react-native";

const LoadingIcon = (size, containerStyle, animating) => {
  return (
    <View style={containerStyle}>
      <ActivityIndicator animating={animating} size={size} />
    </View>
  );
};

LoadingIcon.propTypes = {
  size: PropTypes.string,
  containerStyle: PropTypes.object,
  animating: PropTypes.bool
};

LoadingIcon.defaultProps = {
  size: "small",
  containerStyle: {
    paddingVertical: 20,
    borderColor: "#CED0CE" // lightGray
  },
  animating: true
};

export default LoadingIcon;
