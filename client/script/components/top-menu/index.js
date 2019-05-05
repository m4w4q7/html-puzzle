import template from './template.html.js';
import { AbstractCustomElement } from '../abstract-custom-element/index.js';

export class TopMenuComponent extends AbstractCustomElement {

  constructor() {
    super();
    this.innerHTML = template;
    this._dom = {
      logo: this.querySelector('.hpu-logo'),
      loginButton: this.querySelector('.hpu-top-menu__login-button')
    };

    this._dom.logo.addEventListener('click', () => location.assign('index.html'));
    this._dom.loginButton.addEventListener('click', () => location.assign('login.html'));
  }


  static get tagName() {
    return 'hpu-top-menu';
  }

}
