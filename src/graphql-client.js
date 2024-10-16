import { ApolloClient, InMemoryCache } from '@apollo/client/core/index.js';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions/index.js';
import { createClient } from 'graphql-ws';
import WebSocket from 'ws';

// Workaround for a "feature" in apollo-client: https://github.com/apollographql/apollo-client/issues/11761
if (typeof globalThis.WebSocket === 'undefined') {
  Object.defineProperty(globalThis, 'WebSocket', {
    value: WebSocket,
    enumerable: false,
    configurable: true,
    writable: true,
  });
}

const createWsLink = (subscriptionUrl, bearerToken) => new GraphQLWsLink(createClient({
  url: subscriptionUrl,
  connectionParams: {
    Authorization: `Bearer ${bearerToken}`,
  },
  webSocketImpl: WebSocket,
  // Use custom retry logic in `SubscriptionManager` instead.
  shouldRetry: () => false,
  on: {
    connecting: () => console.log('WebSocket: connecting'),
    opened: () => console.log('WebSocket: opened'),
    connected: () => console.log('WebSocket: connected'),
    closed: () => console.log('WebSocket: closed'),
    error: () => console.log('WebSocket: error'),
  },
}));

export const createGraphqlClient = (subscriptionUrl, bearerToken) => new ApolloClient({
  cache: new InMemoryCache(),
  link: createWsLink(subscriptionUrl, bearerToken),
});
