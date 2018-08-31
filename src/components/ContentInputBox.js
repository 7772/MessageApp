import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, TextInput, Button, } from 'react-native';

class ContentInputBox extends React.Component {

    render() {
 
        const { 
            label, 
            placeholer, 
            value,
            autoFocus,
            autoCorrect,
            onChangeText,
            handleSubmit,
            containerStyle, 
            labelContainerStyle, 
            labelStyle, 
            inputContainerStyle, 
            textInputStyle 
        } = this.props;
        
        return (
            <View style={containerStyle}>
                <View style={labelContainerStyle}>
                    <Text style={labelStyle}>{label}</Text>
                </View>
                <View style={inputContainerStyle}>
                    <TextInput 
                        autoFocus={autoFocus}
                        autoCorrect={autoCorrect}
                        placeholer={placeholer}
                        value={value}
                        onSubmitEditing={handleSubmit}
                        onChangeText={onChangeText}
                        style={textInputStyle}
                    />
                </View>
                <View>
                    <Button 
                        title="전송"
                        onPress={handleSubmit}
                    />
                </View>
            </View>
        );
    }

}

ContentInputBox.propTypes = {
    label: PropTypes.string, 
    placeholer: PropTypes.string, 
    value: PropTypes.string, 
    autoFocus: PropTypes.bool, 
    autoCorrect: PropTypes.bool,
    onChangeText: PropTypes.func,
    handleSubmit: PropTypes.func,
    containerStyle: PropTypes.object,
    labelContainerStyle: PropTypes.object,
    labelStyle: PropTypes.object,
    inputContainerStyle: PropTypes.object,
    textInputStyle: PropTypes.object, 
};

export default ContentInputBox;