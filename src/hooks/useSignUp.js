import { useMutation } from '@apollo/react-hooks';

import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {
    const response = await mutate({ variables: { username, password }});

    if (response && response.data) {
      return response.data.createUser.username;
    }

    return response;
  };

  return [signUp, result];
};

export default useSignUp;