import { createTemplateFactory } from '../../create-template-factory.js';
import htmlTemplate from './template.html.js';

export const createTemplate = createTemplateFactory(htmlTemplate, {
  logo: '.hpu-logo',
  loginButton: '.hpu-top-menu__login-button',
}, {
  currentPath: new URL('./', import.meta.url).href
});
