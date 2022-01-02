import { convertSecondsToTime } from '../../utils.js';
import { AbstractTableRowCustomElement } from '../abstract-custom-element/index.js';
import { createTemplate } from './template.js';

export class ExerciseListElementComponent extends AbstractTableRowCustomElement {

  constructor() {
    super();
    this._goToExercise = this._goToExercise.bind(this);
    this.classList.add(this.constructor.tagName);
    const { content, nodes } = createTemplate();
    this._content = content;
    this._nodes = nodes;
    this._exerciseId = '';
    this._registerEventListeners();
  }


  connectedCallback() {
    this.appendChild(this._content);
  }


  set name(value) {
    this._nodes.name.textContent = value;
  }


  set record(value) {
    if (value) {
      this._nodes.time.textContent = convertSecondsToTime(value.timeTaken / 1000);
      this._nodes.hints.textContent = `${value.hintsUsed} hint${value.hintsUsed > 1 ? 's' : ''}`;
      this._nodes.time.colSpan = 1;
      this._nodes.hints.style.display = '';
    } else {
      this._nodes.time.textContent = '-';
      this._nodes.hints.textContent = '';
      this._nodes.time.colSpan = 2;
      this._nodes.hints.style.display = 'none';
    }
  }


  set rank(value) {
    this._nodes.rank.textContent = value || '-';
  }


  set totalUsersCompleted(value) {
    this._nodes.totalUsersCompleted.textContent = `/ ${value}`;
  }


  set exerciseId(value) {
    this._exerciseId = value;
  }


  _registerEventListeners() {
    this._nodes.name.addEventListener('click', this._goToExercise);
    this._nodes.action.addEventListener('click', this._goToExercise);
  }


  _goToExercise() {
    location.assign(`#play?exercise=${this._exerciseId}`);
  }


  static get extends() {
    return 'tr';
  }


  static get tagName() {
    return 'hpu-exercise-list-element';
  }

}
