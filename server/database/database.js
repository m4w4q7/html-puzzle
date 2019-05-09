import mongodb from 'mongodb';
import { config } from '../config.js';


export class Database {

  _connectionString = '';
  _client = null;
  _db = null;


  constructor(connectionString) {
    this._connectionString = connectionString;
  }


  getCollection(name) {
    if (!this._client) { throw new Error('Database not connected!');}
    return this._client.db().collection(name);
  }


  async connect() {
    if (this._client) { return; }
    this._client = await mongodb.MongoClient.connect(this._connectionString);
    this._db = this._client.db();
  }


  async close() {
    await this._client.close();
  }

}


export const database = new Database(config.mongodbUri);
