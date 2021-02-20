import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: theme.colors.tertiary,
    borderRadius: 2,
    padding: 10,
    marginTop: 10,
  },
  error: {
    borderColor: theme.colors.error,
    color: theme.colors.error,
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    styles.textInput,
    style,
    error && styles.error
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;