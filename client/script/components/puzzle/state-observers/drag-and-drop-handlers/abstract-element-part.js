import { PieceTypes } from '../../../../enums/piece-types.js';
import { AbstractDragAndDropHandler } from './abstract-drag-and-drop-handler.js';
import { HighlightColors } from '../../enums.js';


export class AbstractElementPartDragAndDropHandler extends AbstractDragAndDropHandler {

  observe() {
    super.observe();
    this._state.observe(['cursorPosition', 'line'], this._onLineChange, this);
    this._highlightedElement = null;
  }


  _onLineChange(line) {
    if (!this._draggedPiece || !this._isRelevantPiece(this._draggedPiece)) { return; }
    const targetBlock = this._host.getBlock(line);
    if (targetBlock.pieceType === PieceTypes.TEXT) { return; }
    this._highlightLine(targetBlock);
    this._onDragMove(targetBlock);
  }


  _highlightLine(element) {
    if (this._highlightedElement) { this._highlightedElement.highlight(HighlightColors.NONE); }
    if (element) { element.highlight(HighlightColors.CONTAINER); }
    this._highlightedElement = element;
  }


  _onDragStart(draggedPiece) {
    this._highlightLine(draggedPiece.elementHost);
  }


  _onDragMove(targetElement) {
    this._highlightLine(targetElement);
  }


  _onDragEnd(draggedPiece) {
    this._highlightLine(null);
  }

}
