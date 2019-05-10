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
    return this._session && this._session.expires < Date.now();
  }


  getName() {
    return this.isAuthenticated() ? this._session.user.name : null;
  }


  signIn() {
    location.assign('/authenticate/google/login');
  }


  async isNameFree(name) {
    const { found } = await this._serverService.getUser(name);
    return !found;
  }


  async changeName(newName) {
    return this._serverService.postUser(this._getId(), newName);
  }


  async signOut() {
    localStorage.removeItem('session');
    return this._serverService.signOut();
  }


  _getSession() {
    const session = localStorage.getItem('session');
    return session && JSON.parse(session);
  }


  _getId() {
    return this.isAuthenticated() ? this._session.user.id : null;
  }

}
