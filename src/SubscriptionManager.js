export class SubscriptionManager {
  retryCount = 0;

  runSubscription = (subscriptionConnector, ...observers) => {
    const observable = subscriptionConnector.subscribe();

    observers.forEach(observer => observable.subscribe(observer));

    observable.subscribe(
      () => {},
      () => setTimeout(
        () => this.runSubscription(subscriptionConnector, ...observers),
        5000,
      ),
    );
  };
}
