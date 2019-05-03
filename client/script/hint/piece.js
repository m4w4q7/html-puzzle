import { isEqualArray } from '../utils.js';

export class Piece {

  constructor(type, value, path) {
    this.type = type;
    this.value = value;
    this.path = path;
  }


  isSame(reference) {
    return this.type === reference.type && this.value === reference.value;
  }


  isInCorrectPlace(reference) {
    return isEqualArray(this.path, reference.path);
  }

}
