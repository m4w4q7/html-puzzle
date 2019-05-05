import { AbstractMemberAccessError } from '../../abstract-member-access-error.js';

export class AbstractCustomElement extends HTMLElement {

  _attachShadowedTemplate(createTemplate) {
    this.attachShadow({ mode: 'open' });
    const { content, nodes } = createTemplate();
    this._content = content;
    this._nodes = nodes;
    this.shadowRoot.appendChild(this._content);
  }

  static get tagName() {
    throw new AbstractMemberAccessError();
  }


  static get dependencies() {
    return [];
  }


  static define() {
    if (customElements.get(this.tagName)) { return; }
    this.dependencies.forEach(Element => Element.define());
    customElements.define(this.tagName, this);
  }

}
