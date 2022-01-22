import { AbstractService } from './abstract-service.js';


export class ExercisesService extends AbstractService {

  constructor() {
    super();
    this._list = null;
    this._exercises = null;
  }


  initialize(services) {
    this._serverService = services.server;
  }


  async getGroups() {
    await this._loadList();
    return this._list.exerciseGroups;
  }


  async getById(id) {
    await this._loadList();
    return this._exercises[id];
  }


  async _loadList() {
    if (this._list) { return; }
    this._list = await this._serverService.getExercises();
    this._exercises = this._calculateExercisesDictionary(this._list);
  }


  _calculateExercisesDictionary(list) {
    return Object.fromEntries(
      list.exerciseGroups
        .map(({ exercises }) => exercises)
        .flat()
        .map(exercise => [exercise._id, exercise])
    );
  }
}
