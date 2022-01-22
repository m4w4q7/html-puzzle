import { ServerService } from './server.js';
import { UserService } from './user.js';
import { ExercisesService } from './exercises.js';


export const services = {
  server: new ServerService(),
  user: new UserService(),
  exercises: new ExercisesService()
};

Object.values(services).forEach(service => {
  service.initialize(services);
});
