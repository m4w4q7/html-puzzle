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
  }


  async onActivate() {
    const exerciseName = new URLSearchParams(window.location.search).get('id') || 'dropdown';
    const exercise = await fetchExercise(exerciseName);

    this._nodes.exerciseNameElement.textContent = exercise.name;

    doOnNext(this._nodes.puzzleComponent, 'mousedown', () => this._nodes.clockComponent.start());

    this._nodes.goalPreviewComponent.assets = { css: exercise.css, js: exercise.js };
    this._nodes.currentPreviewComponent.assets = { css: exercise.css, js: exercise.js };

    const goal = Pug.parse(exercise.pug);
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
