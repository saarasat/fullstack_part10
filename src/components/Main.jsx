import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import theme from '../theme';
import SignIn from './SignIn';
import SignOut from './SignOut';
import RepositoryPage from './RepositoryPage';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundPrimary,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route
          path="/:id"
          exact
        >
          <RepositoryPage />
        </Route>
        <Route path="/login" exact>
          <SignIn />
        </Route>
        <Route path="/logout" exact>
          <SignOut />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;