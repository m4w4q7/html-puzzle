/* eslint-disable no-console */
import { config } from '../config.js';


export const registerGracefulShutdown = (server, database) => {
  setTimeout(shutDownForcefully, config.shutdownTimeout * 1000);
  handledSignals.forEach(signal => process.on(signal, () => {
    console.log(`${signal} recieved. Attempting graceful shutdown...`);
    shutDownGracefully(server, database);
  }));
};


const handledSignals = ['SIGINT', 'SIGTERM'];


const shutDownForcefully = () => {
  console.log(`Graceful shutdown timed out. Shutting down forcefully...`);
  process.exit(1);
};


const shutDownGracefully = async (server, database) => {
  await database.close();
  console.log('Database closed successfully.');
  await server.close();
  console.log('Server closed successfully.');
  console.log('Exiting...');
  process.exit(0);
};
