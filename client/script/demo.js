import { fetchExample } from './examples/fetch.js';
import { shuffle } from './shuffle/index.js';
import { doOnNext } from './utils.js';
import { isEqual, calculateHint } from './model-utils/index.js';
import { Pug } from './pug/index.js';

(async function() {
  const exampleName = new URLSearchParams(window.location.search).get('id') || 'dropdown';

  const [example] = await Promise.all([
    fetchExample(exampleName),
    new Promise(resolve => window.addEventListener('DOMContentLoaded', resolve))
  ]);

  const puzzleComponent = document.querySelector('hpu-puzzle');
  const goalPreviewComponent = document.querySelector('#goalPreview');
  const currentPreviewComponent = document.querySelector('#currentPreview');
  const clockComponent = document.querySelector('hpu-clock');
  const exerciseNameElement = document.querySelector('#exerciseName');

  exerciseNameElement.textContent = example.name;

  doOnNext(puzzleComponent, 'mousedown', () => clockComponent.start());

  const previews = [goalPreviewComponent, currentPreviewComponent];
  example.css.forEach(url => previews.forEach(preview => preview.addStyleSheet(url)));
  example.js.forEach(url => previews.forEach(preview => preview.addScript(url)));

  const goal = Pug.parse(example.pug).toOldModel();
  const initialModel = shuffle(goal);
  puzzleComponent.model = initialModel;
  goalPreviewComponent.model = goal;
  currentPreviewComponent.model = initialModel;
  puzzleComponent.addEventListener('change', event => {
    currentPreviewComponent.model = event.detail.model;
    if (isEqual(event.detail.model, goal)) { alert('Congratulations! 🙂👍'); }

    const startDate = new Date();
    const hint = calculateHint(event.detail.model, goal);
    console.log('hint', `duration: ${new Date() - startDate}ms`, JSON.stringify(hint, null, 2));
  });
})();
