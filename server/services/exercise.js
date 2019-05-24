import { join } from 'path';
import { readJSON, readFile } from '../utils/read.js';
import { pathFromLocation } from '../utils/path-from-location.js';

const root = pathFromLocation(import.meta, '../../exercises');


class ExerciseService {

  constructor() {
    this._exercises = {};
    this._exerciseList = [];
  }


  async initialize() {
    const exercisesJSON = await readJSON(join(root, 'index.json'));
    this._exercises = await this._readExerciseService(exercisesJSON);
    this._exerciseList = this._getExerciseList(exercisesJSON);
    this._exerciseIdsList = Object.keys(this._exercises);
  }


  get(id) {
    return this._exercises[id];
  }


  list() {
    return this._exerciseList;
  }


  listIds() {
    return this._exerciseIdsList;
  }


  async _readExerciseService(exercisesJSON) {
    const exerciseIds = exercisesJSON.map(group => group.exercises).flat();
    const flatExercisesWithData = await Promise.all(exerciseIds.map(this._readExerciseDataForId));
    return Object.assign(...flatExercisesWithData);
  }


  async _readExerciseDataForId(id) {
    const exerciseData = await readJSON(join(root, id, 'index.json'));
    const pug = await readFile(join(root, id, exerciseData.pug));
    return { [id]: { ...exerciseData, pug, id } };
  }


  _getExerciseList(exercisesJSON) {
    return exercisesJSON.map(group => ({
      ...group,
      exercises: group.exercises.map(id => ({
        id,
        name: this._exercises[id].name
      }))
    }));
  }

}


export const exerciseService = new ExerciseService();
