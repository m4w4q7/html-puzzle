export class ClassList {

  constructor(classes) {
    this._classes = [...classes].sort();
  }


  list() {
    return this._classes;
  }


  toString() {
    return this._classes.map(className => `.${className}`).join();
  }

}
