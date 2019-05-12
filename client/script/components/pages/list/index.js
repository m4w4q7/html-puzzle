import { AbstractPageComponent } from '../abstract-page/index.js';
import { createTemplate } from './template.js';

export class ListPageComponent extends AbstractPageComponent {

  constructor() {
    super();
    this._attachShadowedTemplate(createTemplate);
    this._nodes.list.addEventListener('click', ({ target }) => {
      if (target.dataset.exercise) { location.assign(`#play?exercise=${target.dataset.exercise}`); }
    });
  }


  static get tagName() {
    return 'hpu-list-page';
  }

}
