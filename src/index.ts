import express from 'express';
import logger from './loaders/logger';
import loaders from './loaders';

const startServer = async () => {
  const app = express();
  const port = 4000;

  await loaders(app);

  app.listen({ port: 4000 }, () =>
    logger.info(`🚀 Server listening at http://localhost:${port}`)
  );
};

startServer();
