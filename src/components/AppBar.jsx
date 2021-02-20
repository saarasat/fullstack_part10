import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.primary,
    height: 60,
    display: "flex",
    flexDirection: "row",
    alignContent: "flex-start"
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" link="/"/>
        <AppBarTab text="SignIn" link="/login"/>
      </ScrollView>
    </View>
  );
};

export default AppBar;