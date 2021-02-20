import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextPrimary: {
    color: theme.colors.textPrimary,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorTextTertiary: {
    color: theme.colors.textTertiary,
  },
  colorTextInverted: {
    color: theme.colors.backgroundPrimary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  padded: {
    lineHeight: 25,
  }
});

const Text = ({ color, fontSize, fontWeight, padded, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textPrimary' && styles.colorTextPrimary,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'textTertiary' && styles.colorTextTertiary,
    color === 'textInverted' && styles.colorTextInverted,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    padded && styles.padded,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;