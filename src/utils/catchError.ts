import logger from '@loaders/logger';
import { ServerError } from '@utils/appError';

export const catchError = (errName: string, errMessage: string) => {
  logger.error(`${errName}: ${errMessage}`);
  throw new ServerError(`${errName}: ${errMessage}`);
};
