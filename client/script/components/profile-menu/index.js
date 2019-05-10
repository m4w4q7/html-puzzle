import { createTemplate } from './template.js';
import { AbstractCustomElement } from '../abstract-custom-element/index.js';
import { services } from '../../services/index.js';

export class ProfileMenuComponent extends AbstractCustomElement {

  constructor() {
    super();
    this._attachShadowedTemplate(createTemplate);
    this._nodes.loginButton.addEventListener('click', () => this._signIn());
    this._nodes.signOutButton.addEventListener('click', () => this._signOut());
    this._userService = services.user;
  }


  connectedCallback() {
    this._render();
  }


  _signIn() {
    this._userService.signIn();
  }


  async _signOut() {
    await this._userService.signOut();
    this._render();
  }


  _render() {
    const name = this._getName();
    if (name) {
      this._nodes.name.innerText = name;
      this._nodes.profileMenu.style.display = '';
      this._nodes.loginButtonContainer.style.display = 'none';
    } else {
      this._nodes.profileMenu.style.display = 'none';
      this._nodes.loginButtonContainer.style.display = '';
    }
  }


  _getName() {
    const session = localStorage.getItem('session');
    return session && JSON.parse(session).user.name;
  }


  static get tagName() {
    return 'hpu-profile-menu';
  }

}
