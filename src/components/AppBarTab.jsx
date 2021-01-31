import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from './Text';

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
});

const AppBarTab = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text fontSize="subheading" color="inverted">{text}</Text>
    </View>
  );
};

export default AppBarTab;