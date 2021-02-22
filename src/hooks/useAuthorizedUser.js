import { useQuery } from '@apollo/react-hooks';

import { AUTHORIZED_USER } from '../graphql/queries';

const useAuthorizedUser = (includeReviews) => {

  const variables = {
    includeReviews: includeReviews || false
  }
  const { data, loading, error, refetch } = useQuery(AUTHORIZED_USER, { variables });
  return { data: data && data.authorizedUser, loading, error, refetch };
};

export default useAuthorizedUser;