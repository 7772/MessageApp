import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import PropTypes from "prop-types";

const ContentWithPhoto = ({
  content, name, photoURL,
  styleProps
}) => {
  return (
    <View style={styleProps.containerStyle}>
      <View style={styleProps.photoContainerStyle}>
        <Image
          source={{
            uri: photoURL
          }}
          style={styleProps.photoStyle}
        />
      </View>
      <View style={styleProps.textContainerStyle}>
        <View style={styleProps.nameTextContainerStyle}>
          <Text style={styleProps.nameTextStyle}>{name} 님,</Text>
        </View>
        <View style={styleProps.contentContainerStyle}>
          <Text style={styleProps.contentStyle}>{content}</Text>
        </View>
      </View>
    </View>
  );
};

ContentWithPhoto.propTypes = {
  content: PropTypes.string,
  name: PropTypes.string,
  photoURL: PropTypes.string,
  styleProps: PropTypes.object
};

export default ContentWithPhoto;
