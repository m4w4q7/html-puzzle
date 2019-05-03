import { ClassList } from './class-list.js';
import { AttributeList } from './attribute-list.js';
import { BlockList } from './block-list.js';

export class Element {

  constructor({
    name = '',
    id = '',
    classList = new ClassList(),
    attributeList = new AttributeList(),
    children = new BlockList()
   } = {}) {
    this._name = name;
    this._id = id;
    this._classList = classList;
    this._attributeList = attributeList;
    this._children = children;
  }


  get name() {
    return this._name;
  }


  get id() {
    return this._id;
  }


  set id(value) {
    this._id = value;
  }


  get classList() {
    return this._classList;
  }


  get attributeList() {
    return this._attributeList;
  }


  get children() {
    return this._children;
  }


  clone() {
    return new Element({
      name: this._name,
      id: this._id,
      classList: this._classList.clone(),
      attributeList: this._attributeList.clone(),
      children: this._children.clone()
    });
  }


  toOldModel() {
    return {
      'type': 'element',
      'tagName': this._name,
      'classList': this._classList.toOldModel(),
      'attributes': this._attributeList.toOldModel(),
      'children': this._children.toOldModel()
    };
  }


  isEqual(element) {
    return this.name === element.name &&
      this.id === element.id &&
      this.classList.isEqual(element.classList) &&
      this.attributeList.isEqual(element.attributeList) &&
      this.children.isEqual(element.children);
  }


  toString() {
    const element = `${this._name}${this._id}${this._classList}${this._attributeList}`;
    const children = this._children.toString().split('\n').map(line => `  ${line}`).join('\n');
    return children.trim() ? `${element}\n${children}` : element;
  }

}
