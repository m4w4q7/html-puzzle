import { AbstractPuzzleSubcomponent } from '../abstract-puzzle-subcomponent/index.js';
import { createTemplate } from './template.js';
import { createElement, clearElement } from '../../../../utils.js';

export class PuzzleBlockListComponent extends AbstractPuzzleSubcomponent {

  constructor() {
    super();
    this._model = null;
    this._indentation = 0;
    this._onBlockChange = this._onBlockChange.bind(this);
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


  static get createTemplate() {
    return createTemplate;
  }


  getContainedBlocks() {
    return this._nodes.blocks.map(block => block.getContainedBlocks()).flat();
  }


  releaseBlock(block) {
    block.removeEventListener('change', this._onBlockChange);
    const index = this._nodes.blocks.indexOf(block);
    this._nodes.blocks.splice(index, 1);
    this._model.splice(index, 1);
    this._emitChange();
  }


  adoptBlock(block, previousBlock) {
    const index = this._nodes.blocks.indexOf(previousBlock) + 1;
    this._nodes.blocks.splice(index, 0, block);
    this._model.splice(index, 0, block.model);

    this._setupBlock(block);

    previousBlock ?
      previousBlock.insertAdjacentElement('afterend', block) :
      this._nodes.container.insertAdjacentElement('afterbegin', block);

    this._emitChange();
  }


  hostBlockInserter(inserter, nextBlock) {
    this._nodes.container.insertBefore(inserter, nextBlock || null);
  }


  _applyIndentation() {
    if (!this._nodes) { return; }
    this._nodes.blocks.forEach(block => block.indentation = this._indentation);
  }


  _createBlock(block) {
    return createElement(block.type === 'element' ? 'hpu-puzzle-element' : 'hpu-puzzle-text', { model: block });
  }


  _onBlockChange(event) {
    const index = this._nodes.blocks.indexOf(event.target);
    this._model.splice(index, 1, event.target.model);
    this._emitChange();
  }


  _emitChange() {
    this.dispatchEvent(new CustomEvent('change'));
  }


  _setupBlock(block) {
    block.addEventListener('change', this._onBlockChange);
    block.indentation = this._indentation;
    block.parentList = this;
  }


  _render() {
    if (!this._nodes || !this._model) { return; }
    this._nodes.container = clearElement(this._nodes.container);
    this._nodes.blocks = this._model.map(blockModel => this._createBlock(blockModel));
    this._nodes.blocks.forEach(block => {
      this._setupBlock(block);
      this._nodes.container.appendChild(block);
    });
  }

}
