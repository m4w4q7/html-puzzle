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


  toString() {
    return `[${this.name}="${this.value.replace('\\', '\\\\').replace('"', '\\"')}"]`;
  }

}
