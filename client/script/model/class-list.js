export class ClassList {

  constructor(classes = []) {
    this._classes = [...classes];
    this._sorted = false;
  }


  list() {
    this._sort();
    return [...this._classes];
  }


  add(name) {
    this._sorted = false;
    this._classes.push(name);
  }


  isEmpty() {
    return !this._classes.length;
  }


  toOldModel() {
    return [...this._classes];
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

}
