export class SubscriptionConnector {
  constructor(client, storage, graphqlQuery, partnershipId) {
    this.client = client;
    this.storage = storage;
    this.graphqlQuery = graphqlQuery;
    this.partnershipId = partnershipId;
  };

  subscribe = () => {
    const lastSeen = this.storage.lastSeen;
    if (lastSeen) {
      console.log(`Resuming subscription from ${lastSeen}.`);
      return resumeSubscription(this.client, this.graphqlQuery, this.partnershipId, lastSeen);
    } else {
      console.log('Starting initial subscription');
      return initiateSubscription(this.client, this.graphqlQuery, this.partnershipId);
    }
  };
}

const initiateSubscription = (client, query, partnershipId) =>
  client.subscribe({
    query: query,
    variables: {
      partnershipId: partnershipId,
    },
  });

const resumeSubscription = (client, query, partnershipId, startDate) =>
  client.subscribe({
    query: query,
    variables: {
      partnershipId: partnershipId,
      startDate: startDate,
    },
  });
