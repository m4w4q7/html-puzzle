import { createTemplate } from './template.js';
import { AbstractCustomElement } from '../abstract-custom-element/index.js';

export class TopMenuComponent extends AbstractCustomElement {

  constructor() {
    super();
    this._attachShadowedTemplate(createTemplate);
    this._nodes.logo.addEventListener('click', () => location.assign('index.html'));
    this._nodes.loginButton.addEventListener('click', () => location.assign('/authenticate/google/login'));
  }


  static get tagName() {
    return 'hpu-top-menu';
  }

}
