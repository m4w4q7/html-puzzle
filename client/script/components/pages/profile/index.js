import { AbstractPageComponent } from '../abstract-page/index.js';
import { createTemplate } from './template.js';
import { services } from '../../../services/index.js';

export class ProfilePageComponent extends AbstractPageComponent {

  constructor() {
    super();
    this._attachShadowedTemplate(createTemplate);
    this._nodes.applyButton.addEventListener('click', () => this._changeName());
    services.user.subscribe('nameChange', this._onNameChange, this);
  }


  async onActivate() {
    await super.onActivate();
    this._nodes.nameInput.value = services.user.getName();
  }


  _onNameChange() {
    if (!this._isActive) { return; }
    this._navigateToIndex();
  }


  async _changeName() {
    const newName = this._nodes.nameInput.value;
    if (newName === services.user.getName() ) { return this._navigateToIndex(); }
    if (newName.length < 3) { return alert('Name must be at least 3 characters long.'); }
    if (!await services.user.isNameFree(newName)) { return window.alert(`"${newName}" is already taken.`); }
    await services.user.changeName(newName);
  }


  _navigateToIndex() {
    location.assign('#');
  }


  static get tagName() {
    return 'hpu-profile-page';
  }

}
