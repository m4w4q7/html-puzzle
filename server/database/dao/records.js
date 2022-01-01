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
      { 'user.id': result.user.id, 'exercise.id': result.exercise.id },
      { ...result },
      { upsert: true }
    );
  }


  async list(userId, exerciseIds) {
    return this._collection.find(
      { 'user.id': userId, 'exercise.id': { $in: exerciseIds } },
    ).toArray();
  }


  async countBetterRecordsPerExercise(records) {
    if (!records.length) { return []; }
    const matcherDisjunctions = records.reduce(this._addBetterThanRecordCondition, []);
    return await this._collection.aggregate([
      { $match: { $or: matcherDisjunctions } },
      { $group: { _id: { exerciseId: '$exercise.id' }, betterUsers: { $sum: 1 } } },
      { $project: { exerciseId: '$_id.exerciseId', betterUsers: '$betterUsers', _id: 0 } }
    ]).toArray();
  }


  async countTotalRecordsPerExercise(exerciseIds) {
    return await this._collection.aggregate([
      { $match: { 'exercise.id': { $in: exerciseIds } } },
      { $group: { _id: { exerciseId: '$exercise.id' }, totalUsers: { $sum: 1 } } },
      { $project: { exerciseId: '$_id.exerciseId', totalUsers: '$totalUsers', _id: 0 } }
    ]).toArray();
  }


  _addBetterThanRecordCondition(conditions, record) {
    conditions.push({
      'exercise.id': record.exercise.id,
      $or: [
        { 'result.hintsUsed': { $lt: record.result.hintsUsed } },
        { 'result.hintsUsed': record.result.hintsUsed, 'result.timeTaken': { $lt: record.result.timeTaken } }
      ]
    });
    return conditions;
  }

}

export const records = new Records();
