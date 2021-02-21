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
import useSignUp from '../hooks/useSignUp';
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
  confirmPassword: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1)
    .max(30)
    .required('Username is required'),
  password: yup
    .string()
    .min(5)
    .max(50)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .max(30, 'Password must be at most 50 characters')
    .oneOf([yup.ref('password'), null], 'Passwords do not match!')
});

export const SignUpContainer = ({ onSubmit }) => {
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
            />
            <FormikTextInput
              secureTextEntry
              name="password"
              placeholder="Password"
              style={styles.textInput}
            />
            <FormikTextInput
              secureTextEntry
              name="confirmPassword"
              placeholder="Confirm password"
              style={styles.textInput}
            />
            <View style={styles.buttonContainer}>
              <Button
                onPress={handleSubmit}
                style={styles.button}
                title="Sign up"
                color={theme.colors.textSecondary}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const SignUp = () => {
  const history = useHistory();
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      await signIn({ username, password });
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;