/* eslint-disable no-console */
import { database } from './database/database.js';
import { server } from './server.js';
import { registerGracefulShutdown } from './utils/register-graceful-shutdown.js';


Promise.all([database.connect()])
  .then(() => {
    server.listen();
    registerGracefulShutdown(server, database);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
