import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
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
      }
    }
  }
`;

export const GET_SINGLE_REPOSITORY = gql`
  query repository($id: ID!) {
    repository(id: $id) {
      id
      url
    }
  }
`;

export const AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;