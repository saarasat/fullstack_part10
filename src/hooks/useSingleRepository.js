import { useQuery } from '@apollo/react-hooks';

import { GET_SINGLE_REPOSITORY } from '../graphql/queries';

const useSingleRepository = (id) => {
  const { data, loading, error } = useQuery(GET_SINGLE_REPOSITORY, { variables: { id: id }});
  return { data, loading, error };
};

export default useSingleRepository;