import { createTemplate } from './template.js';

export class PuzzleElementComponent extends HTMLElement {

  constructor() {
    super();
    const { content, nodes } = createTemplate();
    this.attachShadow({ mode: 'open' }).appendChild(content);
    this._nodes = nodes;
  }


  set model({ tagName, id, classList, attributes, children }) {
    this._nodes.tagName.textContent = tagName;
    this._nodes.id.value = id;
    this._nodes.classList.classes = classList;
    this._nodes.attributeList.attributes = attributes;
    this._nodes.blockList.model = children;
  }

}
