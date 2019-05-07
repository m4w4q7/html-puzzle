import { createTemplate } from './template.js';
import { AbstractCustomElement } from '../abstract-custom-element/index.js';

export class ProfileMenuComponent extends AbstractCustomElement {

  constructor() {
    super();
    this._attachShadowedTemplate(createTemplate);
    this._nodes.loginButton.addEventListener('click', () => location.assign('/authenticate/google/login'));
  }


  connectedCallback() {
    const name = this._getName();
    if (name) {
      this._nodes.nameContainer.innerText = name;
      this._nodes.profileMenu.style.display = '';
    } else {
      this._nodes.loginButton.style.display = '';
    }
  }


  _getName() {
    const emailCookie = document.cookie.split(';')
      .map(entry => entry.trim().split('='))
      .find(entry => entry[0] === 'email');

    return emailCookie && emailCookie[1];
  }


  static get tagName() {
    return 'hpu-profile-menu';
  }

}
