import { useQuery } from '@apollo/react-hooks';

import { AUTHORIZED_USER } from '../graphql/queries';

const useAuthorizedUser = () => {
  const { data, loading, error } = useQuery(AUTHORIZED_USER);
  return { data, loading, error };
};

export default useAuthorizedUser;