import { gql } from 'apollo-boost';

export const AUTHORIZE = gql`
  mutation authorize(
    $username: String!,
    $password: String!,
  ) {
    authorize(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser(
    $username: String!,
    $password: String!,
  ){
    createUser(user: { username: $username, password: $password }) {
      id
      username
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview(
    $ownerName: String!,
    $repositoryName: String!,
    $rating: Int!,
    $text: String,      
  ){
    createReview(
      review: {
        ownerName: $ownerName,
        repositoryName: $repositoryName,
        rating: $rating,
        text: $text,
      }
    ) {
      repositoryId
    }
  }
`;