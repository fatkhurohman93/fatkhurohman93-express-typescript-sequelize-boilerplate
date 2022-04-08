import { models } from '@models/index';
import logger from '@loaders/logger';
import { BadRequest } from '@utils/appError';
import {
  getPagination,
  getPagingData,
  filterByName,
  base64ToImage,
  catchError,
} from '@utils/index';
import { Users, USERNAME, PASSWORD, USER_ATTRIBUTES } from '@interfaces/index';
import bcrypt from 'bcrypt';
import { LANG } from '@utils/index';

const { users } = models;

export const findAll = async (params: Users) => {
  try {
    const { page, size, name } = params;
    const { limit, offset } = getPagination(page, size);

    logger.info(LANG.logger.getting_users);

    const findAllUserResult = await users.findAndCountAll({
      where: filterByName(name),
      attributes: [
        USER_ATTRIBUTES.userName,
        USER_ATTRIBUTES.email,
        USER_ATTRIBUTES.name,
      ],
      limit,
      offset,
    });

    const finalResult = getPagingData(findAllUserResult, limit, page);
    
    logger.info(LANG.logger.result_get_users(finalResult.totalItems));

    return finalResult;
  } catch (err) {
    return catchError(err.name as string, err.message as string);
  }
};

export const update = async ({
  userName,
  data,
}: {
  userName?: USERNAME;
  data: Users;
}) => {
  try {
    if (!userName) {
      throw new BadRequest(LANG.error.wrong_username);
    }

    logger.info(LANG.logger.update_user(userName));

    const { name, email, flagRoles } = data;

    const image = data.image
      ? base64ToImage(data.image, data.imageName || LANG.no_name)
      : LANG.empty;

    const updateUserResult = await users.update(
      { name, email, image, flagRoles },
      { where: { userName } }
    );

    if (!updateUserResult[0]) {
      throw new BadRequest(LANG.error.no_data_updated);
    }
    return LANG.updated(updateUserResult[0]);
  } catch (err) {
    return catchError(err.name as string, err.message as string);
  }
};

export const checkPassword = async (password: PASSWORD, userName: USERNAME) => {
  try {
    logger.info(LANG.logger.check_password(userName));

    if (!userName || !password) {
      throw new BadRequest(LANG.error.wrong_parameter);
    }

    const userResult = await users.findOne({
      where: { userName },
    });

    if (!userResult) {
      throw new BadRequest(LANG.error.username_not_found);
    }

    const userResultToJSON = userResult.toJSON();

    const passwordIsValid = bcrypt.compareSync(
      password,
      userResultToJSON.password
    );

    return {
      passwordIsValid,
      userName: userResultToJSON.userName,
      name: userResultToJSON.name,
      email: userResultToJSON.email,
      flagRoles: userResultToJSON.flagRoles,
    };
  } catch (err) {
    throw err;
  }
};

export const updatePassword = async (
  oldPassword?: PASSWORD,
  newPassword?: PASSWORD,
  userName?: USERNAME
) => {
  try {
    if (!oldPassword || !newPassword || !userName) {
      throw new BadRequest(LANG.error.wrong_parameter);
    }

    const { passwordIsValid } = await checkPassword(oldPassword, userName);

    if (!passwordIsValid) {
      throw new BadRequest(LANG.error.wrong_password);
    }
    const password = bcrypt.hashSync(newPassword, 8);

    const updatePasswordResult = await users.update(
      { password },
      { where: { userName } }
    );

    if (!updatePasswordResult[0]) {
      throw new BadRequest(LANG.error.password_failed_to_update);
    }

    return LANG.password_updated;
  } catch (err) {
    return catchError(err.name as string, err.message as string);
  }
};
