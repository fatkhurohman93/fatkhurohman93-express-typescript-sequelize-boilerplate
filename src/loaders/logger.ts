import winston from 'winston';

const colorsLogger = {
  error: 'white redBG',
  warn: 'black yellowBG',
  info: 'yellow blueBG',
  debug: 'black whiteBG',
};

winston.addColors(colorsLogger);

const alignColorsAndTime = winston.format.combine(
  winston.format.colorize({
    level: true,
  }),

  winston.format.printf((info) => {
    return `[ ${info.level} ] : ${info.message}`;
  })
);

const logger = winston.createLogger({
  transports: [new winston.transports.File({ filename: 'combined.log' })],
});

if (process.env.ENVIRONMENT !== 'PROD') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(alignColorsAndTime),
    })
  );
}

export default logger;
