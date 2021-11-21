import { ExerciseListGroupComponent } from '../../exercise-list-group/index.js';
import { ExerciseListElementComponent } from '../../exercise-list-element/index.js';
import { AbstractPageComponent } from '../abstract-page/index.js';
import { createTemplate } from './template.js';

export class ListPageComponent extends AbstractPageComponent {

  constructor() {
    super();
    this._attachShadowedTemplate(createTemplate);
    this._render();
  }


  get _viewModel() {
    return [
      { type: 'group', name: 'Basic components' },
      { type: 'element', name: 'Dropdown', best: null, rank: null, totalUsersCompleted: 0, exerciseId: 'dropdown' },
      { type: 'element', name: 'Emptystate', best: 575, rank: 1, totalUsersCompleted: 2, exerciseId: 'emptystate' },
      { type: 'element', name: 'Basic Card', best: null, rank: null, totalUsersCompleted: 1, exerciseId: 'basic-card' },
      { type: 'group', name: 'Advanced' },
      { type: 'element', name: 'Complex Card', best: null, rank: null, totalUsersCompleted: 0, exerciseId: 'complex-card' },
      { type: 'element', name: 'Navigation bar', best: null, rank: null, totalUsersCompleted: 0, exerciseId: 'navigation-bar' },
      { type: 'group', name: 'Pages' },
      { type: 'element', name: 'Card Grid page', best: null, rank: null, totalUsersCompleted: 0, exerciseId: 'card-grid-page' },
    ];
  }


  _render() {
    const rowComponentsContainer = document.createDocumentFragment();
    this._viewModel
      .map(row => {
        const componentName = row.type === 'element' ? 'hpu-exercise-list-element' : 'hpu-exercise-list-group';
        const component = document.createElement('tr', { is: componentName });
        return Object.assign(component, row);
      })
      .forEach(component => rowComponentsContainer.appendChild(component));
    this._nodes.list.textContent = '';
    this._nodes.list.appendChild(rowComponentsContainer);
  }


  static get dependencies() {
    return [ExerciseListGroupComponent, ExerciseListElementComponent];
  }


  static get tagName() {
    return 'hpu-list-page';
  }

}
