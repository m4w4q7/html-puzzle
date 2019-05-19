import { database } from '../database.js';


class Results {

  get _collection() {
    return database.getCollection('results');
  }


  async insertOne(document) {
    const { insertedId } = await this._collection.insertOne(document);
    return insertedId;
  }

}

export const results = new Results();
