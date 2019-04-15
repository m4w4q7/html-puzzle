const { join } = require('path');
const Koa = require('koa');
const createStaticMiddleware = require('koa-static');
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
    const staticRoot = join(__dirname, '../client');
    this._app.use(createStaticMiddleware(staticRoot));
  }

}


module.exports = Server;
