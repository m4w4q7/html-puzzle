import Koa from 'koa';
import mount from 'koa-mount';
import { config } from './config.mjs';
import { clientAssetMiddleware, exercisesMiddleware } from './middlewares/index.mjs';


export class Server {

  constructor() {
    this._app = new Koa();
    this._addMiddlewares();
  }


  listen() {
    this._app.listen(config.port);
    console.log(`Listening on port ${config.port}`);
  }


  _addMiddlewares() {
    this._app.use(mount('/exercise', exercisesMiddleware));
    this._app.use(clientAssetMiddleware);
  }

}
