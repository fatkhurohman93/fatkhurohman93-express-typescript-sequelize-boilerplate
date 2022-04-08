import { Response, Request, NextFunction } from 'express';
import * as User from '@services/user.service';
import { Users } from '@interfaces/index';
import { LANG } from '@utils/index';

export const FindAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = req.body;

  const result = await User.findAll(params);

  res.status(200).json({ message: LANG.success, data: result });
};

export const Update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data: Users = req.body;
  const { userName } = req.params;

  const result = await User.update({ userName, data });

  res.status(200).json({ message: LANG.success, data: result });
};

export const UpdatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { oldPassword, newPassword, userName }: Users = req.body;

  const result = await User.updatePassword(oldPassword, newPassword, userName);

  res.status(200).json({ message: LANG.success, data: result });
};
