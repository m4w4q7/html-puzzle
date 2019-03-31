import { fetchExample } from './example/fetch.js';
import { parse } from './parse.js';

(async function() {

  const [example] = await Promise.all([
    fetchExample,
    new Promise(resolve => window.addEventListener('DOMContentLoaded', resolve))
  ]);

  const puzzleComponent = document.querySelector('hpu-puzzle');
  puzzleComponent.model = parse(example);
  puzzleComponent.addEventListener('change', event => console.log(event.detail.model)); // eslint-disable-line no-console
})();
