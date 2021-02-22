import React from 'react';

import ReviewList from './ReviewList';
import useAuthorizedUser from '../hooks/useAuthorizedUser';

const MyReviews = () => {

  const includeReviews = true
  const { data, loading, error, refetch } =  useAuthorizedUser(includeReviews);

  if (loading) return null;
  if (error) return <Text>Error, try again later!</Text>;

  const reviewEdges = (data && data.reviews && data.reviews.edges) 
    ? data.reviews.edges 
    : []; 

  return (
    <>
      <ReviewList
        reviews={reviewEdges}
        reviewActions={true}
        refetch={refetch}
      />
    </>
  );
};

export default MyReviews;