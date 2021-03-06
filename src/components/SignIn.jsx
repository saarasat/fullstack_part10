import React from 'react';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import {
  Button,
  StyleSheet,
  View
} from 'react-native';

import FormikTextInput from './FormikTextInput';
import useSignIn from '../hooks/useSignIn';
import theme from '../theme';

const styles = StyleSheet.create({
  form: {
    padding: 15,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  button: {
    backgroundColor: theme.colors.backgroundSecondary,
  },
  buttonContainer: {
    marginTop: 10,
  }
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1)
    .max(30)
    .required(),
  password: yup
    .string()
    .min(5)
    .max(50)
    .required(),
});

export const SignInContainer = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <>
            <FormikTextInput
              name="username"
              placeholder="Username"
              style={styles.textInput}
              testID="username"
            />
            <FormikTextInput
              secureTextEntry
              name="password"
              placeholder="Password"
              style={styles.textInput}
              testID="password"
            />
            <View style={styles.buttonContainer}>
              <Button
                onPress={handleSubmit}
                style={styles.button}
                title="Sign in"
                color={theme.colors.textSecondary}
                testID="submitButton"
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const SignIn = () => {
  const history = useHistory();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;