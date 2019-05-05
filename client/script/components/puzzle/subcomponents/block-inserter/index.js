import { AbstractPuzzleSubcomponent } from '../abstract-puzzle-subcomponent/index.js';
import { createTemplate } from './template.js';
import { clearElement, createElement, getLast } from '../../../../utils.js';

export class PuzzleBlockInserterComponent extends AbstractPuzzleSubcomponent {

  constructor() {
    super();
    this._subject = null;
    this._indentation = 0;
    this._isMoving = false;
    this._removeUnnecessaryIndentations = this._removeUnnecessaryIndentations.bind(this);
  }


  static get createTemplate() {
    return createTemplate;
  }


  connectedCallback() {
    if (super.connectedCallback()) {
      this._nodes.positioner.addEventListener('transitionend', this._removeUnnecessaryIndentations);
    } else {
      this._removeUnnecessaryIndentations();
    }
  }


  setSubject(subject) {
    this._nodes.positioner = clearElement(this._nodes.positioner);
    this._nodes.positioner.addEventListener('transitionend', this._removeUnnecessaryIndentations);
    this._nodes.positioner.appendChild(subject);
  }


  setIndentation(indentation) {
    if (indentation === this._indentation) { return; }
    this._renderMissingIndentations(indentation);
    this._nodes.positioner.style.left = `${indentation * 2}ch`;
    this._indentation = indentation;
  }


  _renderMissingIndentations(indentation) {
    const renderedIndentationDifference = indentation - this._nodes.indentations.length;
    if (renderedIndentationDifference > 0) {
      const missingIndentations = this._createIndentations(renderedIndentationDifference);
      const nextIndentationParent = getLast(this._nodes.indentations) || this._nodes.indentationContainer;
      nextIndentationParent.appendChild(missingIndentations[0]);
      this._nodes.indentations.push(...missingIndentations);
    }
  }


  _createIndentations(count) {
    const indentations = new Array(count).fill()
      .map(() => createElement('div', { className: 'hpu-puzzle-block-inserter__indentation' }));
    indentations.reduce((previous, current) => previous.appendChild(current));
    return indentations;
  }


  _removeUnnecessaryIndentations() {
    const unnecessaryIndentations = this._nodes.indentations.length - this._indentation;
    if (unnecessaryIndentations <= 0) { return; }
    this._nodes.indentations.splice(this._indentation)[0].remove();
  }


  static get tagName() {
    return 'hpu-puzzle-block-inserter';
  }

}
