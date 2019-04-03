import { fetchExample } from './examples/fetch.js';
import { parse } from './parse.js';
import { shuffle } from './shuffle/index.js';

(async function() {

  const [example] = await Promise.all([
    fetchExample('text-styles'),
    new Promise(resolve => window.addEventListener('DOMContentLoaded', resolve))
  ]);

  const puzzleComponent = document.querySelector('hpu-puzzle');
  const previewComponent = document.querySelector('hpu-preview');
  example.css.forEach(url => previewComponent.addStyleSheet(url));
  example.js.forEach(url => previewComponent.addScript(url));

  const goal = parse(example.pug);
  const initialModel = shuffle(goal);
  puzzleComponent.model = initialModel;
  previewComponent.model = initialModel;
  puzzleComponent.addEventListener('change', event => { previewComponent.model = event.detail.model; });
})();
