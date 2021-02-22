import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query repositories(
    $orderBy: AllRepositoriesOrderBy,
    $orderDirection: OrderDirection,
    $searchKeyword: String,
    $first: Int,
    $after: String
  ) {
    repositories (
      searchKeyword: $searchKeyword
      orderBy: $orderBy,
      orderDirection: $orderDirection,
      first: $first,
      after: $after
    ){
      edges {
        node {
          id,
          fullName,
          description,
          forksCount,
          language,
          ownerAvatarUrl,
          ownerName,
          ratingAverage,
          reviewCount,
          stargazersCount,
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
`;

export const GET_SINGLE_REPOSITORY = gql`
  query repository(
    $id: ID!,
  ) {
    repository(id: $id) {
      id,
      fullName,
      description,
      forksCount,
      language,
      ownerAvatarUrl,
      ownerName,
      ratingAverage,
      reviewCount,
      stargazersCount,
      createdAt,
      url
    }
  }
`;

export const GET_REVIEWS = gql`
  query repository(
    $id: ID!,
    $first: Int,
    $after: String
  ) {
    repository(id: $id) {
      id,
      fullName,
      url,
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          totalCount
          hasNextPage      
        }
      }
    }
  }
`;

export const AUTHORIZED_USER = gql`
  query authorizedUser($includeReviews: Boolean = false) {
    authorizedUser {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            repository {
              fullName
            }
            repositoryId
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;
