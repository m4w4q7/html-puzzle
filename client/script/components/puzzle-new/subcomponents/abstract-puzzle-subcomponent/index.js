export class AbstractPuzzleSubcomponent extends HTMLElement {

  constructor() {
    super();
    this._wasConnected = false;
    this._nodes = null;
  }


  static createTemplate() {
    throw new Error('Abstract getter / method should be overridden!');
  }


  connectedCallback() {
    if (this._wasConnected) { return; }
    const { content, nodes } = this.constructor.createTemplate();
    this.appendChild(content);
    this._nodes = nodes;
    this._wasConnected = true;
    this._render();
  }


  _render() {}

}
