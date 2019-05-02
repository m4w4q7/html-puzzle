export class BlockList {

  constructor(blocks = []) {
    this._blocks = blocks;
  }


  add(block) {
    this._blocks.push(block);
  }


  list() {
    return [...this._blocks];
  }


  toOldModel() {
    return this._blocks.map(block => block.toOldModel());
  }


  toString() {
    return this._blocks.map(block => block.toString()).join('\n');
  }

}
