import mongodb from 'mongodb';
import { database } from '../database.js';
import { escapeForRegexp } from '../../utils/escape-for-regexp.js';
const { ObjectID } = mongodb;

class Users {

  get _collection() {
    return database.getCollection('users');
  }


  async getByGoogleId(id) {
    return this._getOne({ googleId: id });
  }


  async getByName(name) {
    return this._getOne({ name });
  }


  async listNamesByPrefix(namePrefix) {
    const nameRegExp = new RegExp(`^${escapeForRegexp(namePrefix)}`);
    const result = await this._collection.find({ name: nameRegExp }, { name: 1 }).toArray();
    return result.map(user => user.name);
  }


  async insertOne(document) {
    const { insertedId } = await this._collection.insertOne(document);
    return insertedId;
  }


  async setNameForId(id, name) {
    const _id = ObjectID.createFromHexString(id);
    await this._collection.update({ _id }, { $set: { name } });
  }


  async _getOne(query) {
    const result = await this._collection.find(query).limit(1).toArray();
    return this._stringifyId(result[0]);
  }


  _stringifyId(entry) {
    return { ...entry, _id: entry._id.toHexString() };
  }

}

export const users = new Users();
