import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($input: login) {
    login(input: $input) {
      data {
        token
        user {
          originalId
          createdAt
          deletedAt
          firstName
          lastName
          email
          password
          role
        }
      }
      message
      status
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($input: UsersData) {
    registerUser(input: $input) {
      message
      data {
        firstName
        lastName
        email
        role
        password
      }
      status
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUserData($input: deleteUser) {
    deleteUser(input: $input) {
      data {
        originalId
        createdAt
        deletedAt
        firstName
        lastName
        email
        password
        role
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUserData($input: UsersData) {
    updateUserData(input: $input) {
      data {
        originalId
        createdAt
        deletedAt
        firstName
        lastName
        email
        password
        role
      }
    }
  }
`;

export const ADD_LIST = gql`
  mutation AddList($title: String!) {
    addList(title: $title) {
      data {
        _id
        deletedAt
        originalId
        title
        userId
        createdAt
        updatedAt
        cards {
          _id
          listId
          title
          originalId
          description
          createdAt
          updatedAt
          deletedAt
        }
      }
      message
      status
    }
  }
`;

export const UPDATE_LIST = gql`
  mutation UpdateList($id: ID!, $title: String!) {
    updateList(id: $id, title: $title) {
      message
      status
      data {
        _id
        deletedAt
        originalId
        title
        userId
        createdAt
        updatedAt
        cards {
          _id
          listId
          title
          originalId
          description
          createdAt
          updatedAt
          deletedAt
        }
      }
    }
  }
`;

export const DELETE_LIST = gql`
  mutation DeleteList($id: ID!) {
    deleteList(id: $id) {
      message
      status
      data {
        _id
        deletedAt
        originalId
        title
        userId
        createdAt
        updatedAt
        cards {
          _id
          listId
          title
          originalId
          description
          createdAt
          updatedAt
          deletedAt
        }
      }
    }
  }
`;

export const ADD_CARD = gql`
  mutation AddCard($listId: ID!, $title: String!, $description: String) {
    addCard(listId: $listId, title: $title, description: $description) {
      message
      status
      data {
        _id
        listId
        title
        originalId
        description
        createdAt
        updatedAt
        deletedAt
      }
    }
  }
`;

export const UPDATE_CARD = gql`
  mutation UpdateCard(
    $id: ID!
    $listId: ID
    $title: String
    $description: String
  ) {
    updateCard(
      id: $id
      listId: $listId
      title: $title
      description: $description
    ) {
      message
      status
      data {
        _id
        listId
        title
        originalId
        description
        createdAt
        updatedAt
        deletedAt
      }
    }
  }
`;

export const DELETE_CARD = gql`
  mutation DeleteCard($id: ID!) {
    deleteCard(id: $id) {
      message
      status
      data {
        _id
        listId
        title
        originalId
        description
        createdAt
        updatedAt
        deletedAt
      }
    }
  }
`;
