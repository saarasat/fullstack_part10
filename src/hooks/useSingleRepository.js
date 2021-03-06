import { useQuery } from '@apollo/react-hooks';

import { GET_SINGLE_REPOSITORY } from '../graphql/queries';

const useSingleRepository = (id) => {
  const { data, loading, error } = useQuery(GET_SINGLE_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id }
  });
  return { singleRepository: data && data.repository, loading, error };
};

export default useSingleRepository;