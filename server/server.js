const { join } = require('path');
const Koa = require('koa');
const createStaticMiddleware = require('koa-static');
const mount = require('koa-mount');
const config = require('./config');


class Server {

  constructor() {
    this._app = new Koa();
    this._addMiddlewares();
  }


  listen() {
    this._app.listen(config.port);
    console.log(`Listening on port ${config.port}`);
  }


  _addMiddlewares() {
    const clientRoot = join(__dirname, '../client');
    this._app.use(createStaticMiddleware(clientRoot));

    const exercisesRoot = join(__dirname, '../exercises');
    this._app.use(mount('/exercise', createStaticMiddleware(exercisesRoot)));
  }

}


module.exports = Server;
