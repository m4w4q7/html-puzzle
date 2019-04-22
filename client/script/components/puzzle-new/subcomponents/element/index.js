import { pieceTypes } from '../../enums.js';
import { reflow } from '../../utils.js';
import { doOnNext } from '../../../../utils.js';
import { AbstractPuzzlePiece } from '../abstract-puzzle-piece/index.js';
import { createTemplate } from './template.js';

export class PuzzleElementComponent extends AbstractPuzzlePiece {

  constructor() {
    super();
    this._model = null;
    this._blockListTransitionEndCallback = null;
  }


  get pieceType() {
    return pieceTypes.element;
  }


  set model(value) {
    this._model = value;
    this._render();
  }


  static get createTemplate() {
    return createTemplate;
  }


  hideChildren(callback) {
    if (!this._nodes || !this._model || !this._model.children.length) { return void callback(); }

    this._registerBlockListTransitionEndCallback(callback);

    this._nodes.blockList.style.height = this._getBlockListFullHeight();
    reflow(this._nodes.blockList);
    this._nodes.blockList.style.height = '0';
  }


  showChildren(callback) {
    if (!this._nodes || !this._model || !this._model.children.length) { return void callback(); }

    this._registerBlockListTransitionEndCallback(() => {
      this._nodes.blockList.style.height = '';
      callback();
    });

    this._nodes.blockList.style.height = '0';
    reflow(this._nodes.blockList);
    this._nodes.blockList.style.height = this._getBlockListFullHeight();
  }


  _registerBlockListTransitionEndCallback(callback) {
    if (!this._blockListTransitionEndCallback) {
      doOnNext(this._nodes.blockList, 'transitionend', () => {
        this._blockListTransitionEndCallback();
        this._blockListTransitionEndCallback = null;
      });
    }
    this._blockListTransitionEndCallback = callback;
  }


  _getBlockListFullHeight() {
    return `${this._nodes.blockList.scrollHeight}px`;
  }


  _render() {
    if (!this._nodes || !this._model) { return; }
    this._nodes.tagName.textContent = this._model.tagName;
    this._nodes.id.value = this._model.id;
    this._nodes.classList.value = this._model.classList;
    this._nodes.attributeList.value = this._model.attributes;
    this._nodes.blockList.model = this._model.children;
  }

}
