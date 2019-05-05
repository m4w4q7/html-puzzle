import { AbstractCustomElement } from '../abstract-custom-element/index.js';
import { HorizontalResizableComponent } from '../horizontal-resizable/index.js';
import { PuzzleComponent } from '../puzzle/index.js';
import { PreviewComponent } from '../preview/index.js';
import { ClockComponent } from '../clock/index.js';
import { createTemplate } from './template.js';
import { fetchExample } from '../../examples/fetch.js';
import { doOnNext } from '../../utils.js';
import { Pug } from '../../pug/index.js';
import { shuffle } from '../../shuffle/index.js';
import { HintCalculator } from '../../hint/index.js';

export class PlayPageComponent extends AbstractCustomElement {

  constructor() {
    super();
    this._attachShadowedTemplate(createTemplate);
  }


  async onActivate() {
    const exampleName = new URLSearchParams(window.location.search).get('id') || 'dropdown';
    const example = await fetchExample(exampleName);

    this._nodes.exerciseNameElement.textContent = example.name;

    doOnNext(this._nodes.puzzleComponent, 'mousedown', () => this._nodes.clockComponent.start());

    this._nodes.goalPreviewComponent.assets = { css: example.css, js: example.js };
    this._nodes.currentPreviewComponent.assets = { css: example.css, js: example.js };

    const goal = Pug.parse(example.pug);
    const initialModel = shuffle(goal);
    this._nodes.puzzleComponent.model = initialModel;
    this._nodes.goalPreviewComponent.model = goal;
    this._nodes.currentPreviewComponent.model = initialModel;

    const hintCalculator = new HintCalculator(goal);
    let hint = null;
    let hintsUsed = 0;

    this._nodes.hintButton.addEventListener('mousedown', () => {
      if (!hint) {
        hintsUsed++;
        this._nodes.hintCounter.textContent = hintsUsed;
        hint = hintCalculator.getNext(this._nodes.puzzleComponent.model);
      }
      this._nodes.puzzleComponent.showHint(hint);
      doOnNext(document, 'mouseup', () => this._nodes.puzzleComponent.hideHint());
    });

    this._nodes.puzzleComponent.addEventListener('change', event => {
      hint = null;
      this._nodes.currentPreviewComponent.model = event.detail.model;
      if (goal.isEqual(event.detail.model)) { alert('Congratulations! 🙂👍'); }
    });
  }


  static get dependencies() {
    return [HorizontalResizableComponent, PuzzleComponent, PreviewComponent, ClockComponent];
  }


  static get tagName() {
    return 'hpu-play-page';
  }

}
