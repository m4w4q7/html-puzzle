export class AttributeList {

  constructor(attributes) {
    this._attributes = [...attributes].sort((a, b) => a.compareTo(b));
  }


  list() {
    return this._attributes;
  }


  toOldModel() {
    return this._attributes.map(attribute => attribute.toOldModel());
  }


  toString() {
    return this._attributes.map(attribute => attribute.toString()).join('');
  }

}
