import { Router } from 'express';
import Auth from '@routers/auth.router';
import User from '@routers/user.router';
import Category from '@routers/category.router';

export default () => {
  const app = Router();

  Auth(app);
  User(app);
  Category(app)

  return app;
};
