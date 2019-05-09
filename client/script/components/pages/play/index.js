import { AbstractPageComponent } from '../abstract-page/index.js';
import { HorizontalResizableComponent } from '../../horizontal-resizable/index.js';
import { PuzzleComponent } from '../../puzzle/index.js';
import { PreviewComponent } from '../../preview/index.js';
import { ClockComponent } from '../../clock/index.js';
import { createTemplate } from './template.js';
import { fetchExercise } from '../../../fetch-exercise.js';
import { doOnNext } from '../../../utils.js';
import { Pug } from '../../../pug/index.js';
import { shuffle } from '../../../shuffle/index.js';
import { HintCalculator } from '../../../hint/index.js';

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
  }


  async onActivate(params) {
    const exerciseName = params.get('exercise') || 'dropdown';
    const exercise = await fetchExercise(exerciseName);

    this._initDocumentation(exercise);

    this._nodes.exerciseName.textContent = exercise.name;

    doOnNext(this._nodes.puzzle, 'mousedown', () => this._nodes.clock.start());

    this._originalModel = Pug.parse(exercise.pug);
    const shuffledModel = shuffle(this._originalModel);

    this._initPreviews(exercise, this._originalModel, shuffledModel);
    this._initHint(this._originalModel);
    this._initPuzzle(shuffledModel);
  }


  async onDeactivate() {
    this._nodes.clock.clear();
    this._hint = null;
  }


  _initDocumentation({ documentation: url = '' }) {
    const link = this._nodes.documentationLinkButton;
    link.href = url;
    link.style.display = url ? '' : 'none';
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
    if (this._originalModel.isEqual(event.detail.model)) { alert('Congratulations! 🙂👍'); }
  }


  static get dependencies() {
    return [HorizontalResizableComponent, PuzzleComponent, PreviewComponent, ClockComponent];
  }


  static get tagName() {
    return 'hpu-play-page';
  }

}
