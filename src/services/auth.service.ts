import { models } from '@models/index';
import logger from '@loaders/logger';
import { BadRequest } from '@utils/appError';
import { base64ToImage, catchError } from '@utils/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import secret from '../configs/secret.config';
import { Users } from '@interfaces/index';
import { checkPassword } from './user.service';
import { LANG } from '@utils/index';

const { users } = models;

export const signUp = async (params: Users) => {
  try {
    if (!params.userName || !params.password || !params.email) {
      throw new BadRequest(LANG.error.wrong_parameter);
    }

    const image = params.image
      ? base64ToImage(params.image, params.imageName || 'no-name')
      : '';

    params.password = bcrypt.hashSync(params.password, 8);

    logger.info(LANG.logger.creating_user);

    const result = await users.create({ ...params, image });

    logger.info(LANG.logger.success_creating_user(params.userName));

    return result;
  } catch (err) {
    return catchError(err.name as string, err.message as string);
  }
};

export const signIn = async (params: Users) => {
  try {
    if (!params.userName || !params.password) {
      throw new BadRequest(LANG.error.no_username_password);
    }

    logger.info(LANG.logger.login(params.userName));

    const { userName, email, name, flagRoles, passwordIsValid } =
      await checkPassword(params.password, params.userName);

    var token = jwt.sign(
      {
        userName,
        email,
        name,
      },
      secret,
      {
        expiresIn: 86400, // 24 hours
      }
    );

    if (!passwordIsValid) {
      throw new BadRequest(LANG.error.wrong_password);
    }

    logger.info(LANG.logger.success_login(userName));

    return {
      flagRoles,
      name,
      token,
    };
  } catch (err) {
    return catchError(err.name as string, err.message as string);
  }
};
