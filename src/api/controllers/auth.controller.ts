import { Response, Request, NextFunction } from 'express';
import * as Auth from '@services/auth.service';
import { USER_ROLES, USER_ROLES_NAME } from '@interfaces/index';
import { LANG } from '@utils/index';

export const SignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = req.body;

  const result = await Auth.signUp(params);

  res.status(200).json({ message: LANG.success, data: result });
};

export const SignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = req.body;

  const data = await Auth.signIn(params);

  const authorities = [];

  if (data.flagRoles & USER_ROLES.ROOT) {
    authorities.push(USER_ROLES_NAME.ROOT);
  }
  if (data.flagRoles & USER_ROLES.ADMIN) {
    authorities.push(USER_ROLES_NAME.ADMIN);
  }
  if (data.flagRoles & USER_ROLES.USER) {
    authorities.push(USER_ROLES_NAME.USER);
  }

  const result = {
    name: data.name,
    username: params.username,
    authorities,
    token: data.token,
  };

  res.status(200).json({
    message: LANG.success,
    data: result,
  });
};
