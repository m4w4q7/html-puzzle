import { PieceTypes } from '../../enums.js';
import { reflow } from '../../utils.js';
import { doOnNext } from '../../../../utils.js';
import { AbstractPuzzlePiece } from '../abstract-puzzle-piece/index.js';
import { createTemplate } from './template.js';

export class PuzzleElementComponent extends AbstractPuzzlePiece {

  constructor() {
    super();
    this._model = null;
    this._blockListTransitionEndCallback = null;
    this._indentation = 0;
    this.parentList = null;
  }


  get pieceType() {
    return PieceTypes.ELEMENT;
  }


  get model() {
    return this._model;
  }


  set model(value) {
    this._model = value;
    this._render();
  }


  get indentation() {
    return this._indentation;
  }


  set indentation(value) {
    if (this._indentation === value) { return; }
    this._indentation = value;
    this._applyIndentation();
  }


  get idComponent() {
    return this._nodes && this._nodes.id;
  }


  get classListComponent() {
    return this._nodes && this._nodes.classList;
  }


  get attributeListComponent() {
    return this._nodes && this._nodes.attributeList;
  }


  static get createTemplate() {
    return createTemplate;
  }


  hideChildren(callback) {
    if (!this._nodes || !this._model || !this._model.children.length) { return void callback(); }

    this._registerBlockListTransitionEndCallback(callback);

    this._nodes.blockList.style.height = this._getBlockListFullHeight();
    reflow(this);
    this._nodes.blockList.style.height = '0';
  }


  showChildren(callback) {
    if (!this._nodes || !this._model || !this._model.children.length) { return void callback(); }

    this._registerBlockListTransitionEndCallback(() => {
      this._nodes.blockList.style.height = '';
      callback();
    });

    this._nodes.blockList.style.height = '0';
    reflow(this);
    this._nodes.blockList.style.height = this._getBlockListFullHeight();
  }


  adoptBlock(block, previousBlock) {
    this._nodes.blockList.adoptBlock(block, previousBlock);
  }


  getContainedBlocks() {
    return [this, ...this._nodes.blockList.getContainedBlocks()];
  }


  _registerBlockListTransitionEndCallback(callback) {
    if (!this._blockListTransitionEndCallback) {
      doOnNext(this._nodes.blockList, 'transitionend', () => {
        this._blockListTransitionEndCallback();
        this._blockListTransitionEndCallback = null;
      }, { predicate: event => event.propertyName === 'height' });
    }
    this._blockListTransitionEndCallback = callback;
  }


  _getBlockListFullHeight() {
    return `${this._nodes.blockList.scrollHeight}px`;
  }


  _applyIndentation() {
    if (!this._nodes) { return; }
    this._nodes.blockList.indentation = this._indentation + 1;
  }


  _render() {
    if (!this._nodes || !this._model) { return; }
    this._applyIndentation();
    this._nodes.tagName.textContent = this._model.name;
    this._nodes.id.value = this._model.id;
    this._nodes.classList.model = this._model.classList;
    this._nodes.attributeList.model = this._model.attributeList;
    this._nodes.blockList.model = this._model.children;
  }

}
