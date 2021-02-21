import React, { useEffect, useContext } from 'react';
import { useApolloClient } from '@apollo/client';
import { useHistory } from 'react-router-native';
import AuthStorageContext from '../contexts/AuthStorageContext';

const SignOut = () => {
  const history = useHistory();
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);

  const onSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push("/");
  };

  useEffect(() => {
    onSignOut();
  },[]);
  
  return <></>;
};

export default SignOut;
