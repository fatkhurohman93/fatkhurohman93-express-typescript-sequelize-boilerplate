import express, { Request, Response, NextFunction, Application } from 'express';
import cors from 'cors';
import { AppError, BadRequest, HTTPNotFound } from '../utils/appError';
import database from './database';
import router from '../api';
import dotenv from 'dotenv';
dotenv.config();

export default ({ app }: { app: Application }) => {
  app.get('/', (req, res) => {
    res.status(200).send(`Kasir App API`);
  });
  app.enable('trust proxy');
  /**
   * Cors
   */
  const whitelist = ['http://localhost:3000'];
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) {
          return callback(null, true);
        }
        if (whitelist.indexOf(origin) === -1 && whitelist.indexOf('*') === -1) {
          const msg = `The CORS policy for this site does not allow access from this ${origin} specified origin`;
          return callback(new BadRequest(msg), false);
        }
        return callback(null, true);
      },
      credentials: true,
    })
  );
  /**
   * Body Parser
   */
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));

  /**
   * Check Status
   */
  app.get('/status', (req, res) => {
    res.status(200).send({ message: 'OK' });
  });
  /**
   * Reset Database
   */

  if (process.env.ENVIRONMENT === 'DEV')
    app.get('/clear-db', async (req, res) => {
      await database.clearDatabase();
      res.status(200).send('Database reseted.');
    });

  /**
   * Load Route
   */
  app.use('/api', router());

  /**
   * HTTP NOT Found Handler
   */
  app.use((req: Request, res: Response, next: NextFunction) => {
    throw new HTTPNotFound(`Page you are looking ${req.originalUrl} not found`);
  });

  /**
   * Global Error Catcher
   */
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        status: 'error',
        statusCode: err.statusCode,
        message: err.message,
        errors: err.error,
      });
    }

    let statusCode: number | undefined = undefined;

    if (err.message === 'jwt expired') {
      statusCode = 401;
    }

    return res.status(statusCode || 500).json({
      status: 'error',
      statusCode: statusCode,
      message: err.message,
      errors: err,
    });
  });
};
