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

// other queries...