import { models } from '@models/index';
import logger from '@loaders/logger';
import { BadRequest, ServerError } from '@utils/appError';
import base64ToImage from '@utils/base64ToImage';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import secret from '../configs/secret.config';
import * as Interface from '@interfaces/index';

const { users } = models;

const signUp = async (params: Interface.Users) => {
  try {
    if (!params.username || !params.password || !params.email) {
      throw new BadRequest(`Wrong parameter.`);
    }

    const image = params.image
      ? base64ToImage(params.image, params.imageName || 'no-name')
      : '';

    params.password = bcrypt.hashSync(params.password, 8);

    logger.info(`Creating user...`);

    const result = await users.create({ ...params, image });

    logger.info(`Username: ${params.username} created successfully`);

    return result;
  } catch (err) {
    logger.error(`${err.name}: ${err.message}`);
    throw new ServerError(`${err.name}: ${err.message}`);
  }
};

const signIn = async (params: Interface.Users) => {
  try {
    if (!params.username || !params.password) {
      throw new BadRequest(`Please insert username or password.`);
    }

    logger.info(`Login username: ${params.username}..`);

    const findUserResult = await users.findOne({
      where: { username: params.username },
    });
    if (!findUserResult) {
      throw new BadRequest(`Username not found.`);
    }

    const { username, email, name, password, flagRoles } =
      findUserResult.toJSON();

    const passwordIsValid = bcrypt.compareSync(params.password, password);

    var token = jwt.sign(
      {
        username,
        email,
        name,
      },
      secret,
      {
        expiresIn: 86400, // 24 hours
      }
    );

    if (!passwordIsValid) {
      throw new BadRequest(`Wrong password.`);
    }

    logger.info(`Username: ${params.username} login successfully`);

    return {
      flagRoles,
      name,
      token,
    };
  } catch (err) {
    logger.error(`${err.name}: ${err.message}`);
    throw new ServerError(`${err.name}: ${err.message}`);
  }
};

export { signUp, signIn };
