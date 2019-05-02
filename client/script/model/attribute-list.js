export class AttributeList {

  constructor(attributes = []) {
    this._attributes = [...attributes];
    this._sorted = false;
  }


  list() {
    this._sort();
    return [...this._attributes];
  }


  add(attribute) {
    this._sorted = false;
    this._attributes.push(attribute);
  }


  toOldModel() {
    return this._attributes.map(attribute => attribute.toOldModel());
  }


  toString() {
    this._sort();
    return this._attributes.map(attribute => attribute.toString()).join('');
  }


  _sort() {
    if (this._sorted) { return; }
    this._attributes.sort((a, b) => a.compareTo(b));
    this._sorted = true;
  }

}
