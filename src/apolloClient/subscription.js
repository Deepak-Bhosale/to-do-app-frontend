import { gql } from '@apollo/client';

const UPDATE_USER_DATA_SUBSCRIPTION = gql`
  subscription UserUpdated {
    userUpdated {
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
`;

const ADD_FEEDBACK_SUBSCRIPTION = gql`subscription Subscription {
  feedbackAdded {
    week
    createdAt
    originalId
    givenFor
    givenBy
    rating {
      question
      answer
    }
    goodPoints
    improvementRequired
    description
  }
}`;

const ADD_USER_DATA_SUBSCRIPTION = gql`
  subscription UserAdded {
    userAdded {
      originalId
      name
      email
      contactNo
      department
      location
      empId
    }
  }
`;

export {
  UPDATE_USER_DATA_SUBSCRIPTION,
  ADD_USER_DATA_SUBSCRIPTION,
  ADD_FEEDBACK_SUBSCRIPTION,
};
