export class State {

  constructor() {
    this._data = {
      highlightedElement: null,
      draggedElement: null,
      draggedElementClone: null,
      characterDimensions: {}
    };
    this._observers = {};
    this._createSettersAndGetters();
  }


  observe(field, callback, context) {
    if (!this._observers[field]) this._observers[field] = [];
    this._observers[field].push({ context, callback });
  }


  _createSettersAndGetters() {
    Object.keys(this._data).forEach((field) => {
      Object.defineProperty(this, field, {
        configurable: true,
        enumerable: true,
        get: () => this._data[field],
        set: value => {
          this._data[field] = value;
          this._notifyObservers(field);
        }
      });
    });
  }

  _notifyObservers(field) {
    if (!this._observers[field]) { return; }
    this._observers[field].forEach(({ callback, context }) => callback.call(context, this._data[field]));
  }

}
