export class AttributeList {

  constructor(attributes = []) {
    this._attributes = [...attributes];
    this._isNormalized = false;
  }


  list() {
    this._normalizeAttributes();
    return [...this._attributes];
  }


  listNames() {
    this._normalizeAttributes();
    return this._attributes.map(attribute => attribute.name);
  }


  listWithPreview(preview) {
    return this._normalize([...this._attributes, preview]);
  }


  has(name) {
    return !!this.getByName(name);
  }


  getByName(name) {
    this._normalizeAttributes();
    return this._attributes.find(attribute => attribute.name === name);
  }


  add(attribute) {
    this._isNormalized = false;
    this._attributes.push(attribute);
  }


  removeByName(name) {
    this._attributes = this._attributes.filter(attribute => attribute.name !== name);
  }


  clone() {
    this._normalizeAttributes();
    const attributeColnes = this._attributes.map(attribute => attribute.clone());
    return new AttributeList(attributeColnes);
  }


  toOldModel() {
    this._normalizeAttributes();
    return this._attributes.map(attribute => attribute.toOldModel());
  }


  toString() {
    this._normalizeAttributes();
    return this._attributes.map(attribute => attribute.toString()).join('');
  }


  _normalizeAttributes() {
    if (this._isNormalized) { return; }
    this._attributes = this._normalize(this._attributes);
    this._isNormalized = true;
  }


  _normalize(attributes) {
    return this._sort(this._unique(attributes));
  }


  _unique(attributes) {
    return [...new Map(attributes.map(attribute => [attribute.name, attribute])).values()];
  }


  _sort(attributes) {
    return attributes.sort((a, b) => a.compareTo(b));
  }

}
