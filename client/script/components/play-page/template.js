import { createTemplateFactory } from '../../create-template-factory.js';
import htmlTemplate from './template.html.js';

export const createTemplate = createTemplateFactory(htmlTemplate, {
  puzzleComponent: 'hpu-puzzle',
  goalPreviewComponent: '#goalPreview',
  currentPreviewComponent: '#currentPreview',
  clockComponent: 'hpu-clock',
  exerciseNameElement: '#exerciseName',
  hintCounter: '#hintCounter',
  hintButton: '#hintButton',
});
