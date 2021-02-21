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
import useCreateReview from '../hooks/useCreateReview';
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
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .trim()
    .required('Owner of the repository is required'),
  repositoryName: yup
    .string()
    .trim()
    .required('Name of the repository is required'),
  rating: yup
    .number()
    .positive()
    .integer()
    .max(100)
    .required('Rating is required'),
  text: yup
    .string()
    .trim()
    .max(1500)
});

export const ReviewFormContainer = ({ onSubmit }) => {
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
              name="ownerName"
              placeholder="Repository owner username"
              style={styles.textInput}
            />
            <FormikTextInput
              name="repositoryName"
              placeholder="Name of the repository"
              style={styles.textInput}
            />
            <FormikTextInput
              name="rating"
              placeholder="Rating between 0 and 100"
              style={styles.textInput}
            />
            <FormikTextInput
              multiline
              name="text"
              placeholder="Write a review (optional)"
              style={styles.textInput}
            />
            <View style={styles.buttonContainer}>
              <Button
                onPress={handleSubmit}
                style={styles.button}
                title="Add review"
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

const ReviewForm = () => {
  const history = useHistory();
  const [createReview, result] = useCreateReview();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const repositoryId = await createReview({ ownerName, repositoryName, rating, text });
      history.push(`/repositories/${repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewForm;