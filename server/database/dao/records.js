import { database } from '../database.js';


class Records {

  get _collection() {
    return database.getCollection('records');
  }


  async getOne(userId, exerciseId) {
    return this._collection.findOne({ 'user.id': userId, 'exercise.id': exerciseId });
  }


  async set(result) {
    await this._collection.findOneAndReplace(
      { user: { id: result.user.id }, exercise: { id: result.exercise.id } },
      { ...result },
      { upsert: true }
    );
  }

}

export const records = new Records();
