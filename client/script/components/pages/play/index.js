/* eslint-disable no-console */
import { AbstractPageComponent } from '../abstract-page/index.js';
import { HorizontalResizableComponent } from '../../horizontal-resizable/index.js';
import { PuzzleComponent } from '../../puzzle/index.js';
import { PreviewComponent } from '../../preview/index.js';
import { ClockComponent } from '../../clock/index.js';
import { createTemplate } from './template.js';
import { doOnNext } from '../../../utils.js';
import { Pug } from '../../../pug/index.js';
import { shuffle } from '../../../shuffle/index.js';
import { HintCalculator } from '../../../hint/index.js';
import { services } from '../../../services/index.js';

export class PlayPageComponent extends AbstractPageComponent {

  constructor() {
    super();
    this._onHint = this._onHint.bind(this);
    this._onPuzzleChange = this._onPuzzleChange.bind(this);
    this._attachShadowedTemplate(createTemplate);
    this._hint = null;
    this._hintsUsed = 0;
    this._hintCalculator = null;
    this._originalModel = null;
    this._cancelClockStart = null;
  }


  async onActivate(params) {
    await super.onActivate(params);
    const exerciseId = params.get('exercise') || 'dropdown';
    this._exercise = await services.server.getExerciseById(exerciseId);

    this._initDocumentation(this._exercise);

    this._nodes.exerciseName.textContent = this._exercise.name;

    if (this._cancelClockStart) { this._cancelClockStart(); }
    this._cancelClockStart = doOnNext(this._nodes.puzzle, 'mousedown', () => this._nodes.clock.start());

    this._originalModel = this._parsePug(this._exercise.pug);
    const shuffledModel = shuffle(this._originalModel);

    this._initPreviews(this._exercise, this._originalModel, shuffledModel);
    this._initHint(this._originalModel);
    this._initPuzzle(shuffledModel);
  }


  async onDeactivate() {
    await super.onDeactivate();
    this._nodes.clock.clear();
    this._hint = null;
  }


  _initDocumentation({ documentation: url = '' }) {
    const link = this._nodes.documentationLinkButton;
    link.href = url;
    link.style.display = url ? '' : 'none';
  }


  _parsePug(pug) {
    const { blockList, errors } = Pug.parse(pug);
    errors.forEach(error => console.error(error));
    return blockList;
  }


  _initPreviews(exercise, originalModel, shuffledModel) {
    this._nodes.goalPreview.assets = { css: exercise.css, js: exercise.js };
    this._nodes.currentPreview.assets = { css: exercise.css, js: exercise.js };

    this._nodes.goalPreview.model = originalModel;
    this._nodes.currentPreview.model = shuffledModel;
  }


  _initHint(goal) {
    this._hint = null;
    this._hintsUsed = 0;
    this._nodes.hintCounter.textContent = this._hintsUsed;
    this._hintCalculator = new HintCalculator(goal);
    this._nodes.hintButton.addEventListener('mousedown', this._onHint);
  }


  _onHint() {
    if (!this._hint) {
      this._hintsUsed++;
      this._nodes.hintCounter.textContent = this._hintsUsed;
      this._hint = this._hintCalculator.getNext(this._nodes.puzzle.model);
    }
    this._nodes.puzzle.showHint(this._hint);
    doOnNext(document, 'mouseup', () => this._nodes.puzzle.hideHint());
  }


  _initPuzzle(shuffledModel) {
    this._nodes.puzzle.model = shuffledModel;
    this._nodes.puzzle.addEventListener('change', this._onPuzzleChange);
  }


  _onPuzzleChange(event) {
    this._hint = null;
    this._nodes.currentPreview.model = event.detail.model;
    if (this._originalModel.isEqual(event.detail.model)) {
      if (services.user.isAuthenticated()) {
        const timeTaken = this._nodes.clock.time;
        const hintsUsed = this._hintsUsed;
        services.server.postResult({ id: this._exercise.id }, { timeTaken, hintsUsed });
      }
      setTimeout(() => {
      alert('Congratulations! You\'ve successfully solved the puzzle.');
      location.assign('#');
    }, 200);
    }
  }


  static get dependencies() {
    return [HorizontalResizableComponent, PuzzleComponent, PreviewComponent, ClockComponent];
  }


  static get tagName() {
    return 'hpu-play-page';
  }

}
