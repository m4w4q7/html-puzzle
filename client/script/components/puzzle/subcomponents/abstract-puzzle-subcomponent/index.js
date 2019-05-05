import { createTemplateFactory } from '../../../../create-template-factory.js';
import { AbstractCustomElement } from '../../../abstract-custom-element/index.js';
const createTemplate = createTemplateFactory();


export class AbstractPuzzleSubcomponent extends AbstractCustomElement {

  constructor() {
    super();
    this._wasConnected = false;
    this._nodes = null;
  }


  static createTemplate() {
    return createTemplate();
  }


  connectedCallback() {
    if (this._wasConnected) { return false; }
    const { content, nodes } = this.constructor.createTemplate();
    this.appendChild(content);
    this._nodes = nodes;
    this._wasConnected = true;
    this._render();
    return true;
  }


  _render() {}

}
