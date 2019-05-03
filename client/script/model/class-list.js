import { isEqualArray } from '../utils.js';

export class ClassList {

  constructor(classes = []) {
    this._classes = this._unique(classes);
    this._sorted = false;
  }


  list() {
    this._sort();
    return [...this._classes];
  }


  listWithPreview(name) {
    return this._unique([...this._classes, name]).sort();
  }


  add(name) {
    if (this.has(name)) { return; }
    this._sorted = false;
    this._classes.push(name);
  }


  remove(name) {
    this._classes = this._classes.filter(storedName => storedName !== name);
  }


  isEmpty() {
    return !this._classes.length;
  }


  has(name) {
    return this._classes.includes(name);
  }


  clone() {
    return new ClassList(this._classes);
  }


  isEqual(classList) {
    isEqualArray(this.list(), classList.list());
  }


  toString() {
    this._sort();
    return this._classes.map(className => `.${className}`).join();
  }


  _sort() {
    if (this._sorted) { return; }
    this._classes.sort();
    this._sorted = true;
  }


  _unique(list) {
    return [...new Set(list).values()];
  }

}
