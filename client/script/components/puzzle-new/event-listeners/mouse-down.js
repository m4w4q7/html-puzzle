import { isBlock } from '../utils.js';

export class MouseDownListener {

  constructor(host, state) {
    this._host = host;
    this._state = state;
  }


  handleEvent() {
    if (isBlock(this._state.hoveredPiece)) {
      this._state.characterDimensions = this._host.getCharacterDimensions();
    }
    this._state.draggedPiece = this._state.hoveredPiece;
  }

}
