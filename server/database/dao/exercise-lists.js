import { database } from '../database.js';


class ExerciseLists {

  get _collection() {
    return database.getCollection('exercise-lists');
  }


  async getForSlug(slug) {
    return this._collection.findOne({ slug });
  }
}

export const exerciseLists = new ExerciseLists();
