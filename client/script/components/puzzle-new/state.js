import { dragStates } from './enums.js';

export class State {

  constructor() {
    this._data = {
      hoveredPiece: null,
      draggedPiece: null,
      dragState: dragStates.hover,
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
          if (this._data[field] === value) { return; }
          console.log('stateChange', field, value);
          const oldValue = this._data[field];
          this._data[field] = value;
          this._notifyObservers(field, value, oldValue);
        }
      });
    });
  }

  _notifyObservers(field, newValue, oldValue) {
    if (!this._observers[field]) { return; }
    this._observers[field].forEach(({ callback, context }) => callback.call(context, newValue, oldValue));
  }

}
