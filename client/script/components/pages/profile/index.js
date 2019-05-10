import { AbstractPageComponent } from '../abstract-page/index.js';
import { createTemplate } from './template.js';
import { services } from '../../../services/index.js';

export class ProfilePageComponent extends AbstractPageComponent {

  constructor() {
    super();
    this._attachShadowedTemplate(createTemplate);
    this._nodes.applyButton.addEventListener('click', () => this._changeName());
  }


  onActivate() {
    this._nodes.nameInput.value = services.user.getName();
  }


  async _changeName() {
    const newName = this._nodes.nameInput.value;
    if (newName === services.user.getName() ) { return this._navigateToIndex(); }
    if (newName.length < 3) { return alert('Name must be at least 3 characters long.'); }
    if (!await services.user.isNameFree(newName)) { return window.alert(`"${newName}" is already taken.`); }
    await services.user.changeName(newName);
    this._navigateToIndex();
  }


  _navigateToIndex() {
    location.assign('#');
  }


  static get tagName() {
    return 'hpu-profile-page';
  }
}
