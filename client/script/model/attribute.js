export class Attribute {

  constructor(name, value) {
    this.name = name;
    this.value = value;
  }


  compareTo(otherAttribute) {
    if (this.name < otherAttribute.name) { return -1; }
    if (this.name > otherAttribute.name) { return 1; }
    if (this.value < otherAttribute.value) { return -1; }
    if (this.value > otherAttribute.value) { return 1; }
    return 0;
  }


  clone({ name = this.name, value = this.value } = {}) {
    return new Attribute(name, value);
  }


  isEqual(attribute) {
    return this.name === attribute.name && this.value === attribute.value;
  }


  toString() {
    return `[${this.name}="${this.value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"]`;
  }

}
