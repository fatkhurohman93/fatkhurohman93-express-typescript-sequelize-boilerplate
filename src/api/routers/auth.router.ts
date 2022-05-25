import { Router } from 'express';
import { SignUp, SignIn } from '@controllers/auth.controller';
import { catchAsync } from '@utils/index';
import { ROUTES, ROUTES_AUTH } from '@interfaces/index';
import { verifyUser } from '@api/middlewares/jwt/auth.jwt';

const router = Router();

export default (app: Router) => {
  app.use(ROUTES.auth, router);
  router.route(ROUTES_AUTH.signUp).post(verifyUser, catchAsync(SignUp));
  router.route(ROUTES_AUTH.signIn).post(catchAsync(SignIn));
};
