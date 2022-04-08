import express from 'express';
import expressLoader from './express';
import database from './database';
import { LANG } from '@utils/index';
import logger from './logger';

export default async (app: express.Application) => {
  // Create SQLite3 Connection
  await database.getConnection();

  expressLoader({ app });
  logger.info(LANG.welcome);
};
