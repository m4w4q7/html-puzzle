/* eslint-disable no-unused-vars */
import { AbstractCustomElement } from '../../abstract-custom-element/index.js';

export class AbstractPageComponent extends AbstractCustomElement {

  constructor() {
    super();
    this._isActive = false;
  }

  async onActivate(params) {
    this._isActive = true;
  }


  async onDeactivate() {
    this._isActive = false;
  }

}
