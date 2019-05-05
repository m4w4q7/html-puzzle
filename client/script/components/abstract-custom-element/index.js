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


  static define(dependencyChain = []) {
    if (customElements.get(this.tagName) || dependencyChain.includes(this)) { return; }
    const childDependencyChain = [...dependencyChain, this];
    this.dependencies.forEach(Element => Element.define(childDependencyChain));
    customElements.define(this.tagName, this);
  }

}
