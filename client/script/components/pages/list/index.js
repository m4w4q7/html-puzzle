import { ExerciseListGroupComponent } from '../../exercise-list-group/index.js';
import { ExerciseListElementComponent } from '../../exercise-list-element/index.js';
import { AbstractPageComponent } from '../abstract-page/index.js';
import { createTemplate } from './template.js';
import { services } from '../../../services/index.js';

export class ListPageComponent extends AbstractPageComponent {

  constructor() {
    super();
    this._attachShadowedTemplate(createTemplate);
    this._results = {};
    this._exercises = [];
    this._fetchData().then(() => this._render());
  }


  get _viewModel() {
    return this._exercises.reduce((viewModel, group) => {
      return [
        ...viewModel,
        { type: 'group', name: group.name },
        ...group.exercises.map(exercise => ({
          type: 'element',
          name: exercise.name,
          best: this._results[exercise.id]?.record?.timeTaken / 1000 || null,
          rank: this._results[exercise.id]?.rank ?? null,
          totalUsersCompleted: this._results[exercise.id]?.totalUsersCompleted ?? 0,
          exerciseId: exercise.id,
        }))
      ];
    }, []);
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


  async _fetchData() {
    const userId = services.user.getId();
    const [results, exercises] = await Promise.all([
      userId ? services.server.getResults(userId) : Promise.resolve({}),
      services.server.getExercises()
    ]);
    this._results = results;
    this._exercises = exercises;
  }


  static get dependencies() {
    return [ExerciseListGroupComponent, ExerciseListElementComponent];
  }


  static get tagName() {
    return 'hpu-list-page';
  }

}
