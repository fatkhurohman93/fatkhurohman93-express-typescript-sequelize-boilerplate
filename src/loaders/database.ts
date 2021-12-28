import logger from './logger';
import { sequelize as db, models } from '../models/index';

const getConnection = async () => {
  try {
    logger.info('Begin Database Connection');
    await db.sync();
    await db.authenticate();
    logger.info('Connect To Database Sucessfully');
  } catch (error) {
    console.log(error);
    logger.error(`🔥 Cannot connect to Database message: ${error.message} 🔥`);
  }
};

const clearDatabase = async () => {
  try {
    await db.sync({ force: true });
    logger.info('Database reseted.');
  } catch (error) {
    console.log(error);
    logger.error('Unable to clear the database');
  }
};

const connectionManager = {
  getConnection,
  clearDatabase,
};

export default connectionManager;
