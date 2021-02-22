import React from 'react';
import {
  Button,
  Image,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { useHistory } from 'react-router-native';
import * as Linking from 'expo-linking';
import theme from '../theme';

import Tag from './Tag';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  basicInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  header: {
    flexDirection: "column",
    flexWrap: "wrap",
    flexShrink: 1,
  },
  avatar: {
    marginRight: 15,
    height: 50,
    width: 50,
    borderRadius: 3,
  },
  tagContainer: {
    display: "flex",
    flexDirection: "row"
  },
  stats: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  stat: {
    alignItems: "center",
    margin: 10,
    flex: 1,
  }

});

const RepositoryItem = ({ item, url }) => {
  const history = useHistory();

  if (!item) return null;

  const {
    id,
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
  } = item;

  
  const onItemPress = (id) => {
    history.push(`/repositories/${id}`);
  };

  const onButtonPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity onPress={() => onItemPress(id)}>
      <View style={styles.container} testID="repository">
        <View style={styles.basicInfo}>
          <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar}/>
          <View style={styles.header}>
            <Text
              padded
              fontWeight="bold"
              testID="fullName"
            >
              {fullName}
            </Text>
            <Text
              padded
              color="textTertiary"
              testID="description"
            >
              {description}
            </Text>
            <View style={styles.tagContainer}>
              <Tag
                color="secondary"
                testID="language"
              >
                {language}
              </Tag>
            </View>
          </View>
        </View>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text
              padded
              fontWeight="bold"
              testID="stargazersCount"
            >
              {stargazersCount}
            </Text>
            <Text color="textTertiary">Stars</Text>
          </View>
          <View style={styles.stat}>
            <Text
              padded
              fontWeight="bold"
              testID="forksCount"
            >
              {forksCount}
            </Text>
            <Text color="textTertiary">Forks</Text>
          </View>
          <View style={styles.stat}>
            <Text
              padded
              fontWeight="bold"
              testID="reviewCount"
            >
              {reviewCount}
            </Text>
            <Text color="textTertiary">Reviews</Text>
          </View>
          <View style={styles.stat}>
            <Text
              padded
              fontWeight="bold"
              testID="ratingAverage"
            >
              {ratingAverage}
            </Text>
            <Text color="textTertiary">Ratings</Text>
          </View>
        </View>
        {url &&
          <Button
            onPress={() => onButtonPress(url)}
            title="Open in GitHub"
          />
        }
      </View>
    </TouchableOpacity>
  );
};

export default RepositoryItem;