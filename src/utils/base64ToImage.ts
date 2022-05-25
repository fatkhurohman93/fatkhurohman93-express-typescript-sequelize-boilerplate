import fs from 'fs';
import logger from '@loaders/logger';
import { ServerError } from '@utils//appError';

export const base64ToImage = (data: string, name: string, folderName: string) => {
  try {
    logger.info('Saving image...');
    const time = new Date().getTime();
    const fileName = `${name}-${time}.png`;
    const processData = data.split(',')[1];

    fs.writeFileSync(`public/images/${folderName}/${fileName}`, processData, 'base64');

    logger.info('Image saved successfully');

    return fileName;
  } catch (err) {
    logger.error(`Failed to save image. ${err.name}: ${err.message}`);
    throw new ServerError('Failed to save image.');
  }
};
