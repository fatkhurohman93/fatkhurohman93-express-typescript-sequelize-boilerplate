import { models } from '@models/index';
import logger from '@loaders/logger';
import { BadRequest } from '@utils/appError';
import { base64ToImage, catchError } from '@utils/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import secret from '../configs/secret.config';
import { Users, USERNAME, USER_ATTRIBUTES } from '@interfaces/index';
import { checkPassword } from './user.service';
import { LANG, dateLocal } from '@utils/index';

const { users } = models;

export const signUp = async (params: Users, userName?: USERNAME) => {
  try {
    if (!params.userName || !params.password || !params.email) {
      throw new BadRequest(LANG.error.wrong_parameter);
    }
    const dateParameter = dateLocal();
    const createdBy = userName || USER_ATTRIBUTES.anonymous;

    const image = params.image
      ? base64ToImage(
          params.image,
          params.imageName || LANG.no_name,
          LANG.folderName.user
        )
      : LANG.empty;

    params.password = bcrypt.hashSync(params.password, 8);

    logger.info(LANG.logger.creating_user);

    const result = await users.create({
      ...params,
      image,
      createdBy,
      ...dateParameter,
    });

    logger.info(LANG.logger.success_creating_user(params.userName));

    return result;
  } catch (err) {
    return catchError(err.name, err.message);
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

    const token = jwt.sign(
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
    return catchError(err.name, err.message);
  }
};
