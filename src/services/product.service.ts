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
import { Products, USERNAME, USER_ATTRIBUTES } from '@interfaces/index';
import { LANG , dateLocal} from '@utils/index';

const { products, users, categories, suppliers } = models;

export const create = async (data: Products, userName: USERNAME) => {
  try {
    if (!data.name || !data.categoryID || !data.supplierID) return;
    return;
  } catch (err) {
    return catchError(err.name, err.message);
  }
};
