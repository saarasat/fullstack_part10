import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';
import useAuthorizedUser from '../hooks/useAuthorizedUser';

import AppBarTab from './AppBarTab';
import Text from './Text';

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

  const { data, loading, error } =  useAuthorizedUser();

  if (loading) return null;
  if (error) return <Text>Error, try again later!</Text>;

  const authorizedUser = (data && data.authorizedUser) ? data.authorizedUser : null; 

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" link="/"/>
        {authorizedUser 
          ? <>
              <AppBarTab text="Create review" link="/review"/>
              <AppBarTab text="Sign out" link="/logout"/>
            </>
          : <AppBarTab text="Sign in" link="/login"/>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;