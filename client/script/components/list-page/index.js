import { AbstractCustomElement } from '../abstract-custom-element/index.js';
import { createTemplate } from './template.js';

export class ListPageComponent extends AbstractCustomElement {

  constructor() {
    super();
    this._attachShadowedTemplate(createTemplate);
  }


  async onActivate() {}


  async onDeactivate() {}


  static get tagName() {
    return 'hpu-list-page';
  }

}
