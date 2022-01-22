import { database } from '../database.js';


class Exercises {

  get _collection() {
    return database.getCollection('exercises');
  }


  async getByIds(ids) {
    return this._collection.find({ _id: { $in: ids } }).toArray();
  }
}

export const exercises = new Exercises();
