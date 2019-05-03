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


  isEqual(text) {
    return this.content === text.content;
  }


  toString() {
    return `TEXT: ${this._content}`;
  }

}
