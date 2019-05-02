export class Text {

  constructor(value) {
    this._value = value;
  }


  get value() {
    return this._value;
  }


  toString() {
    return `TEXT: ${this._value}`;
  }

}
