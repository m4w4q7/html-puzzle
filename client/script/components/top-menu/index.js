import { createTemplate } from './template.js';
import { AbstractCustomElement } from '../abstract-custom-element/index.js';
import { ProfileMenuComponent } from '../profile-menu/index.js';

export class TopMenuComponent extends AbstractCustomElement {

  constructor() {
    super();
    this._attachShadowedTemplate(createTemplate);
    this._nodes.logo.addEventListener('click', () => location.assign('#'));
  }


  static get dependencies() {
    return [ProfileMenuComponent];
  }


  static get tagName() {
    return 'hpu-top-menu';
  }

}
