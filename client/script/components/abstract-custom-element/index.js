import { AbstractMemberAccessError } from '../../errors/abstract-member-access-error.js';

const createAbstractCustomElement = (SuperClass) => class extends SuperClass {

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


  static get extends() {
    return null;
  }


  static define(dependencyChain = []) {
    if (customElements.get(this.tagName) || dependencyChain.includes(this)) { return; }
    const childDependencyChain = [...dependencyChain, this];
    this.dependencies.forEach(Element => Element.define(childDependencyChain));
    customElements.define(this.tagName, this, this.extends ? { extends: this.extends } : undefined);
  }

};

export const AbstractCustomElement = createAbstractCustomElement(HTMLElement);
export const AbstractTableRowCustomElement = createAbstractCustomElement(HTMLTableRowElement);
