import { database } from '../database.js';
import { escapeForRegexp } from '../../utils/escape-for-regexp.js';

class Users {

  get _collection() {
    return database.getCollection('users');
  }


  async getByGoogleId(id) {
    const result = await this._collection.find({ googleId: id }).limit(1).toArray();
    return result[0];
  }


  async listNamesByPrefix(namePrefix) {
    const nameRegExp = new RegExp(escapeForRegexp(namePrefix));
    return this._collection.find({ name: nameRegExp }, { name: 1 }).toArray();
  }


  async insertOne(document) {
    const { insertedId } = await this._collection.insertOne(document);
    return insertedId;
  }

}

export const users = new Users();
