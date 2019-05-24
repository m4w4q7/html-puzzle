import { results } from '../../../database/dao/results.js';
import { records } from '../../../database/dao/records.js';


class PostResultAction {

  constructor(context) {
    this._context = context;
    this._exerciseId = context.request.body.exercise.id;
    this._hintsUsed = parseInt(context.request.body.result.hintsUsed);
    this._timeTaken = parseInt(context.request.body.result.timeTaken);
    this._userId = context.state.user.userId;
  }


  async execute() {
    this._validateRequest();
    const newDocument = this._createNewDocument();
    await results.insertOne({ ...newDocument });
    if (await this._isRecord()) {
      await records.set({ ...newDocument });
    }
    this._context.status = 204;
  }


  _validateRequest() {
    if (!this._exerciseId || isNaN(this._hintsUsed) || isNaN(this._timeTaken)) {
      this._context.throw(400);
    }
  }


  _createNewDocument() {
    return {
      exercise: { id: this._exerciseId },
      user: { id: this._userId },
      result: {
        hintsUsed: this._hintsUsed,
        timeTaken: this._timeTaken
      },
      createdAt: new Date()
    };
  }


  async _isRecord() {
    const currentRecord = await records.getOne(this._userId, this._exerciseId);
    return !currentRecord ||
      this._hintsUsed < currentRecord.result.hintsUsed ||
      (this._hintsUsed === currentRecord.result.hintsUsed && this._timeTaken < currentRecord.result.timeTaken);
  }

}


export default context => new PostResultAction(context).execute();
