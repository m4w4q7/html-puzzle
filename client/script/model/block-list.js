import { Element } from './element.js';

export class BlockList {

  constructor(blocks = []) {
    this._blocks = [...blocks];
  }


  get length() {
    return this._blocks.length;
  }


  add(block, index = this._blocks.length) {
    this._blocks.splice(index, 0, block);
  }


  removeByIndex(index) {
    this._blocks.splice(index, 1);
  }


  list() {
    return [...this._blocks];
  }


  listDeep() {
    return this._blocks.flatMap(block => block instanceof Element ? [block, ...block.children.listDeep()] : [block]);
  }


  indexOf(block) {
    return this._blocks.indexOf(block);
  }


  clone() {
    const blockClones = this._blocks.map(block => block.clone());
    return new BlockList(blockClones);
  }


  toOldModel() {
    return this._blocks.map(block => block.toOldModel());
  }


  toString() {
    return this._blocks.map(block => block.toString()).join('\n');
  }

}
