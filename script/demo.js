import { fetchExample } from './example/fetch.js';
import { parse } from './parse.js';

(async function() {

  const [example] = await Promise.all([
    fetchExample('basic'),
    new Promise(resolve => window.addEventListener('DOMContentLoaded', resolve))
  ]);

  const puzzleComponent = document.querySelector('hpu-puzzle');
  const previewComponent = document.querySelector('hpu-preview');
  example.css.forEach(url => previewComponent.addStyleSheet(url));
  example.js.forEach(url => previewComponent.addScript(url));

  const model = parse(example.pug);
  puzzleComponent.model = model;
  previewComponent.model = model;
  puzzleComponent.addEventListener('change', event => { previewComponent.model = event.detail.model; });
})();
