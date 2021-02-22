import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.primary,
    display: "flex",
    flexDirection: "row",
    alignContent: "flex-start",
  },
});

const AppBar = ({ authorizedUser }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" link="/"/>
        {authorizedUser 
          ? <>
              <AppBarTab text="Create review" link="/review"/>
              <AppBarTab text="My reviews" link="/my-reviews"/>
              <AppBarTab text="Sign out" link="/logout"/>
            </>
          : <>
              <AppBarTab text="Sign in" link="/login"/>
              <AppBarTab text="Sign up" link="/signup"/>
            </>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;