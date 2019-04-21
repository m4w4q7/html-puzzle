import { createTemplate } from './template.js';
import { clearElement, createElement, createDocumentFragment } from '../../../../utils.js';

export class PuzzleClassListComponent extends HTMLElement {

  constructor() {
    super();
    const { content, nodes } = createTemplate();
    this.attachShadow({ mode: 'open' }).appendChild(content);
    this._nodes = nodes;
  }


  set classes(classes) {
    this._nodes.container = clearElement(this._nodes.container);
    this._nodes.container.appendChild(this._createAttributes(classes));
  }


  _createAttributes(classes) {
    const nodes = classes.map(className => createElement('span', { className: 'class', textContent: `.${className}` }));
    return createDocumentFragment(nodes);
  }

}
