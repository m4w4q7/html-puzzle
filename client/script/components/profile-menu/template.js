import { createTemplateFactory } from '../../create-template-factory.js';
import htmlTemplate from './template.html.js';

export const createTemplate = createTemplateFactory(htmlTemplate, {
  loginButtonContainer: '.login-button-container',
  loginButton: '.login-button',
  profileMenu: '.profile-menu',
  name: '.name',
  linkToProfile: '.profile-menu__profile-link',
  signOutButton: '.profile-menu__sign-out',
});
