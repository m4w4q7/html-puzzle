/* eslint-disable no-console */
import { config } from '../config.js';


export const registerGracefulShutdown = (server, database) => {
  handledSignals.forEach(signal => process.on(signal, () => {
    console.log(`${signal} recieved. Attempting graceful shutdown...`);
    shutDownGracefully(server, database);
    setTimeout(shutDownForcefully, config.shutdownTimeout * 1000);
  }));
};


const handledSignals = ['SIGINT', 'SIGTERM'];


const shutDownGracefully = async (server, database) => {
  await database.close();
  console.log('Database closed successfully');
  await server.close();
  console.log('Server closed successfully');
  console.log('Exiting...');
  process.exit(0);
};


const shutDownForcefully = () => {
  console.log(`Graceful shutdown timed out. Shutting down forcefully...`);
  process.exit(1);
};
