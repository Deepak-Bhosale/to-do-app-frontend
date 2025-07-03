import {
  ApolloClient, InMemoryCache, split, HttpLink,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import config from '../config/config';
import { constants } from '../config/constant';

const httpLink = new HttpLink({
  uri: config.graphql_uri,
  headers: {
    authorization: localStorage.getItem(constants.accessToken),
  },
});

const wsLink = new WebSocketLink(
  {
    uri: config.graphql_subscription_uri,
  },
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

export default client;
