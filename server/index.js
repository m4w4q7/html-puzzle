import { database } from './database/database.js';
import { server } from './server.js';

database.connect().then(() => server.listen());
