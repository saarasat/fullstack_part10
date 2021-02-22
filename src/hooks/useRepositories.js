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

const useRepositories = ({ order, searchKeyword }) => {

  const variables = {
    orderBy: order ? orderMap[order].orderBy : orders.RATING_AVERAGE,
    orderDirection: order ? orderMap[order].orderDirection : orders.DESC,
    searchKeyword,
    first: 4
  }

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORIES,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables
  });

  return {
    fetchMore: handleFetchMore,
    allRepositories: data && data.repositories,
    loading,
    ...result
  };
};

export default useRepositories;