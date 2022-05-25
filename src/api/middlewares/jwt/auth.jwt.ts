import jwt from 'jsonwebtoken';
import secret from '@configs/secret.config';
import * as User from '@services/user.service';
import { Response, NextFunction, Request } from 'express';
import { LANG, setupAuthorities } from '@utils/index';
import { USER_ROLES_NAME } from '@interfaces/index';
import logger from '@loaders/logger';

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.token;
  logger.info(LANG.logger.verifying_token);
  if (!token) {
    next();
  } else {
    jwt.verify(token as string, secret, (err, decoded) => {
      if (err) {
        next();
      }

      if (decoded?.userName) {
        req.headers.userName = decoded.userName;
      }

      return next();
    });
  }
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.token;
  logger.info(LANG.logger.verifying_token);
  if (!token) {
    return res.status(403).send({
      message: LANG.error.no_token_provided,
    });
  }

  jwt.verify(token as string, secret, (err, decoded) => {
    if (err) {
      logger.error(LANG.error.unauthorized);
      return res.status(401).send({
        message: LANG.error.unauthorized,
      });
    }

    if (decoded?.userName) {
      req.headers.userName = decoded.userName;
    }
    logger.info(LANG.logger.token_verified);

    return next();
  });

  return;
};

export const isRoot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userName = req.headers.userName as string;
  await checkingAuthorities(userName, USER_ROLES_NAME.ROOT, res, next);
  return;
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userName = req.headers.userName as string;
  await checkingAuthorities(userName, USER_ROLES_NAME.ADMIN, res, next);
};

export const isUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userName = req.headers.userName as string;
  await checkingAuthorities(userName, USER_ROLES_NAME.USER, res, next);
};

const checkingAuthorities = async (
  userName: string,
  ROLE: USER_ROLES_NAME,
  res: Response,
  next: NextFunction
) => {
  logger.info(LANG.logger.verifying_authority);
  const result = await User.findOne(userName);
  const authorities = setupAuthorities(result.toJSON().flagRoles);
  if (authorities.includes(ROLE)) {
    logger.info(LANG.logger.authority_granted(ROLE));
    return next();
  } else {
    logger.error(LANG.error.require_role(ROLE));
    return res.status(403).send({
      message: LANG.error.require_role(ROLE),
    });
  }
};
