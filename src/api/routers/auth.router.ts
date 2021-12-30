import { Router } from 'express';
import { SignUp, SignIn } from '@controllers/auth.controller';
import catchAsync from '@utils/catchAsync';


const router = Router();

export default (app: Router) => {
  app.use('/auth', router);
  router.route('/signup').post(catchAsync(SignUp));
  router.route('/signin').post(catchAsync(SignIn));

};
