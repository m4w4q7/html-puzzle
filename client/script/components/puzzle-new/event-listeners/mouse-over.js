import { findAncestor } from '../utils.js';
import { AbstractPuzzlePiece } from '../subcomponents/abstract-puzzle-piece/index.js';

export class MouseOverListener {

  constructor(host, state) {
    this._host = host;
    this._state = state;
  }


  handleEvent({ target }) {
    this._state.hoveredPiece = findAncestor(target, this._host, this._isPuzzlePiece);
  }


  _isPuzzlePiece(element) {
    return element.tagName.toUpperCase().indexOf('HPU-') === 0 && element instanceof AbstractPuzzlePiece;
  }

}
