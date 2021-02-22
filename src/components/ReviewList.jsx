import React from 'react';
import {
  FlatList,
  View,
  StyleSheet,
} from 'react-native';

import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewList = ({
  reviews,
  onEndReach,
  reviewActions,
  refetch
}) => {
  return (
    <View style={styles.container}>
      <ItemSeparator />
      <FlatList
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}    
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem
          key={item.id}
          review={item}
          reviewActions={reviewActions}
          refetch={refetch}
        />}
        keyExtractor={({ node }) => node.id}
      />
    </View>
  );
};

export default ReviewList;