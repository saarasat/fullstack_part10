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

const useRepositories = (order, searchKeyword) => {

  const variables = {
    orderBy: order ? orderMap[order].orderBy : orders.RATING_AVERAGE,
    orderDirection: order ? orderMap[order].orderDirection : orders.DESC,
    searchKeyword,
  }

  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables
  });

  return { data, loading, error };
};

export default useRepositories;