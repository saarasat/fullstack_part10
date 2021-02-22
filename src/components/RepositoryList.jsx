import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useDebounce } from 'use-debounce';

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
  },
  searchBar: {
    height: 50,
    backgroundColor: theme.colors.backgroundSecondary,
    margin: 10,
    paddingLeft: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;


export class RepositoryListContainer extends React.Component {

  renderHeader = () => {
    const props = this.props;
    
    return (
      <View>
        <TextInput
          style={styles.searchBar}
          onChangeText={(value) => props.setSearchWord(value)}
          placeholder="Search repositories"
        />
        <RNPickerSelect
          pickerProps={{
            style: styles.picker
          }}
          value={props.order}
          onValueChange={(value) => props.setOrder(value)}
          items={[
              { label: 'Latest repositories', value: 'latest' },
              { label: 'Highest rated repositories', value: 'highest' },
              { label: 'Lowest rated repositories', value: 'lowest' },
          ]}
        />
      </View>
    );
  };

  render() {
    const repositories = this.props.repositories
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

      return (
      <FlatList
        ListHeaderComponent={this.renderHeader}
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={({ id }) => id}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <RepositoryItem key={item.id} item={item} />  
        )}
      />
    );
  
  }
};

const RepositoryList = () => {
  const [order, setOrder] = useState('latest');
  const [searchWord, setSearchWord] = useState('');
  const [debouncedSearchWord] = useDebounce(searchWord, 500);
  const { allRepositories, fetchMore } = useRepositories({
    order,
    debouncedSearchWord
  });

  if (!allRepositories) return <Text>Loading</Text>;
  
  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      order={order}
      searchWord={searchWord}
      setOrder={setOrder}
      setSearchWord={setSearchWord}
      onEndReach={onEndReach}
      repositories={allRepositories}
    />
  );
};

export default RepositoryList;