import { AbstractCustomElement } from '../abstract-custom-element/index.js';
import { HorizontalResizableComponent } from '../horizontal-resizable/index.js';
import { PuzzleComponent } from '../puzzle/index.js';
import { PreviewComponent } from '../preview/index.js';
import { ClockComponent } from '../clock/index.js';
import { createTemplate } from './template.js';
import { fetchExercise } from '../../fetch-exercise.js';
import { doOnNext } from '../../utils.js';
import { Pug } from '../../pug/index.js';
import { shuffle } from '../../shuffle/index.js';
import { HintCalculator } from '../../hint/index.js';

export class PlayPageComponent extends AbstractCustomElement {

  constructor() {
    super();
    this._attachShadowedTemplate(createTemplate);
    this._hint = null;
  }


  async onActivate() {
    const exerciseName = new URLSearchParams(window.location.search).get('id') || 'dropdown';
    const exercise = await fetchExercise(exerciseName);

    this._initDocumentation(exercise);

    this._nodes.exerciseNameElement.textContent = exercise.name;

    doOnNext(this._nodes.puzzleComponent, 'mousedown', () => this._nodes.clockComponent.start());

    const originalModel = Pug.parse(exercise.pug);
    const shuffledModel = shuffle(originalModel);

    this._initPreviews(exercise, originalModel, shuffledModel);
    this._initHint(originalModel);
    this._initPuzzle(originalModel, shuffledModel);
  }


  _initDocumentation({ documentation: url }) {
    if (!url) { return; }
    const link = this._nodes.documentationLinkButton;
    link.href = url;
    link.style.display = '';
  }


  _initPreviews(exercise, originalModel, shuffledModel) {
    this._nodes.goalPreviewComponent.assets = { css: exercise.css, js: exercise.js };
    this._nodes.currentPreviewComponent.assets = { css: exercise.css, js: exercise.js };

    this._nodes.goalPreviewComponent.model = originalModel;
    this._nodes.currentPreviewComponent.model = shuffledModel;
  }


  _initHint(goal) {
    const hintCalculator = new HintCalculator(goal);
    let hintsUsed = 0;

    this._nodes.hintButton.addEventListener('mousedown', () => {
      if (!this._hint) {
        hintsUsed++;
        this._nodes.hintCounter.textContent = hintsUsed;
        this._hint = hintCalculator.getNext(this._nodes.puzzleComponent.model);
      }
      this._nodes.puzzleComponent.showHint(this._hint);
      doOnNext(document, 'mouseup', () => this._nodes.puzzleComponent.hideHint());
    });
  }


  _initPuzzle(goalModel, initialModel) {
    this._nodes.puzzleComponent.model = initialModel;

    this._nodes.puzzleComponent.addEventListener('change', event => {
      this._hint = null;
      this._nodes.currentPreviewComponent.model = event.detail.model;
      if (goalModel.isEqual(event.detail.model)) { alert('Congratulations! 🙂👍'); }
    });
  }


  static get dependencies() {
    return [HorizontalResizableComponent, PuzzleComponent, PreviewComponent, ClockComponent];
  }


  static get tagName() {
    return 'hpu-play-page';
  }

}
