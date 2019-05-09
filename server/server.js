/* eslint-disable no-console */
import Koa from 'koa';
import mount from 'koa-mount';
import { config } from './config.js';
import { clientAssetMiddleware, exercisesMiddleware, authenticationMiddleware } from './middlewares/index.js';


export class Server {

  constructor() {
    this._app = new Koa();
    this._server = null;
    this._addMiddlewares();
  }


  listen() {
    this._server = this._app.listen(config.port);
    console.log(`Listening on port ${config.port}`);
  }


  async close() {
    return new Promise((resolve, reject) => this._server.close(error => error ? reject(error) : resolve()));
  }


  _addMiddlewares() {
    this._app.use(mount('/authenticate', authenticationMiddleware));
    this._app.use(mount('/exercise', exercisesMiddleware));
    this._app.use(clientAssetMiddleware);
  }

}


export const server = new Server();
