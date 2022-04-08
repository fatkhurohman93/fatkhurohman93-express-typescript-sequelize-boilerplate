import { Router } from 'express';
import { FindAll, Update, UpdatePassword } from '@controllers/user.controller';
import { catchAsync } from '@utils/index';
import { ROUTES, ROUTES_USER } from '@interfaces/index';

const router = Router();

export default (app: Router) => {
  app.use(ROUTES.user, router);
  router.route(ROUTES_USER.findAll).post(catchAsync(FindAll));
  router.route(ROUTES_USER.update).put(catchAsync(Update));
  router.route(ROUTES_USER.updatePassword).put(catchAsync(UpdatePassword));
};
