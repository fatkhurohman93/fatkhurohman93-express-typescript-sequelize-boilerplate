import { Response, Request, NextFunction } from 'express';
import * as Auth from '@services/auth.service';
import { USER_ROLES, USER_ROLES_NAME } from '@interfaces/index';
import { LANG, setupAuthorities } from '@utils/index';

export const SignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = req.body;
  const userName = req.headers.userName as string

  const result = await Auth.signUp(params, userName);

  res.status(200).json({ message: LANG.success, data: result });
};

export const SignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = req.body;

  const data = await Auth.signIn(params);

  const authorities = setupAuthorities(data.flagRoles)

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
