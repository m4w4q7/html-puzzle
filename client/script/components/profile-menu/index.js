import { createTemplate } from './template.js';
import { AbstractCustomElement } from '../abstract-custom-element/index.js';
import { services } from '../../services/index.js';

export class ProfileMenuComponent extends AbstractCustomElement {

  constructor() {
    super();
    this._attachShadowedTemplate(createTemplate);
    this._nodes.loginButton.addEventListener('click', () => this._signIn());
    this._nodes.signOutButton.addEventListener('click', () => this._signOut());
    services.user.subscribe('nameChange', this._render, this);
  }


  connectedCallback() {
    this._render();
  }


  _signIn() {
    services.user.signIn();
  }


  _signOut() {
    services.user.signOut();
  }


  _render() {
    const name = services.user.getName();
    if (name) {
      this._nodes.name.innerText = name;
      this._nodes.profileMenu.style.display = '';
      this._nodes.loginButtonContainer.style.display = 'none';
    } else {
      this._nodes.profileMenu.style.display = 'none';
      this._nodes.loginButtonContainer.style.display = '';
    }
  }


  static get tagName() {
    return 'hpu-profile-menu';
  }

}
