export class Storage {
  messageCount = 0;
  lastSeen = null;

  /* You can choose between storing the highest (newest) timestamp:
   *   this.lastSeen = maxString(this.lastSeen, lastSeen);
   * or that last instance you observed:
   *   this.lastSeen = lastSeen;
   *
   * Both are valid, but the second option may result in more messages that you have already observed being repeated
   * when you resume a connection after a disconnect.
   */
  recordNewMessage = (lastSeen) => {
    this.messageCount++;
    this.lastSeen = maxString(this.lastSeen, lastSeen);
  };
}

const maxString = (a, b) => {
  if (a === undefined || b === undefined)
    return undefined;
  else if (a === null)
    return b;
  else if (b === null)
    return a;
  else if (a > b)
    return a;
  else
    return b;
};
