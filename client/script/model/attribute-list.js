export class AttributeList {

  constructor(attributes) {
    this._attributes = [...attributes].sort((a, b) => a.compareTo(b));
  }


  list() {
    return this._attributes;
  }


  toString() {
    return this._attributes.map(attribute => attribute.toString()).join('');
  }

}
