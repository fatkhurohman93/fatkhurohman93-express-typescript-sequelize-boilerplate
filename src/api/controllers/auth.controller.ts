import { Response, Request, NextFunction } from 'express';
import * as Auth from '../../services/auth.service';
import ROLES from '../../configs/flagRole.config';
import logger from '../../loaders/logger';
export const SignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = req.body;

  const result = await Auth.signUp(params);

  res.status(200).json({ message: 'success', data: result });
};

export const SignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = req.body;

  const data = await Auth.signIn(params);

  const authorities = [];

  if (data.flagRoles & ROLES.ROOT) {
    authorities.push('ROLE_ROOT');
  }
  if (data.flagRoles & ROLES.ADMIN) {
    authorities.push('ROLE_ADMIN');
  }
  if (data.flagRoles & ROLES.USER) {
    authorities.push('ROLE_USER');
  }

  const result = {
    name: data.name,
    username: params.username,
    authorities,
    token:data.token
  };

  res.status(200).json({
    message: 'success',
    data: result,
  });
};
