import { AbstractService } from './abstract-service.js';


export class UserService extends AbstractService {

  constructor() {
    super();
    this._session = null;
  }


  initialize(services) {
    this._serverService = services.server;
    this._session = this._getSession();
  }


  isAuthenticated() {
    return this._session && Date.now() < this._session.expires;
  }


  getName() {
    return this.isAuthenticated() ? this._session.user.name : null;
  }


  getId() {
    return this.isAuthenticated() ? this._session.user.id : null;
  }


  signIn() {
    location.assign('/authenticate/google/login');
  }


  async isNameFree(name) {
    const { found } = await this._serverService.getUser(name);
    return !found;
  }


  async changeName(newName) {
    if (!this.isAuthenticated()) { throw new Error('Invalid session!'); }
    await this._serverService.postUser(this.getId(), newName);
    this._session.user.name = newName;
    localStorage.setItem('session', JSON.stringify(this._session));
    this._emit('nameChange');
  }


  async signOut() {
    localStorage.removeItem('session');
    this._session = null;
    this._emit('nameChange');
    return this._serverService.signOut();
  }


  _getSession() {
    const session = localStorage.getItem('session');
    return session && JSON.parse(session);
  }

}
