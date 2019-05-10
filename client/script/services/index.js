import { ServerService } from './server.js';
import { UserService } from './user.js';


export const services = {
  server: new ServerService(),
  user: new UserService(),
};

Object.values(services).forEach(service => {
  service.initialize(services);
});
