import { database } from './database/database.js';
import { server } from './server.js';
import { registerGracefulShutdown } from './utils/register-graceful-shutdown.js';

(async () => {
  await database.connect();
  server.listen();
  registerGracefulShutdown(server, database);
})();
