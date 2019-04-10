import { fetchExample } from './examples/fetch.js';
import { parse } from './parse.js';
import { shuffle } from './shuffle/index.js';

(async function() {

  const [example] = await Promise.all([
    fetchExample('dropdown'),
    new Promise(resolve => window.addEventListener('DOMContentLoaded', resolve))
  ]);

  const puzzleComponent = document.querySelector('hpu-puzzle');
  const goalPreviewComponent = document.querySelector('#goalPreview');
  const currentPreviewComponent = document.querySelector('#currentPreview');
  const previews = [goalPreviewComponent, currentPreviewComponent];
  example.css.forEach(url => previews.forEach(preview => preview.addStyleSheet(url)));
  example.js.forEach(url => previews.forEach(preview => preview.addScript(url)));

  const goal = parse(example.pug);
  const initialModel = shuffle(goal);
  puzzleComponent.model = initialModel;
  goalPreviewComponent.model = goal;
  currentPreviewComponent.model = initialModel;
  puzzleComponent.addEventListener('change', event => { currentPreviewComponent.model = event.detail.model; });
})();
