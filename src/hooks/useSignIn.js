import { useMutation } from '@apollo/react-hooks';
import { AUTHORIZE } from '../graphql/mutations';
import AuthStorage from '../utils/authStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE);

  const signIn = async ({ username, password }) => {
    const response = await mutate({ variables: { username, password }});
    const authStorage = new AuthStorage();

    if (response && response.data) {
      await authStorage.setAccessToken(response.data);
    }
    return response
  };

  return [signIn, result];
};

export default useSignIn;