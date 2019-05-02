import { ClassList } from './class-list.js';
import { AttributeList } from './attribute-list.js';
import { BlockList } from './block-list.js';

export class Element {

  constructor({
    name = '',
    id = '',
    classes = new ClassList(),
    attributes = new AttributeList(),
    children = new BlockList()
   } = {}) {
    this._name = name;
    this._id = id;
    this._classes = classes;
    this._attributes = attributes;
    this._children = children;
  }


  get children() {
    return this._children;
  }


  toOldModel() {
    return {
      'type': 'element',
      'tagName': this._name,
      'classList': this._classes.toOldModel(),
      'attributes': this._attributes.toOldModel(),
      'children': this._children.toOldModel()
    };
  }


  toString() {
    const element = `${this._name}${this._id}${this._classes}${this._attributes}`;
    const children = this._children.toString().split('\n').map(line => `  ${line}`).join('\n');
    return children.trim() ? `${element}\n${children}` : element;
  }

}
