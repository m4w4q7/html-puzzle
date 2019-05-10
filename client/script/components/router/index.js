import { AbstractCustomElement } from '../abstract-custom-element/index.js';
import { ListPageComponent } from '../pages/list/index.js';
import { PlayPageComponent } from '../pages/play/index.js';
import { ProfilePageComponent } from '../pages/profile/index.js';
import { createTemplate } from './template.js';


export class RouterComponent extends AbstractCustomElement {

  constructor() {
    super();
    this._render = this._render.bind(this);
    this._attachShadowedTemplate(createTemplate);
    this._currentPage = null;
    window.addEventListener('hashchange', this._render);
  }


  connectedCallback() {
    this._render();
  }


  async _render() {
    const { page, parameters } = this._parseHash(location.hash);
    const previousPage = this._currentPage;
    const currentPage = this._nodes.pages[page] || this._nodes.pages.list;
    this._currentPage = currentPage;

    await currentPage.onActivate(parameters);
    if (previousPage) { previousPage.style.display = 'none'; }
    currentPage.style.display = '';
    if (previousPage) { await previousPage.onDeactivate(); }
  }


  _parseHash(hash) {
    const [_, page = '', parameterString = ''] = hashRegexp.exec(hash.slice(1));
    const parameters = new URLSearchParams(parameterString);
    return { page, parameters };
  }


  static get dependencies() {
    return [ListPageComponent, PlayPageComponent, ProfilePageComponent];
  }


  static get tagName() {
    return 'hpu-router';
  }

}


const hashRegexp = /([^?]*)(?:\?(.*))?/;
