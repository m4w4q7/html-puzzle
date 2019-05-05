import { fetchExample } from './examples/fetch.js';
import { shuffle } from './shuffle/index.js';
import { doOnNext } from './utils.js';
import { HintCalculator } from './hint/index.js';
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

  [goalPreviewComponent, currentPreviewComponent].forEach(preview => {
    preview.assets = { css: example.css, js: example.js };
  });

  const goal = Pug.parse(example.pug);
  const initialModel = shuffle(goal);
  puzzleComponent.model = initialModel;
  goalPreviewComponent.model = goal;
  currentPreviewComponent.model = initialModel;

  const hintCalculator = new HintCalculator(goal);
  let hint = null;
  let hintsUsed = 0;
  const hintCounter = document.querySelector('#hintCounter');
  document.querySelector('#hintButton').addEventListener('mousedown', () => {
    if (!hint) {
      hintsUsed++;
      hintCounter.textContent = hintsUsed;
      hint = hintCalculator.getNext(puzzleComponent.model);
    }
    puzzleComponent.showHint(hint);
    doOnNext(document, 'mouseup', () => puzzleComponent.hideHint());
  });

  puzzleComponent.addEventListener('change', event => {
    hint = null;
    currentPreviewComponent.model = event.detail.model;
    if (goal.isEqual(event.detail.model)) { alert('Congratulations! 🙂👍'); }
  });
})();
