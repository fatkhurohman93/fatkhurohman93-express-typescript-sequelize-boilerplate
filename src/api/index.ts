import { Router } from 'express';
import Auth from '@routers/auth.router';
import User from '@routers/user.router';

export default () => {
  const app = Router();

  Auth(app);
  User(app);

  return app;
};
