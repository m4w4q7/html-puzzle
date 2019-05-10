import { createTemplateFactory } from '../../create-template-factory.js';
import htmlTemplate from './template.html.js';

export const createTemplate = createTemplateFactory(htmlTemplate, {
  pages: {
    list: 'hpu-list-page',
    play: 'hpu-play-page',
    profile: 'hpu-profile-page',
  }
});
