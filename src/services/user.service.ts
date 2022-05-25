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
import {
  Users,
  FindAllParams,
  USERNAME,
  PASSWORD,
  USER_ATTRIBUTES,
} from '@interfaces/index';
import bcrypt from 'bcrypt';
import { LANG, dateLocal } from '@utils/index';

const { users } = models;

export const findAll = async (params: FindAllParams) => {
  try {
    const { page, size, name } = params;
    const { limit, offset } = getPagination(page, size);

    logger.info(LANG.logger.fetching_users);

    const result = await users.findAndCountAll({
      where: filterByName(name),
      attributes: { exclude: [USER_ATTRIBUTES.password] },
      limit,
      offset,
    });

    const finalResult = getPagingData(result, limit, page);

    logger.info(LANG.logger.result_get_users(finalResult.totalItems));

    return finalResult;
  } catch (err) {
    return catchError(err.name, err.message);
  }
};

export const findOne = async (userName: USERNAME) => {
  try {
    if (!userName) {
      throw new BadRequest(LANG.error.wrong_username);
    }

    logger.info(LANG.logger.fetching_user(userName));

    const result = await users.findOne({
      where: { userName },
      attributes: { exclude: [USER_ATTRIBUTES.password] },
    });

    if (!result) {
      throw new BadRequest(LANG.error.username_not_found);
    }

    logger.info(LANG.logger.fetch_user_success(userName));

    return result;
  } catch (err) {
    return catchError(err.name, err.message);
  }
};

export const update = async (
  data: Users,
  whoIsAccess: USERNAME,
  userName: USERNAME
) => {
  try {
    if (!userName) {
      throw new BadRequest(LANG.error.wrong_username);
    }

    const { lastUpdatedTime } = dateLocal();
    const lastUpdatedBy = whoIsAccess || USER_ATTRIBUTES.anonymous;

    logger.info(LANG.logger.updating_user(userName));

    const { name, email, flagRoles } = data;

    const image = data.image
      ? base64ToImage(
          data.image,
          data.imageName || LANG.no_name,
          LANG.folderName.user
        )
      : LANG.empty;

    const result = await users.update(
      { name, email, image, flagRoles, lastUpdatedBy, lastUpdatedTime },
      { where: { userName } }
    );

    if (!result[0]) {
      throw new BadRequest(LANG.error.no_data_updated);
    }

    logger.info(LANG.updated(result[0]));

    return LANG.updated(result[0]);
  } catch (err) {
    return catchError(err.name, err.message);
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
    return catchError(err.name, err.message);
  }
};

export const destroy = async (userName: string) => {
  try {
    if (!userName) {
      throw new BadRequest(LANG.error.wrong_username);
    }

    logger.info(LANG.logger.deleting_user(userName));

    const result = await users.destroy({ where: { userName } });

    if (!result) {
      throw new BadRequest(LANG.error.no_data_updated);
    }

    logger.info(LANG.deleted(result));

    return result;
  } catch (err) {
    return catchError(err.name, err.message);
  }
};
