import logger from '@loaders/logger';
import { sequelize as db } from '@models/index';
import { LANG } from '@utils/index';

const getConnection = async () => {
  try {
    logger.info(LANG.setup.connect_to_db);
    await db.sync();
    await db.authenticate();
    logger.info(LANG.setup.success_connect_to_db);
  } catch (error) {
    logger.error(LANG.setup.failed_connect_to_db(error.message));
  }
};

const clearDatabase = async () => {
  try {
    await db.sync({ force: true });
    logger.info(LANG.setup.db_reset);
  } catch (error) {
    logger.error(LANG.setup.db_reset_failed);
  }
};

const connectionManager = {
  getConnection,
  clearDatabase,
};

export default connectionManager;
