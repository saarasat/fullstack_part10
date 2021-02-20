import { gql } from 'apollo-boost';

export const AUTHORIZE = gql`
  mutation {
    authorize(credentials: { username: "kalle", password: "password" }) {
      accessToken
    }
  }
`;

export const CREATE_USER = gql`
  mutation {
    createUser(user: { username: "myusername", password: "mypassword" }) {
      id
      username
    }
  }
`