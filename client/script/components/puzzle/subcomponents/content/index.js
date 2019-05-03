import { AbstractPuzzleSubcomponent } from '../abstract-puzzle-subcomponent/index.js';
import { createTemplate } from './template.js';
import { getListDifference } from '../../utils.js';
import { PieceTypes } from '../../../../enums/piece-types.js';
import { minMax } from '../../../../utils.js';

export class PuzzleContentComponent extends AbstractPuzzleSubcomponent {

  constructor() {
    super();
    this._model = null;
    this._inserter = {
      subject: null,
      notDraggedBlocks: null,
      line: null,
      minIndentation: null,
      maxIndentation: null,
      relativeIndentation: null
    };
  }


  static get createTemplate() {
    return createTemplate;
  }


  get model() {
    return this._model;
  }


  set model(model) {
    this._model = model;
    this._render();
  }


  get blockListComponent() {
    return this._nodes.blockList;
  }


  getBlockByPath(path) {
    return this._nodes.blockList.getBlockByPath(path);
  }


  getCharacterDimensions() {
    if (!this._nodes) { return { width: 0, height: 0 }; }
    const { width, height } = this._nodes.characterSpecimen.getBoundingClientRect();
    return { width, height };
  }


  getBlock(index) {
    return this._nodes.blockList.getContainedBlocks()[index];
  }


  showBlockInserter(subject) {
    const blocks = this._nodes.blockList.getContainedBlocks();
    const line = blocks.indexOf(subject);
    this._inserter.subject = subject;
    this._inserter.notDraggedBlocks = getListDifference(blocks, subject.getContainedBlocks());

    this.moveBlockInserter(line, subject.indentation);

    subject.parentList.releaseBlock(subject);
    this._nodes.blockInserter.setSubject(subject);
  }


  moveBlockInserter(line, indentation) {
    this._updateBlockInserterIndentationBoundaries(line);
    this._setBlockInserterIndentation(indentation);
    this._moveBlockInserterToLine(line);
  }


  adoptBlockInserterSubject() {
    const { parent, previousSibling } = this._getNewParentAndPreviousSiblingForBlockInserterSubject();
    const adopter = parent || this._nodes.blockList;
    adopter.adoptBlock(this._inserter.subject, previousSibling);
    this._nodes.blockInserter.remove();
    this._clearInserter();
  }


  emitChange() {
    this.dispatchEvent(new CustomEvent('change'));
  }


  _updateBlockInserterIndentationBoundaries(line) {
    if (line === this._inserter.line) { return; }
    const previousBlock = this._inserter.notDraggedBlocks[line - 1];
    const nextBlock = this._inserter.notDraggedBlocks[line];
    this._inserter.minIndentation = nextBlock ? nextBlock.indentation : 0;
    this._inserter.maxIndentation = previousBlock ?
      previousBlock.indentation + (previousBlock.pieceType === PieceTypes.ELEMENT ? 1 : 0) :
      0;
  }


  _setBlockInserterIndentation(indentation) {
    const validIndentation = minMax(indentation, this._inserter.minIndentation, this._inserter.maxIndentation);
    this._inserter.relativeIndentation = Math.max(0, validIndentation - this._inserter.minIndentation);
    this._nodes.blockInserter.setIndentation(this._inserter.relativeIndentation);
  }


  _moveBlockInserterToLine(line) {
    if (line === this._inserter.line) { return; }
    const nextBlock = this._inserter.notDraggedBlocks[line];
    const inserterParentList = nextBlock ? nextBlock.parentList : this._nodes.blockList;
    inserterParentList.hostBlockInserter(this._nodes.blockInserter, nextBlock);
    this._inserter.line = line;
  }


  _getNewParentAndPreviousSiblingForBlockInserterSubject() {
    const inserterIndentation = this._inserter.minIndentation + this._inserter.relativeIndentation;
    const blocksBeforeInserter = this._nodes.blockList.getContainedBlocks().slice(0, this._inserter.line);

    let parent = null, previousSibling = null;
    for (let block of blocksBeforeInserter) {
      if (block.indentation === inserterIndentation) {
        previousSibling = block;
      } else if (block.indentation === inserterIndentation - 1) {
        previousSibling = null;
        parent = block;
      }
    }
    return { parent, previousSibling };
  }


  _clearInserter() {
    this._inserter = { subject: null, notDraggedBlocks: null, line: null, minIndentation: null, maxIndentation: null };
  }


  _render() {
    if (!this._nodes || !this._model) { return; }
    this._nodes.blockList.model = this._model;
  }

}
