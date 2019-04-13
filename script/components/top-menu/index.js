import template from './template.html.js';

export class TopMenuComponent extends HTMLElement {

  connectedCallback() {
    this.innerHTML = template;
  }

}
