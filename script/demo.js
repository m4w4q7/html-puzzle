import { fetchExample } from './example/fetch.js';
import { parse } from './parse.js';

(async function() {

  const [example] = await Promise.all([
    fetchExample,
    new Promise(resolve => window.addEventListener('DOMContentLoaded', resolve))
  ]);

  const puzzleComponent = document.querySelector('hpu-puzzle');
  const previewComponent = document.querySelector('hpu-preview');
  previewComponent.addScript('https://redirector.eservice.emarsys.net/ui/latest/js/app.js');
  previewComponent.addStyleSheet('https://redirector.eservice.emarsys.net/ui/latest/css/app.css');

  const model = parse(example);
  puzzleComponent.model = model;
  previewComponent.model = model;
  puzzleComponent.addEventListener('change', event => { previewComponent.model = event.detail.model; });
})();
