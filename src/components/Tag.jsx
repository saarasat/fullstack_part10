import React from 'react';
import { StyleSheet, View } from 'react-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  tag: {
    borderRadius: 3,
    height: 26,
    padding: 5,
    marginTop: 3,
    marginBottom: 5,
    marginLeft: 0,
    marginRight: "auto",  
  },
  colorSecondary: {
    backgroundColor: theme.colors.textSecondary,
  },
  colorPrimary: {
    backgroundColor: theme.colors.textPrimary,
  },
});

const Tag = ({ color, style, ...props }) => {

  const tagStyle = [
    style,
    styles.tag,
    !color && styles.colorPrimary,
    color === 'primary' && styles.colorPrimary,
    color === 'secondary' && styles.colorSecondary
  ];

  return (
    <View style={tagStyle}>
      <Text color="textInverted" {...props} />
    </View>
  );
};

export default Tag;