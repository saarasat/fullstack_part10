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

  state = {
    searchWord: ''
  }

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
  const { data, loading, error } = useRepositories(order, debouncedSearchWord);

  if (loading || !data) return <Text>Loading</Text>;
  if (error) return <Text>Error loading repositories</Text>;

  return (
    <RepositoryListContainer
      order={order}
      searchWord={searchWord}
      setOrder={setOrder}
      setSearchWord={setSearchWord}
      repositories={data.repositories}
    />
  );
};

export default RepositoryList;