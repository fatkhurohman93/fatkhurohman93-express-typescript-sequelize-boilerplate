import { models } from '../models';
import logger from '../loaders/logger';
import { BadRequest, ServerError } from '../utils/appError';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import secret from '../configs/secret.config';
const { users } = models;

interface AuthParams {
  username: string;
  name: string;
  email: string;
  password: string;
  flagRoles: number;
}

const signUp = async (params: AuthParams) => {
  try {
    if (!params.username || !params.password || !params.email) {
      throw new BadRequest(`Wrong parameter.`);
    }

    params.password = bcrypt.hashSync(params.password, 8);

    logger.info(`Creating user..`);

    const result = await users.create(params);

    logger.info(`Username: ${params.username} created successfully`);

    return result;
  } catch (err) {
    logger.error(`${err.name}: ${err.message}`);
    throw new ServerError(`${err.name}: ${err.message}`);
  }
};

const signIn = async (params: AuthParams) => {
  try {
    if (!params.username || !params.password) {
      throw new BadRequest(`Please insert username or password.`);
    }

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
    return {
      flagRoles,
      name,
      token
    };
  } catch (err) {
    logger.error(`${err.name}: ${err.message}`);
    throw new ServerError(`${err.name}: ${err.message}`);
  }
};

export { signUp, signIn };
