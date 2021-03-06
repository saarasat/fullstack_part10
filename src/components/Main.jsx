import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import theme from '../theme';
import SignIn from './SignIn';
import SignOut from './SignOut';
import SignUp from './SignUp';
import RepositoryPage from './RepositoryPage';
import ReviewForm from './ReviewForm';
import MyReviews from './MyReviews';
import useAuthorizedUser from '../hooks/useAuthorizedUser';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundPrimary,
  },
});

const Main = () => {
  const { data, loading, error } =  useAuthorizedUser();

  if (loading) return null;
  if (error) return <Text>Error, try again later!</Text>;

  const authorizedUser = data || undefined; 

  return (
    <View style={styles.container}>
      <AppBar authorizedUser={authorizedUser} />
      <Switch>
        <Route path="/" exact component={RepositoryList} />
        <Route path="/login" exact component={SignIn} />
        <Route path="/logout" exact component={SignOut} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/my-reviews" exact component={MyReviews} />
        <Route path="/review" exact component={ReviewForm} />
        <Route path="/repositories/:id" exact component={RepositoryPage} />
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;