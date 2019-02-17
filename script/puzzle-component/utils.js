export const doOnNext = (element, eventName, callback) => {
  const unsubscribingCallback = event => {
    element.removeEventListener(eventName, unsubscribingCallback);
    callback(event);
  }
  element.addEventListener(eventName, unsubscribingCallback);
};


export const reflow = element => void element.clientWidth;
