import { AbstractPageComponent } from '../abstract-page/index.js';
import { createTemplate } from './template.js';

export class ListPageComponent extends AbstractPageComponent {

  constructor() {
    super();
    this._attachShadowedTemplate(createTemplate);
  }


  static get tagName() {
    return 'hpu-list-page';
  }

}
