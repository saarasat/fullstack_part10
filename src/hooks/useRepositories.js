import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const orders = {
  CREATED_AT: "CREATED_AT",
  RATING_AVERAGE: "RATING_AVERAGE",
};

const direction = {
  ASC: "ASC",
  DESC: "DESC"
};

const orderMap = {
  latest: { orderBy: orders.CREATED_AT, orderDirection: direction.ASC },
  lowest: { orderBy: orders.RATING_AVERAGE, orderDirection: direction.ASC },
  highest: { orderBy: orders.RATING_AVERAGE, orderDirection: direction.DESC },
};

const useRepositories = (order) => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy: orderMap[order].orderBy,
      orderDirection: orderMap[order].orderDirection, 
    },
    fetchPolicy: 'cache-and-network'
  });

  return { data, loading, error };
};

export default useRepositories;