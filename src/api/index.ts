import { Router } from 'express';
import Auth from '@routers/auth.router';

export default () => {
  const app = Router();

  Auth(app);
 
  return app;
};
