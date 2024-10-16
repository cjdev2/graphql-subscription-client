import { gql } from '@apollo/client/core/index.js';

export const conversionsSubscription = gql`
  subscription Conversions($partnershipId: ID!, $startTime: Timestamp){
    conversions(partnershipId: $partnershipId, startTime: $startTime) {
      id
      lastUpdated
    }
  }
`;

export const paymentStatusEventsSubscription = gql`
  subscription PaymentStatusEvents($partnershipId: ID!, $startTime: Timestamp) {
    paymentStatusEvents(partnershipId: $partnershipId, startTime: $startTime) {
      conversionId
      eventTime
      status
    }
  }
`;
