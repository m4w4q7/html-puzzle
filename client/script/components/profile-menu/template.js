import { createTemplateFactory } from '../../create-template-factory.js';
import htmlTemplate from './template.html.js';

export const createTemplate = createTemplateFactory(htmlTemplate, {
  loginButton: '.login-button',
  profileMenu: '.profile-menu',
  nameContainer: '.name-container',
}, {
  currentPath: new URL('./', import.meta.url).href
});
