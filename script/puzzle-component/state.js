export class State {

  constructor() {
    this._data = {
      highlightedElement: null,
      draggedElement: null
    }
    this._createSettersAndGetters();
  }


  _createSettersAndGetters() {
    Object.keys(this._data).forEach((field) => {
      Object.defineProperty(this, field, {
        configurable: true,
        enumerable: true,
        get: () => this._data[field],
        set: value => this._data[field] = value
      });
    });
  }
}
