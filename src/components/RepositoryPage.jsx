import React from 'react';
import { useParams } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import Text from './Text';
import useSingleRepository from '../hooks/useSingleRepository';
import useRepositories from '../hooks/useRepositories';
import ReviewList from './ReviewList';

const RepositoryPage = () => {
  const { id } = useParams();
  const singleRepository = useSingleRepository(id);
  const allRepositories = useRepositories();

  if (singleRepository.loading || allRepositories.loading) return <Text>Loading repository...</Text>
  if (singleRepository.error || allRepositories.error) return <Text>Error in loading the repository</Text>

  if (!allRepositories
    || !allRepositories.data
    || !singleRepository
    || !singleRepository.data
  ) return null;

  const repositoryNodes = allRepositories.data.repositories.edges.map((edge) => edge.node)

  const item = repositoryNodes.find((item) => item.id === id)
  const url = singleRepository.data.repository ?
    singleRepository.data.repository.url :
    ""
  
  return (
    <>
      <RepositoryItem
        item={item}
        url={url}
      />
      <ReviewList reviews={singleRepository.data.repository.reviews} />
    </>
  ) 
};

export default RepositoryPage;