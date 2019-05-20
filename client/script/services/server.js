import { RequestError } from '../errors/request-error.js';
import { AbstractService } from './abstract-service.js';


export class ServerService extends AbstractService {

  async getUser(name) {
    return this._sendRequest({
      resource: '/api/users',
      query: { name },
      auth: true
    });
  }


  async postUser(id, name) {
    return this._sendRequest({
      resource: '/api/users',
      method: 'POST',
      query: { id },
      body: { name },
      auth: true
    });
  }


  async postResult(exercise, result) {
    return this._sendRequest({
      resource: '/api/results',
      method: 'POST',
      body: { exercise, result },
      auth: true
    });
  }


  async getExercises() {
    return this._sendRequest({
      resource: '/api/exercises'
    });
  }


  async getExerciseById(id) {
    return this._sendRequest({
      resource: `/api/exercises/${id}`
    });
  }


  async signOut() {
    return this._sendRequest({
      resource: '/api/signout'
    });
  }


  async _sendRequest({ resource, method = 'GET', auth, query, body }) {
    const options = { method };
    if (auth) {
      options.credentials = 'same-origin';
    }
    if (body) {
      options.headers = { 'Content-Type': 'application/json' },
      options.body = JSON.stringify(body);
    }
    const queryString = this._getQueryString(query);
    const response = await fetch(`${resource}${queryString}`, options);
    if (!response.ok) { throw new RequestError(response); }
    if (response.status === 200) { return await response.json(); }
  }


  _getQueryString(query) {
    if (!query) { return ''; }
    const queryString = Object.entries(query)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
    return `?${queryString}`;
  }

}
