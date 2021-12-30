import express from 'express';
import logger from '@loaders/logger';
import loaders from '@loaders/index';
import localIP from '@utils/getLocalIP';

const startServer = async () => {
  const app = express();
  const port = process.env.PORT || 8080;
  await loaders(app);

  app.listen({ port }, () =>
    logger.info(
      `🚀 Server listening at http://${localIP() || 'localhost'}:${port}`
    )
  );
};

startServer();
