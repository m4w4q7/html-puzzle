import { createTemplateFactory } from '../../../create-template-factory.js';
import htmlTemplate from './template.html.js';

export const createTemplate = createTemplateFactory(htmlTemplate, {
  puzzle: 'hpu-puzzle',
  goalPreview: '#goalPreview',
  currentPreview: '#currentPreview',
  clock: 'hpu-clock',
  exerciseName: '#exerciseName',
  hintCounter: '#hintCounter',
  hintButton: '#hintButton',
  documentationLinkButton: '#documentationLinkButton',
});
