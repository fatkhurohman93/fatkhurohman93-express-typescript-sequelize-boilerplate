import { Router } from 'express';
import {
  Create,
  FindAll,
  FindOne,
  Update,
} from '@controllers/category.controller';
import { catchAsync } from '@utils/index';
import { ROUTES, ROUTES_CATEGORY } from '@interfaces/index';
import {
  verifyToken,
  isRoot,
  isAdmin,
  isUser,
} from '@api/middlewares/jwt/auth.jwt';

const router = Router();

export default (app: Router) => {
  app.use(ROUTES.category, router);
  router
    .route(ROUTES_CATEGORY.create)
    .post(verifyToken, isAdmin, catchAsync(Create));
  router
    .route(ROUTES_CATEGORY.findAll)
    .post(verifyToken, isUser, catchAsync(FindAll));
  router
    .route(ROUTES_CATEGORY.findOne)
    .post(verifyToken, isUser, catchAsync(FindOne));
  router
    .route(ROUTES_CATEGORY.update)
    .put(verifyToken, isAdmin, catchAsync(Update));
};
