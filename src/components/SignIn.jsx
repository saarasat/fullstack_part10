import React from 'react';
import { Formik } from 'formik';
import {
  Button,
  StyleSheet,
  View
} from 'react-native';

import FormikTextInput from './FormikTextInput';
import theme from '../theme';

const styles = StyleSheet.create({
  form: {
    padding: 15,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  textInput: {
    borderWidth: 1,
    borderColor: theme.colors.textTertiary,
    borderRadius: 2,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: theme.colors.backgroundSecondary,
  }
})


const initialValues = {
  username: '',
  password: '',
}

const SignIn = () => {

  const onSubmit = (values) => {
    console.log(values)
  };

  return (
    <View style={styles.form}>
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
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
          <Button
            onPress={handleSubmit}
            style={styles.button}
            title="Sign in"
            color={theme.colors.textSecondary}
          >
            Sign in
          </Button>
        </>
      )}
    </Formik>

    </View>
  )
};

export default SignIn;