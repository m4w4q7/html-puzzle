export class AbstractPuzzleSubcomponent extends HTMLElement {

  constructor() {
    super();
    const { content, nodes } = this.constructor.createTemplate();
    this.attachShadow({ mode: 'open' }).appendChild(content);
    this._nodes = nodes;
  }


  static createTemplate() {
    throw new Error('Abstract getter / method should be overridden!');
  }

}
