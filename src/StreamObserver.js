export class StreamObserver {
  constructor(storage, getTimestamp) {
    this.storage = storage;
    this.getTimestamp = getTimestamp;
  };

  next = (message) => {
    const newCount = this.storage.messageCount + 1;
    const lastSeen = this.getTimestamp(message.data);

    if (newCount % 10000 === 1) {
      process.stdout.write('Receiving messages ');
    } else if (newCount % 10000 === 0) {
      process.stdout.write(`. Received ${newCount} events, up to ${lastSeen}.\n`);
    } else if (newCount % 500 === 0) {
      process.stdout.write('.');
    }

    if (message.errors) console.log(`Result Errors --> ${message.errors}`);

    // record that we've received a new message only after we've fully handled it.
    this.storage.recordNewMessage(lastSeen);
  };

  error = (error) =>
    console.log(`Stream Error --> ${error}`);
}
