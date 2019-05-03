export class Text {

  constructor(content) {
    this._content = content;
  }


  get content() {
    return this._content;
  }


  clone() {
    return new Text(this._content);
  }


  toOldModel() {
    return { type: 'text', text: this._content };
  }


  toString() {
    return `TEXT: ${this._content}`;
  }

}
