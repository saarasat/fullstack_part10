import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

import Text from './Text';

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
});

const AppBarTab = ({ text, link }) => {
  return (
    <Link to={link}>
      <View style={styles.container}>
        <Text fontSize="subheading" color="textInverted">{text}</Text>
      </View>
    </ Link>
  );
};

export default AppBarTab;