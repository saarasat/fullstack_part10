import React from 'react';
import {
  View,
  Button,
  Alert,
  StyleSheet
} from 'react-native';
import { useHistory } from 'react-router-native';
import moment from 'moment';
import theme from '../theme';

import Text from './Text';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
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
  },
  actionButtons: {
    padding: 15,
    backgroundColor: theme.colors.backgroundSecondary,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});


const ReviewItem = ({ review, reviewActions, refetch }) => {
  const history = useHistory();
  const [deleteReview] = useDeleteReview();
  const {
    id,
    text,
    rating,
    createdAt,
    user,
    repositoryId
  } = review.node;

  const onViewRepository = (repositoryId) => {
    history.push(`/repositories/${repositoryId}`);
  };

  const onDeleteReview = (id) => {
    return (
      Alert.alert(
        "Delete review",
        "Are you sure you want to delete the review?",
        [
          {
            text: "Cancel",
          },
          {
            text: "DELETE",
            onPress: () => {
              console.log(id)
              deleteReview(id);
              refetch();        
            }
          }
        ]
      )
    )
  };

  return (
    <View >
      <View style={styles.item} >
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
      {reviewActions &&
        <View style={styles.actionButtons}>
          <Button
            title="View repository"
            onPress={() => onViewRepository(repositoryId)}
            color={theme.colors.secondary}
          />
          <Button
            title="Delete review"
            onPress={() => onDeleteReview(id)}
            color={theme.colors.error}
          />
        </View>
      }
    </View>
  );
};

export default ReviewItem;