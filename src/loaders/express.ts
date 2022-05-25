import express, { Request, Response, NextFunction, Application } from 'express';
import cors from 'cors';
import { AppError, BadRequest, HTTPNotFound } from '@utils/appError';
import database from '@loaders/database';
import router from '@api/index';
import dotenv from 'dotenv';
import path from 'path';
import { LANG } from '@utils/index';
import { whiteList } from '@configs/whitelist.config';
import { ENVIRONMENT, ROUTES } from '@interfaces/index';
dotenv.config();

export default ({ app }: { app: Application }) => {
  app.use(ROUTES.rootPath, express.static(path.join(__dirname, ROUTES.public)));

  app.get(ROUTES.rootPath, (req, res) => {
    res.status(200).send(LANG.appName);
  });
  app.enable('trust proxy');
  /**
   * Cors
   */
  app.use(
    cors({
      origin (origin, callback) {
        if (!origin) {
          return callback(null, true);
        }
        if (whiteList.indexOf(origin) === -1 && whiteList.indexOf('*') === -1) {
          const msg = LANG.setup.cors_message(origin);
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
  app.get(ROUTES.status, (req, res) => {
    res.status(200).send({ message: LANG.ok });
  });
  /**
   * Reset Database
   */

  if (process.env.ENVIRONMENT === ENVIRONMENT.development)
    app.get(ROUTES.clearDB, async (req, res) => {
      await database.clearDatabase();
      res.status(200).send(LANG.setup.db_reset);
    });

  /**
   * Load Route
   */
  app.use(ROUTES.apiPrefix, router());

  /**
   * HTTP NOT Found Handler
   */
  app.use((req: Request, res: Response, next: NextFunction) => {
    throw new HTTPNotFound(LANG.error.http_not_found(req.originalUrl));
  });

  /**
   * Global Error Catcher
   */
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        status: LANG.err,
        statusCode: err.statusCode,
        message: err.message,
        errors: err.error,
      });
    }

    let statusCode: number | undefined;

    if (err.message === LANG.error.jwt_expired) {
      statusCode = 401;
    }

    return res.status(statusCode || 500).json({
      status: LANG.err,
      statusCode,
      message: err.message,
      errors: err,
    });
  });
};
