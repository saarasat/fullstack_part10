import React from 'react';
import {
  FlatList,
  View,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import theme from '../theme';

import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  rating: {
    height: 45,
    width: 45,
    borderWidth: 2,
    borderColor: theme.colors.secondary,
    borderRadius: 45 / 2,
    paddingTop: 12,
    alignItems: "center",
    marginRight: 10,
  },
  item: {
    padding: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: theme.colors.backgroundSecondary,
  },
  content: {
    flexDirection: "column",
    flexWrap: "wrap",
    flexShrink: 1,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  const {
    text,
    rating,
    createdAt,
    user
  } = review.node;

  return (
    <View style={styles.item}>
      <View style={styles.rating}>
        <Text fontWeight="bold" color="textSecondary">
          {rating}
        </Text>
      </View>
      <View style={styles.content}>
        <Text padded fontWeight="bold" >
          {user.username}
        </Text>
        <Text color="textTertiary">
          {moment(createdAt).format('DD.MM.YYYY')}
        </Text>
        <Text>
          {text}
        </Text>
      </View>      
    </View>
  );
};

const ReviewList = ({ reviews, onEndReach }) => {
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
        />}
        keyExtractor={({ node }) => node.id}
      />
    </View>
  );
};

export default ReviewList;