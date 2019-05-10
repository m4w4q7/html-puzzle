export class EventEmitter {

  constructor() {
    this._subscriptions = {};
  }


  subscribe(eventName, callback, context) {
    if (!this._subscriptions[eventName]) this._subscriptions[eventName] = [];
    const isSubscribed = this._indexOfSubscription(eventName, callback, context) > -1;
    if (isSubscribed) { return; }

    this._subscriptions[eventName].push({ context, callback });
  }


  unsubscribe(eventName, callback, context) {
    const index = this._indexOfSubscription(eventName, callback, context);
    if (index === -1) { return; }
    this._subscriptions.splice(index, 1);
  }


  _emit(eventName, eventDetails) {
    console.log('emit', eventName, this._subscriptions[eventName]);
    if (!this._subscriptions[eventName]) { return; }
    this._subscriptions[eventName].forEach(({ context, callback }) => {
      callback.call(context, eventDetails);
    });
  }


  _indexOfSubscription(eventName, callback, context) {
    if (!this._subscriptions[eventName]) { return -1; }
    return this._subscriptions[eventName].findIndex(subscription => {
      return subscription.context === context && subscription.callback === callback;
    });
  }
}
