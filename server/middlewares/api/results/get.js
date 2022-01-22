import { records } from '../../../database/dao/records.js';
import { exerciseLists } from '../../../database/dao/exercise-lists.js';


class GetResultsAction {

  constructor(context) {
    this._context = context;
    this._userId = context.state.user.userId;
  }


  async execute() {
    this._validateRequest();
    const listSlug = this._context.query['list_slug'] || null;
    const exerciseList = await exerciseLists.getForSlug(listSlug);
    const exerciseIds = exerciseList.exerciseGroups.map(({ exercises }) => exercises).flat();

    const results = this._createEmptyResults(exerciseIds);
    const userRecords = await records.list(this._userId, exerciseIds);
    this._decoreateResultsWithUserRecords(results, userRecords);
    await this._decoreateResultsWithRanks(results, userRecords);
    await this._decoreateResultsWithTotalUsersCompleted(results, exerciseIds);
    return this._context.body = results;
  }


  _validateRequest() {
    if (!this._context.query['user_id']) { this._context.throw(400); }
    if (this._context.query['user_id'] !== this._context.state.user.userId) { this._context.throw(401); }
  }


  _createEmptyResults(exerciseIds) {
    return exerciseIds.reduce((results, exerciseId) => Object.assign(results, {
      [exerciseId]: {
        record: null,
        rank: null,
        totalUsersCompleted: 0
      }
    }), {});
  }


  _decoreateResultsWithUserRecords(results, userRecords) {
    userRecords.forEach(record => results[record.exercise.id].record = record.result);
  }


  async _decoreateResultsWithRanks(results, userRecords) {
    const betterUsers = await records.countBetterRecordsPerExercise(userRecords);
    betterUsers.forEach(exercise => {
      results[exercise.exerciseId].rank = results[exercise.exerciseId].record ?
        exercise.betterUsers + 1 :
        null;
    });

    Object.values(results).forEach(result => {
      if (result.record && !result.rank) { result.rank = 1; }
    });
  }


  async _decoreateResultsWithTotalUsersCompleted(results, exerciseIds) {
    const totalRecordPerExercise = await records.countTotalRecordsPerExercise(exerciseIds);
    totalRecordPerExercise.forEach(exercise => results[exercise.exerciseId].totalUsersCompleted = exercise.totalUsers);
  }

}


export default context => new GetResultsAction(context).execute();
