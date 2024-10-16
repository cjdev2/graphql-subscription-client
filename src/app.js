import 'dotenv/config';

import { createGraphqlClient } from "./graphql-client.js";
import * as GraphqlQuery from './graphql-query.js';
import { Storage } from './Storage.js';
import { StreamObserver } from './StreamObserver.js';
import { SubscriptionConnector } from './SubscriptionConnector.js';
import { SubscriptionManager } from './SubscriptionManager.js';

const bearerToken = process.env.BEARER_TOKEN;
const partnershipId = process.env.PARTNERSHIP_ID;
const subscriptionUrl = process.env.SUBSCRIPTION_URL;

const subscriptions = {
  conversions: {
    graphqlQuery: GraphqlQuery.conversionsSubscription,
    getTimestamp: (resultData) => resultData.conversions.lastUpdated,
  },
  paymentStatusEvents: {
    graphqlQuery: GraphqlQuery.paymentStatusEventsSubscription,
    getTimestamp: (resultData) => resultData.paymentStatusEvents.eventTime,
  },
};

const userArg = process.argv[2];
const subscription = subscriptions[userArg];

const storage = new Storage();
const graphqlClient = createGraphqlClient(subscriptionUrl, bearerToken);
const subscriptionConnector = new SubscriptionConnector(graphqlClient, storage, subscription.graphqlQuery, partnershipId);
const streamObserver = new StreamObserver(storage, subscription.getTimestamp);
const subscriptionManager = new SubscriptionManager();

subscriptionManager.runSubscription(subscriptionConnector, streamObserver);
