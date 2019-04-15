import template from './template.html.js';

export class TopMenuComponent extends HTMLElement {

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

}
