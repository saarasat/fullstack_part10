import { useQuery } from '@apollo/react-hooks';

import { GET_REVIEWS } from '../graphql/queries';

const useReviews = (id) => {

  const variables = {
    id,
    first: 4
  }

  const { data, loading, fetchMore, ...result } = useQuery(GET_REVIEWS, {
    fetchPolicy: 'cache-and-network',
    variables
  });

  const handleFetchMore = () => {
    
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REVIEWS,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...fetchMoreResult.repository,
            edges: [
              ...previousResult.repository.reviews.edges,
              ...fetchMoreResult.repository.reviews.edges,
            ],
          },
        };
        return nextResult;
      },
    });
  };

  return {
    fetchMore: handleFetchMore,
    reviews: data && data.repository.reviews,
    loading,
    ...result
  };
};

export default useReviews;