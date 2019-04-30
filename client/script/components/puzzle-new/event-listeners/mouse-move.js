import { dragStates } from '../enums.js';

export class MouseMoveListener {

  constructor(host, state) {
    this._host = host;
    this._state = state;
  }


  handleEvent(event) {
    if (this._state.dragState !== dragStates.drag) { return; }
    const cursorPosition = this._calculateCursorPosition(event);
    this._updateCursorPosition(cursorPosition);
  }


  _calculateCursorPosition({ clientX, clientY }) {
    const { left, top } = this._host.getBoundingClientRect();
    const { height, width } = this._state.characterDimensions;
    const line = Math.floor((clientY - top) / height);
    const character = Math.floor((clientX - left) / width);
    return { line, character };
  }


  _updateCursorPosition(newValue) {
    const oldValue = this._state.cursorPosition;
    if (oldValue.line === newValue.line && oldValue.character === newValue.character) { return; }
    this._state.cursorPosition = newValue;
  }

}
