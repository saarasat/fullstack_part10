import React from 'react';
import { useParams } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import useSingleRepository from '../hooks/useSingleRepository';
import useReviews from '../hooks/useReviews';
import ReviewList from './ReviewList';

const RepositoryPage = () => {
  const { id } = useParams();
  const { singleRepository } = useSingleRepository(id);
  const { reviews, fetchMore } = useReviews(id);
  
  if (!singleRepository) return null;

  const url = singleRepository.url ? singleRepository.url : "";
  const reviewEdges = (reviews && reviews.edges)
  ? reviews.edges
  : [];

  const onEndReach = () => {
    fetchMore();
    console.log("at the end")
  };

  return (
    <>
      <RepositoryItem
        item={singleRepository}
        url={url}
      />
      <ReviewList
        reviews={reviewEdges}
        onEndReach={onEndReach}
      />
    </>
  );
};

export default RepositoryPage;