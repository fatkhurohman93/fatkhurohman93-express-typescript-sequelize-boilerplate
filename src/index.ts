import express from 'express';
import logger from '@loaders/logger';
import loaders from '@loaders/index';
import { getLocalIP as localIP } from '@utils/index';
import { LANG } from '@utils/index';

const startServer = async () => {
  const app = express();
  const port = process.env.PORT || 8080;
  await loaders(app);

  app.listen({ port }, () =>
    logger.info(LANG.setup.server_listen(localIP(), port))
  );
};

startServer();
