import { join } from 'path';
import Koa from 'koa';
import createStaticMiddleware from 'koa-static';
import mount from 'koa-mount';
import { config } from './config.mjs';
import { fileURLToPath } from 'url';


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
    const clientRoot = join(dirname, '../client');
    this._app.use(createStaticMiddleware(clientRoot));

    const exercisesRoot = join(dirname, '../exercises');
    this._app.use(mount('/exercise', createStaticMiddleware(exercisesRoot)));
  }

}


const dirname = join(fileURLToPath(import.meta.url), '..');
