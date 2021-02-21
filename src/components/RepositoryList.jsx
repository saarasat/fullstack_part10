import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <RepositoryItem key={item.id} item={item} />  
      )}
    />
  );
};

const RepositoryList = () => {
  const { data, loading, error } = useRepositories();

  if (loading || !data) return <Text>Loading</Text>;
  if (error) return <Text>Error loading repositories</Text>;

  return <RepositoryListContainer repositories={data.repositories} />;
};

export default RepositoryList;