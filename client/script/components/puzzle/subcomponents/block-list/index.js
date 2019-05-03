import { AbstractPuzzleSubcomponent } from '../abstract-puzzle-subcomponent/index.js';
import { createTemplate } from './template.js';
import { createElement, clearElement } from '../../../../utils.js';
import { Element } from '../../../../model/element.js';

export class PuzzleBlockListComponent extends AbstractPuzzleSubcomponent {

  constructor() {
    super();
    this._model = null;
    this._indentation = 0;
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
    return this._nodes.blocks.flatMap(block => block.getContainedBlocks());
  }


  releaseBlock(block) {
    const index = this._nodes.blocks.indexOf(block);
    this._nodes.blocks.splice(index, 1);
    this._model.removeByIndex(index);
  }


  adoptBlock(block, previousBlock) {
    const index = this._nodes.blocks.indexOf(previousBlock) + 1;
    this._nodes.blocks.splice(index, 0, block);
    this._model.add(block.model, index);

    this._setupBlock(block);

    previousBlock ?
      previousBlock.insertAdjacentElement('afterend', block) :
      this._nodes.container.insertAdjacentElement('afterbegin', block);
  }


  hostBlockInserter(inserter, nextBlock) {
    this._nodes.container.insertBefore(inserter, nextBlock || null);
  }


  _applyIndentation() {
    if (!this._nodes) { return; }
    this._nodes.blocks.forEach(block => block.indentation = this._indentation);
  }


  _createBlock(block) {
    return createElement(block instanceof Element ? 'hpu-puzzle-element' : 'hpu-puzzle-text', { model: block });
  }


  _setupBlock(block) {
    block.indentation = this._indentation;
    block.parentList = this;
  }


  _render() {
    if (!this._nodes || !this._model) { return; }
    this._nodes.container = clearElement(this._nodes.container);
    this._nodes.blocks = this._model.list().map(blockModel => this._createBlock(blockModel));
    this._nodes.blocks.forEach(block => {
      this._setupBlock(block);
      this._nodes.container.appendChild(block);
    });
  }

}
