import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    height: 60,
    backgroundColor: theme.colors.backgroundPrimary,
    padding: 15,
    borderColor: theme.colors.backgroundPrimary,
    fontFamily: theme.fonts.main
  }
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
  const [order, setOrder] = useState('latest')
  const { data, loading, error } = useRepositories(order);

  if (loading || !data) return <Text>Loading</Text>;
  if (error) return <Text>Error loading repositories</Text>;

  return (
    <>
      <RNPickerSelect
        pickerProps={{
          style: styles.picker
        }}
        value={order}
        onValueChange={(value) => setOrder(value)}
        items={[
            { label: 'Latest repositories', value: 'latest' },
            { label: 'Highest rated repositories', value: 'highest' },
            { label: 'Lowest rated repositories', value: 'lowest' },
        ]}
      />
      <RepositoryListContainer repositories={data.repositories} />
    </>
  );
};

export default RepositoryList;