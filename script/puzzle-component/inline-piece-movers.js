import { addClass, getId, addId } from './tag-manipulations.js';
import { dragTypes } from './enums.js';

export const createForType = (type, piece, host) => {
  if (type === dragTypes.id) { return new IdMover(piece, host); }
  if (type === dragTypes.class) { return new ClassMover(piece); }
  return { move() {} };
};


class IdMover {

  constructor(piece, host) {
    this._piece = piece;
    this._host = host;
    this._lastTargetTag = null;
    this._lastTargetTagId = null;
  }

  move(tag) {
    if (this._lastTargetTagId) { addId(this._lastTargetTag, this._lastTargetTagId); }
    this._lastTargetTag = tag;
    this._lastTargetTagId = getId(tag);
    if (this._lastTargetTagId) { addId(this._host, this._lastTargetTagId); }
    addId(tag, this._piece);
  }

}


class ClassMover {

  constructor(piece) {
    this._piece = piece;
  }


  move(tag) {
    addClass(tag, this._piece);
  }
}
